import { observable, action, autorun, toJS } from "mobx";
// import { getByName } from "../../blocks";

export default class Block {
  @observable public name: string;
  @observable public parents?: Block[];
  @observable public children?: Block[];
  @observable public connectableParents?: string[];
  @observable public connectableChildren?: string[];
  @observable public ComponentClass: any;
  @observable public isDebug: boolean;
  @observable counter: number = 0;
  public model: any;

  constructor() {
    this.parents = [];
    this.children = [];
    this.connectableParents = [];
    this.connectableChildren = [];
    this.ComponentClass = null;
    this.model = null;
    this.isDebug = true;

    autorun(() => {
      console.log(toJS(this));
    });
  }

  @action
  public addParent(block: Block) {
    this.parents.push(block);
  }

  @action
  public addChild(block: Block) {
    this.children.push(block);
  }

  public async execute({  }: any) {
    return null;
  }

  public toObj() {
    return {
      name: this.name,
      x: this.model.x,
      y: this.model.y,
      children: this.children.map(item => item.toObj())
    };
  }

  public boot(
    parent: Block,
    children: any,
    addNode: (store: Block, x: number, y: number) => void,
    link: (source: any, target: any) => void
  ) {
    for (let child of children) {
      const blockMeta = getByName(child.name);
      const node = new blockMeta.Store();
      this.children.push(node);
      addNode(node, child.x, child.y);
      link(parent, node);

      node.boot(node, child.children, addNode, link);
    }
  }
}

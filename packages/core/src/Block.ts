import { observable, action, autorun, toJS, extras } from "mobx";
extras.shareGlobalState();

export interface IBlockMeta {
  Category?: string;
  Label: string;
  Component: any;
  Key: string;
  Store: any;
}

export default class Block {
  @observable public name: string;
  @observable public parents?: Block[];
  @observable public children?: Block[];
  @observable public connectableParents?: string[];
  @observable public connectableChildren?: string[];
  @observable public ComponentClass: any;
  @observable public isDebug: boolean = false;

  public blocksMeta: IBlockMeta[] = [];
  public model: any;

  constructor(blockMeta: IBlockMeta[]) {
    this.parents = [];
    this.children = [];
    this.connectableParents = [];
    this.connectableChildren = [];
    this.ComponentClass = null;
    this.model = null;
    this.blocksMeta = blockMeta;
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

  @action
  public toggleDebug() {
    this.isDebug = !this.isDebug;
  }

  @action.bound
  public removeLink() {
    this.model.removeLink(this.model.ports[0]);
  }

  public getChild() {
    const child = this.children[0];
    if (child) {
      return child;
    }

    return {
      execute: (args: any) => {}
    };
  }

  public getParent() {
    return this.parents[0];
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
      const blockMeta = this.blocksMeta.filter(
        block => block.Key === child.name
      )[0];
      const node = new blockMeta.Store(this.blocksMeta);
      this.children.push(node);
      addNode(node, child.x, child.y);
      link(parent, node);

      node.boot(node, child.children, addNode, link);
    }
  }
}

import { observable, action, autorun, toJS } from "mobx";

export default class Block {
  @observable public name: string;
  @observable public parents?: Block[];
  @observable public children?: Block[];
  @observable public connectableParents?: string[];
  @observable public connectableChildren?: string[];
  @observable public ComponentClass: any;

  constructor() {
    this.parents = [];
    this.children = [];
    this.connectableParents = [];
    this.connectableChildren = [];
    this.ComponentClass = null;

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
}

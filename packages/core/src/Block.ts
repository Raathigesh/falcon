import { observable, action, autorun, toJS, extras } from "mobx";
import IElectronHandler from "./IElectronHandler";

extras.shareGlobalState();

export interface IBlockMeta {
  Category?: string;
  Label: string;
  Component: any;
  Key: string;
  Store: any;
}

export interface IExecutionResult {
  debug: any;
  continue: () => IExecutionResult;
  block: Block;
}

export default class Block {
  @observable public name: string;
  @observable public parents?: Block[];
  @observable public children?: Block[];
  @observable public connectableParents?: string[];
  @observable public connectableChildren?: string[];
  @observable public ComponentClass: any;
  @observable public isDebug: boolean = false;
  @observable public isPaused: boolean = false;

  public blocksMeta: IBlockMeta[] = [];
  public model: any;
  public handlers: IElectronHandler;

  constructor(blockMeta: IBlockMeta[], handlers?: IElectronHandler) {
    this.parents = [];
    this.children = [];
    this.connectableParents = [];
    this.connectableChildren = [];
    this.ComponentClass = null;
    this.model = null;
    this.blocksMeta = blockMeta;
    this.handlers = handlers;
    autorun(() => {
      console.log(toJS(this));
    });
  }

  @action.bound
  public addParent(block: Block) {
    this.parents.push(block);
  }

  @action.bound
  public addChild(block: Block) {
    this.children.push(block);
  }

  @action.bound
  public toggleDebug() {
    this.isDebug = !this.isDebug;
  }

  @action.bound
  public removeLink() {
    this.model.removeLink(this.model.ports[0]);
  }

  @action.bound
  public setIsPaused(value: boolean) {
    this.isPaused = value;
  }

  public getChild() {
    const child = this.children[0];
    if (child) {
      return child;
    }

    return {
      execute: (args: any) => null
    };
  }

  public getParent() {
    return this.parents[0];
  }

  public async execute({  }: any): Promise<IExecutionResult> {
    if (this.isDebug) {
      this.setIsPaused(true);
    }

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

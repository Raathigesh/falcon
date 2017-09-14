import { observable, action, IObservableArray } from "mobx";
import { Block } from "core";
import DiagramManager from "../diagram/DiagramEngineConfig";
import { getByName } from "../blocks";

class Workflow {
  @observable public blocks: IObservableArray<Block>;
  @observable public diagramModel: DiagramManager;
  public stateStore: any;

  constructor() {
    this.diagramModel = new DiagramManager();
    this.blocks = observable([]);
    this.stateStore = null;
  }

  @action.bound
  addBlock(store: any, x: number = 100, y: number = 100) {
    this.blocks.push(store);
    this.diagramModel.addNode(store, x, y);
    this.diagramModel.getEngine().repaintCanvas();
  }

  @action.bound
  play() {
    this.blocks[0].execute({});
    // this.stateStore = this.getObj();
    // const data = require("C:/plugins/custom");
  }

  getObj() {
    return this.blocks[0].toObj();
  }

  @action.bound
  link(source: any, target: any) {
    this.diagramModel.link(source, target);
  }

  boot(obj: any) {
    this.blocks.clear();
    const blockMeta = getByName(obj.name);
    const node: Block = new blockMeta.Store();
    this.addBlock(node, obj.x, obj.y);
    node.boot(node, obj.children, this.addBlock, this.link);
  }
}

export default Workflow;

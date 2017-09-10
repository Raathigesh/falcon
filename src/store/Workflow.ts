import { observable, action, IObservableArray } from "mobx";
import Block from "../blocks/core/Block";
import DiagramManager from "../diagram/DiagramEngineConfig";

class Workflow {
  @observable public blocks: IObservableArray<Block>;
  @observable public diagramModel: DiagramManager;

  constructor() {
    this.diagramModel = new DiagramManager();
    this.blocks = observable([]);
  }

  @action.bound
  addBlock(store: any) {
    this.blocks.push(store);
    this.diagramModel.addNode(store);
    this.diagramModel.getEngine().repaintCanvas();
  }

  @action.bound
  play() {
    debugger;
    this.blocks[0].execute({});
  }
}

export default Workflow;

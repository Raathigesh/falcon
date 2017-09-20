import { observable, action, IObservableArray, extras } from "mobx";
import { Block } from "core";
import DiagramManager from "../diagram/DiagramEngineConfig";
import { getByName } from "../blocks";
import ExecutionContext from "./Context";
import { save, open } from "./ShellHandler";
import blocksManager from "./BlocksManager";

extras.shareGlobalState();

export interface IExecutionResult {
  debug: any;
  continue: () => IExecutionResult;
  block: Block;
}

class Workflow {
  @observable public blocks: IObservableArray<Block>;
  @observable public diagramModel: DiagramManager;
  @observable public context: ExecutionContext;
  public stateStore: any;

  constructor() {
    this.diagramModel = new DiagramManager();
    this.blocks = observable([]);
    this.stateStore = null;
    this.context = new ExecutionContext();
  }

  @action.bound
  addBlock(store: any, x: number = 100, y: number = 100) {
    this.blocks.push(store);
    this.diagramModel.addNode(store, x, y);
    this.diagramModel.getEngine().repaintCanvas();
  }

  @action.bound
  async play() {
    if (this.context.isPaused) {
      this.context.currentBlock.setIsPaused(false);
      const result = await this.context.resumeHandler();
      this.run(result);
    } else {
      const initialBlock = this.blocks[0];
      const result = await initialBlock.execute({
        context: this.context
      });
      this.run(result);
    }
  }

  async run(result: IExecutionResult) {
    if (!result) return;

    const { block } = result;
    if (block.isDebug) {
      block.setIsPaused(true);
      this.context.isPaused = true;
      this.context.executionResult = result.debug;
      this.context.resumeHandler = result.continue;
      this.context.currentBlock = result.block;
    } else {
      const newResult: IExecutionResult = await result.continue();
      if (newResult) {
        this.run(newResult);
      }
    }
  }

  getObj() {
    return this.blocks[0].toObj();
  }

  @action.bound
  link(source: any, target: any) {
    this.diagramModel.link(source, target);
  }

  @action.bound
  save() {
    save(this.getObj());
  }

  @action.bound
  open() {
    open().then(obj => {
      this.boot(obj);
    });
  }

  boot(obj: any) {
    this.blocks.clear();
    const blockMeta = getByName(obj.name);
    const node: Block = new blockMeta.Store(blocksManager.blocksMeta);
    this.addBlock(node, obj.x, obj.y);
    node.boot(node, obj.children, this.addBlock, this.link);
  }
}

export default Workflow;

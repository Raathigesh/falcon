import { observable } from "mobx";
import { Block } from "core";
export interface IExecutionResult {
  debug: any;
  continue: () => IExecutionResult;
  block: Block;
}

export default class ExecutionContext {
  @observable public executionResult: any = null;
  public isPaused: boolean = false;
  public resumeHandler: () => IExecutionResult;
  public currentBlock: Block = null;
}

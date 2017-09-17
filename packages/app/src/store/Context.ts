import { observable } from "mobx";

export default class ExecutionContext {
  @observable public executionResult: any = null;
}

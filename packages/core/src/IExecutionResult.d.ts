import Block from "./Block";
export default interface IExecutionResult {
    debug: any;
    continue: () => IExecutionResult;
    block: Block;
}

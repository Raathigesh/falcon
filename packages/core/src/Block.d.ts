import IElectronHandler from "./IElectronHandler";
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
    name: string;
    parents?: Block[];
    children?: Block[];
    connectableParents?: string[];
    connectableChildren?: string[];
    ComponentClass: any;
    isDebug: boolean;
    isPaused: boolean;
    blocksMeta: IBlockMeta[];
    model: any;
    handlers: IElectronHandler;
    constructor(blockMeta: IBlockMeta[], handlers?: IElectronHandler);
    addParent(block: Block): void;
    addChild(block: Block): void;
    toggleDebug(): void;
    removeLink(): void;
    setIsPaused(value: boolean): void;
    getChild(): {
        execute: (args: any) => any;
    };
    getParent(): Block;
    execute({}: any): Promise<IExecutionResult>;
    toObj(): any;
    boot(parent: Block, children: any, addNode: (store: Block, x: number, y: number) => void, link: (source: any, target: any) => void): void;
}

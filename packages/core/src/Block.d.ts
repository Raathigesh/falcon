export interface IBlockMeta {
    Category?: string;
    Label: string;
    Component: any;
    Key: string;
    Store: any;
}
export default class Block {
    name: string;
    parents?: Block[];
    children?: Block[];
    connectableParents?: string[];
    connectableChildren?: string[];
    ComponentClass: any;
    isDebug: boolean;
    blocksMeta: IBlockMeta[];
    model: any;
    constructor(blockMeta: IBlockMeta[]);
    addParent(block: Block): void;
    addChild(block: Block): void;
    toggleDebug(): void;
    removeLink(): void;
    getChild(): {
        execute: (args: any) => void;
    };
    getParent(): Block;
    execute({}: any): Promise<any>;
    toObj(): any;
    boot(parent: Block, children: any, addNode: (store: Block, x: number, y: number) => void, link: (source: any, target: any) => void): void;
}

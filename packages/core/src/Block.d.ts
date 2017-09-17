export default class Block {
    name: string;
    parents?: Block[];
    children?: Block[];
    connectableParents?: string[];
    connectableChildren?: string[];
    ComponentClass: any;
    isDebug: boolean;
    model: any;
    constructor();
    addParent(block: Block): void;
    addChild(block: Block): void;
    toggleDebug(): void;
    execute({}: any): Promise<any>;
    toObj(): any;
}

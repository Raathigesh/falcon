export interface IFrame {
    node: any;
    name: string;
    isDebug?: boolean;
    icon: string;
    children?: any;
    details?: any;
    onRemove: () => void;
    onDebugToggle?: () => void;
}
declare const _default: any;
export default _default;

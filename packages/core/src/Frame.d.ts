/// <reference types="react" />
import * as React from "react";
export interface IFrame {
    node: any;
    name: string;
    isDebug?: boolean;
    icon: string;
    children?: any;
    details?: any;
    onRemove?: () => void;
    onDebugToggle?: () => void;
    onRemoveLink: () => void;
}
declare const _default: React.ClassicComponentClass<IFrame>;
export default _default;

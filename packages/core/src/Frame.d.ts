/// <reference types="react" />
import * as React from "react";
export interface IFrame {
    node: any;
    icon: string;
    children?: any;
    details?: any;
    onRemove?: () => void;
    store: {
        name: string;
        isDebug?: boolean;
        isPaused: boolean;
        removeLink: () => void;
        toggleDebug: () => void;
    };
}
declare const _default: React.ClassicComponentClass<IFrame>;
export default _default;

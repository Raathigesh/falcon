/// <reference types="react" />
import * as React from "react";
export interface PortProps {
    name: string;
    node: any;
}
export interface PortState {
    selected: boolean;
}
export default class PortWidget extends React.Component<PortProps, PortState> {
    constructor(props: PortProps);
    render(): JSX.Element;
}

import * as React from "react";
import { DiagramEngine, DefaultNodeModel } from "storm-react-diagrams";
import { Checkbox, Popover, Icon, Intent } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Details from "./Details";
import { Frame } from "core";

export interface DefaultNodeProps {
  node: DefaultNodeModel;
  diagramEngine: DiagramEngine;
  store: any;
}

export interface DefaultNodeState {}

@observer
export class DefaultNodeWidget extends React.Component<
  DefaultNodeProps,
  DefaultNodeState
> {
  @observable counter: number = 0;
  constructor(props: DefaultNodeProps) {
    super(props);
    this.state = {};
  }

  render() {
    var debug = this.props.store.isDebug;
    debugger;
    return (
      <Frame
        isDebug={this.props.store.isDebug}
        onDebugToggle={() => {
          this.props.store.toggleDebug();
        }}
        node={this.props.node}
        onRemove={() => {
          this.props.node.remove();
          this.props.diagramEngine.repaintCanvas();
        }}
        name={this.props.store.name}
        details={<Details />}
      >
        <button
          onClick={() => {
            this.props.store.count();
          }}
        >
          Sample
        </button>
        sample
        {this.props.store.counter}
      </Frame>
    );
  }
}

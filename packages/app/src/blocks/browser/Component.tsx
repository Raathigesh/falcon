import * as React from "react";
import { DiagramEngine, DefaultNodeModel } from "storm-react-diagrams";
import { Checkbox, Popover, Icon, Intent } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Details from "./Details";
import { Frame } from "../../../../core";

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
  constructor(props: DefaultNodeProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Frame
        onRemoveLink={this.props.store.removeLink}
        isDebug={this.props.store.isDebug}
        icon="pt-icon-applications"
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
      />
    );
  }
}

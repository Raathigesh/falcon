import * as React from "react";
import { DiagramEngine, DefaultNodeModel } from "storm-react-diagrams";
import { EditableText } from "@blueprintjs/core";
import styled from "styled-components";
import Frame from "../core/Frame";

export interface DefaultNodeProps {
  node: DefaultNodeModel;
  diagramEngine: DiagramEngine;
  store: any;
}

const Url = styled(EditableText)`width: 100%;`;

export interface DefaultNodeState {}

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
        node={this.props.node}
        onRemove={() => {
          this.props.node.remove();
          this.props.diagramEngine.repaintCanvas();
        }}
        name={this.props.store.name}
      >
        <Url placeholder="Url goes here" />
      </Frame>
    );
  }
}

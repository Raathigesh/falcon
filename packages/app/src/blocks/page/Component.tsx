import * as React from "react";
import { DiagramEngine, DefaultNodeModel } from "storm-react-diagrams";
import { EditableText } from "@blueprintjs/core";
import styled from "styled-components";
import { Frame } from "core";
import { Store } from "./Store";

export interface DefaultNodeProps {
  node: DefaultNodeModel;
  diagramEngine: DiagramEngine;
  store: Store;
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
    const { node, diagramEngine, store } = this.props;
    return (
      <Frame
        icon="pt-icon-page-layout"
        node={node}
        onRemove={() => {
          node.remove();
          diagramEngine.repaintCanvas();
        }}
        name={this.props.store.name}
      >
        <Url
          placeholder="Url goes here"
          onConfirm={value => store.setUrl(value)}
        />
      </Frame>
    );
  }
}

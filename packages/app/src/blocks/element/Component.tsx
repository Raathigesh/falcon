import * as React from "react";
import { DiagramEngine, DefaultNodeModel } from "storm-react-diagrams";
import styled from "styled-components";
import { Frame, ElectronHandler } from "core";
import { Store } from "./Store";

const SelectorInput = styled.input`width: 126px !important;`;

export interface DefaultNodeProps {
  node: DefaultNodeModel;
  diagramEngine: DiagramEngine;
  store: Store;
}

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
    const { store } = this.props;
    return (
      <Frame
        store={store}
        node={this.props.node}
        icon="pt-icon-control"
        onRemove={() => {
          this.props.node.remove();
          this.props.diagramEngine.repaintCanvas();
        }}
      >
        <div className="pt-control-group">
          <div className="pt-input-group pt-fill">
            <span className="pt-icon pt-icon-locate" />
            <SelectorInput
              type="text"
              className="pt-input"
              placeholder="Selector"
              onChange={event => {
                store.setSelector((event.target as any).value);
              }}
            />
          </div>
          {store.pageUrl}
          <button
            className="pt-button pt-intent-primary"
            onClick={() => {
              store.handlers.OpenNewWindow(store.pageUrl);
            }}
          >
            Open page
          </button>
        </div>
      </Frame>
    );
  }
}

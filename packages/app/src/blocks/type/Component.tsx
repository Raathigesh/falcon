import * as React from "react";
import { DiagramEngine, DefaultNodeModel } from "storm-react-diagrams";
import { Frame, ElectronHandler } from "core";
import { Store } from "./Store";

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
        icon="pt-icon-text-highlight"
        node={this.props.node}
        onRemove={() => {
          this.props.node.remove();
          this.props.diagramEngine.repaintCanvas();
        }}
      >
        <div className="pt-control-group">
          <div className="pt-input-group pt-fill">
            <span className="pt-icon pt-icon-locate" />
            <input type="text" className="pt-input" placeholder="Selector" />
          </div>
          {store.pageUrl}
          <button
            className="pt-button pt-intent-primary"
            onClick={() => {
              ElectronHandler.OpenNewWindow(store.pageUrl);
            }}
          >
            Open page
          </button>
        </div>
      </Frame>
    );
  }
}

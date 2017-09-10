import { DiagramEngine, NodeWidgetFactory } from "storm-react-diagrams";
import * as React from "react";
import DefaultModel from "./DefaultModel";

export class DefaultNodeFactory extends NodeWidgetFactory {
  constructor() {
    super("default");
  }

  generateReactWidget(
    diagramEngine: DiagramEngine,
    node: DefaultModel
  ): JSX.Element {
    return (
      <node.store.ComponentClass
        node={node}
        diagramEngine={diagramEngine}
        store={node.store}
      />
    );
  }
}

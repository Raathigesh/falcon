import * as React from "react";
import styled from "styled-components";
import { DiagramWidget } from "storm-react-diagrams";
import { Provider } from "mobx-react";
import Toolbox from "./components/Toolbox";
import Workflow from "./store/Workflow";
import blocks from "./blocks/";

const workflow = new Workflow();
export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <Provider workflow={workflow}>
        <div>
          <DiagramWidget diagramEngine={workflow.diagramModel.getEngine()} />
          <Toolbox
            blocks={blocks}
            onNewBlock={workflow.addBlock}
            onRun={() => {
              workflow.play();
            }}
          />
        </div>
      </Provider>
    );
  }
}

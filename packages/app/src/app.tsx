import * as React from "react";
import { DiagramWidget } from "storm-react-diagrams";
import { Provider } from "mobx-react";
import Toolbox from "./components/Toolbox";
import Workflow from "./store/Workflow";
import blocksManager from "./store/BlocksManager";
import blocks from "./blocks/";

const workflow = new Workflow();

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <Provider workflow={workflow}>
        <div>
          <DiagramWidget diagramEngine={workflow.diagramModel.getEngine()} />
          <Toolbox
            context={workflow.context}
            blocks={blocksManager.blocksMeta}
            onNewBlock={workflow.addBlock}
            onRun={() => {
              workflow.play();
            }}
            onBoot={() => {
              workflow.boot(workflow.stateStore);
            }}
            onSave={() => {
              workflow.save();
            }}
            onOpen={() => {
              workflow.open();
            }}
          />
        </div>
      </Provider>
    );
  }
}

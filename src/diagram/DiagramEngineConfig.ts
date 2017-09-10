import {
  DiagramEngine,
  DefaultLinkFactory,
  DiagramModel,
  DefaultPortModel
} from "storm-react-diagrams";
import { DefaultNodeFactory } from "./NodeFactory";
import DefaultNodeModel from "./DefaultModel";

class DiagramManager {
  engine: DiagramEngine;
  model: DiagramModel;
  nodeIndex: number;

  constructor() {
    this.engine = new DiagramEngine();
    this.engine.registerNodeFactory(new DefaultNodeFactory());
    this.engine.registerLinkFactory(new DefaultLinkFactory());
    this.nodeIndex = 0;

    this.model = new DiagramModel();
    this.model.addListener({
      linksUpdated: (entity, isAdded) => {
        console.log(isAdded ? "added" : "removed", entity);
        entity.addListener({
          sourcePortChanged(item, target) {
            console.log("source port change", item, target);
          },

          targetPortChanged(item, target) {
            const source = item.sourcePort.parentNode.store;
            const targetNode = item.targetPort.parentNode.store;
            source.addChild(targetNode);
            targetNode.addParent(source);
            console.log("target port change", item, target);
          }
        });
      },
      nodesUpdated: (entity, isAdded) => {
        console.log(isAdded ? "added" : "removed", entity);
      }
    });
    this.engine.setDiagramModel(this.model);
  }

  addNode(model: any) {
    const node = new DefaultNodeModel(
      "Node " + this.nodeIndex++,
      "rgb(0,192,255)",
      model
    );
    node.addPort(new DefaultPortModel(false, "out-1", "Out"));
    node.addPort(new DefaultPortModel(true, "in-1", "In"));
  /*   node.addListener({
      selectionChanged: (node, isSelected) => {
        console.log(isSelected?'Selected':'Unselected', node)
      }
    }) */
    node.x = 100;
    node.y = 100;

    this.model.addNode(node);
  }

  getEngine() {
    return this.engine;
  }
}

export default DiagramManager;

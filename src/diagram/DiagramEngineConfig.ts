import {
  DiagramEngine,
  DefaultLinkFactory,
  DiagramModel,
  DefaultPortModel,
  LinkModel
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
            targetNode.context = source.context;
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

  addNode(store: any, x: number, y: number) {
    const node = new DefaultNodeModel(
      "Node " + this.nodeIndex++,
      "rgb(0,192,255)",
      store
    );
    const outPort = node.addPort(new DefaultPortModel(false, "out-1", "Out"));
    const inPort = node.addPort(new DefaultPortModel(true, "in-1", "In"));
    /*   node.addListener({
      selectionChanged: (node, isSelected) => {
        console.log(isSelected?'Selected':'Unselected', node)
      }
    }) */
    node.x = x;
    node.y = y;
    store.model = node;
    store.outPort = outPort;
    store.inPort = inPort;

    this.model.addNode(node);
  }

  link(source: any, target: any) {
    setTimeout(() => {
      const link1 = new LinkModel();
      link1.setSourcePort(source.outPort);
      link1.setTargetPort(target.inPort);
      this.model.addLink(link1);
      this.engine.repaintCanvas();
    }, 100);
  }

  getEngine() {
    return this.engine;
  }
}

export default DiagramManager;

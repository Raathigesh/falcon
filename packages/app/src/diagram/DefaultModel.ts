import { NodeModel, DefaultPortModel } from "storm-react-diagrams";
import * as _ from "lodash";

export default class DefaultNodeModel extends NodeModel {
  name: string;
  color: string;
  ports: { [s: string]: DefaultPortModel };
  store: any;

  constructor(
    name: string = "Untitled",
    color: string = "rgb(0,192,255)",
    store: any
  ) {
    super("default");
    this.name = name;
    this.color = color;
    this.store = store;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color
    });
  }

  getInPorts(): DefaultPortModel[] {
    return _.filter(this.ports, portModel => {
      return portModel.in;
    });
  }

  getOutPorts(): DefaultPortModel[] {
    return _.filter(this.ports, portModel => {
      return !portModel.in;
    });
  }
}

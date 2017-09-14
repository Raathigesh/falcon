import { observable, computed, action, asReference } from "mobx";
import BlockNames from "../BlockNames";
import { Block } from "core";

import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  @observable public selector: string = null;
  public elementHandler: any = null;
  constructor() {
    super();
    this.name = BlockNames.Element;
    this.ComponentClass = DefaultNodeWidget;
  }

  setSelector(selector: string) {
    this.selector = selector;
  }

  @computed
  get pageUrl() {
    if (this.parents.length === 0) {
      return "";
    }

    return (this.parents[0] as any).url;
  }

  public async execute({ element }: any) {
    await element.click();
  }
}

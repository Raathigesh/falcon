import { observable, computed, action, asReference } from "mobx";
import { Block } from "core";

import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  @observable public selector: string = null;
  public elementHandler: any = null;
  constructor(blocks) {
    super(blocks);
    this.name = "Element";
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

  public async execute({ page }: any) {
    this.elementHandler = await page.$(this.selector);
    this.children[0].execute({ page, element: this.elementHandler });
  }
}

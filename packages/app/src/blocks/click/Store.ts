import { observable, computed, action, asReference } from "mobx";
import { Block, IExecutionResult } from "core";

import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  @observable public selector: string = null;
  public elementHandler: any = null;
  constructor(blocks) {
    super(blocks);
    this.name = "Click";
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

  public async execute({
    browser,
    page,
    element
  }: any): Promise<IExecutionResult> {
    await element.click();

    return {
      debug: {
        browser,
        page,
        element
      },
      continue: () => {
        return this.getChild().execute({ browser, page, element });
      },
      block: this
    };
  }
}

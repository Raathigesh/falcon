import { observable, computed, action, asReference } from "mobx";
import { Block, IExecutionResult, IElectronHandler } from "core";

import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  @observable public selector: string = null;
  public elementHandler: any = null;
  constructor(blocks, handlers: IElectronHandler) {
    super(blocks, handlers);
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

  public async execute({ page }: any): Promise<IExecutionResult> {
    this.elementHandler = await page.$(this.selector);

    return {
      debug: {
        page: page,
        element: this.elementHandler
      },
      continue: () => {
        return this.getChild().execute({ page, element: this.elementHandler });
      },
      block: this
    };
  }
}

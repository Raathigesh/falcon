import { observable, action, asReference } from "mobx";
import { Block, IExecutionResult } from "core";
import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  constructor(blocks) {
    super(blocks);
    this.name = "Screenshot";
    this.ComponentClass = DefaultNodeWidget;
  }

  public async execute({ browser, page }: any): Promise<IExecutionResult> {
    await page.screenshot({ path: "example.png" });

    return {
      debug: {
        browser,
        page
      },
      continue: () => {
        return this.getChild().execute({ page, browser });
      },
      block: this
    };
  }
}

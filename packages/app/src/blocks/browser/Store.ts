import { observable } from "mobx";
import { Block } from "core";
import { DefaultNodeWidget } from "./Component";

import * as Puppeteer from "puppeteer";

export interface IExecutionResult {
  debug: any;
  continue: () => IExecutionResult;
  block: Block;
}

export class Store extends Block {
  public browser: any;
  constructor(blocks) {
    super(blocks);
    this.name = "Browser";
    this.ComponentClass = DefaultNodeWidget;
  }

  public async execute(): Promise<IExecutionResult> {
    this.browser = await Puppeteer.launch({ headless: false });

    return {
      debug: {
        browser: this.browser
      },
      continue: () => {
        return this.getChild().execute({ browser: this.browser });
      },
      block: this
    };
  }
}

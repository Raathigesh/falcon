import { observable, action, asReference, autorun, toJS } from "mobx";
import { Block } from "../../../../core";
import { DefaultNodeWidget } from "./Component";

import * as Puppeteer from "puppeteer";

export class Store extends Block {
  public browser: any;
  constructor(blocks) {
    super(blocks);
    this.name = "Browser";
    this.ComponentClass = DefaultNodeWidget;
  }

  public async execute({ context }) {
    this.browser = await Puppeteer.launch({ headless: false });
    context.executionResult = this.browser;
    this.getChild().execute({ browser: this.browser });
  }
}

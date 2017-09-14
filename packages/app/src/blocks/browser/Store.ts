import { observable, action, asReference, autorun, toJS } from "mobx";
import { Block } from "core";
import { DefaultNodeWidget } from "./Component";
import BlockNames from "../BlockNames";

import * as Puppeteer from "puppeteer";

export class Store extends Block {
  public browser: any;

  constructor() {
    super();
    this.name = BlockNames.Browser;
    this.ComponentClass = DefaultNodeWidget;
  }

  public async execute() {
    this.browser = await Puppeteer.launch({ headless: false });
    this.children[0].execute({ browser: this.browser });
  }

  @action.bound
  public count() {
    this.counter = this.counter + 1;
  }

  @action.bound
  public toggleDebug() {
    this.isDebug = !this.isDebug;
  }
}

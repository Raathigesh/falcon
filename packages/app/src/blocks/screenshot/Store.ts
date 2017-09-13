import { observable, action, asReference } from "mobx";
import BlockNames from "../BlockNames";
import { Block } from "core";
import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  constructor() {
    super();
    this.name = BlockNames.Page.Actions.Screenshot;
    this.ComponentClass = DefaultNodeWidget;
  }

  public async execute({ page }: any) {
    return await page.screenshot({ path: "example.png" });
  }
}

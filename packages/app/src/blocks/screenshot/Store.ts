import { observable, action, asReference } from "mobx";
import { Block } from "core";
import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  constructor(blocks) {
    super(blocks);
    this.name = "Screenshot";
    this.ComponentClass = DefaultNodeWidget;
  }

  public async execute({ page }: any) {
    return await page.screenshot({ path: "example.png" });
  }
}

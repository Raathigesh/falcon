import { observable, action, asReference } from "mobx";
import Block from "../core/Block";
import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  constructor() {
    super();
    this.name = "Screenshot";
    this.ComponentClass = DefaultNodeWidget;
  }

  public async execute({ page }: any) {
    return await page.screenshot({ path: "example.png" });
  }
}

import { observable, action, asReference } from "mobx";
import Block from "../core/Block";
import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  public page: any;
  constructor() {
    super();
    this.name = "Page";
    this.ComponentClass = DefaultNodeWidget;
  }

  public async execute({ browser }: any) {
    console.log("page");
    this.page = await browser.newPage();
    if (this.children[0]) {
      this.children[0].execute({ page: this.page });
    }
  }
}

import { observable, action, asReference } from "mobx";
import Block from "../core/Block";
import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  constructor() {
    super();
    this.name = "Goto";
    this.ComponentClass = DefaultNodeWidget;
  }

  public async execute({ page }: any) {
    await page.goto("http://google.com");
    this.children[0].execute({ page });
  }
}

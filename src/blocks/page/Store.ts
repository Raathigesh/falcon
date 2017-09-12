import { observable, action, asReference } from "mobx";
import Block from "../core/Block";
import BlockNames from "../BlockNames";
import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  public page: any;
  @observable public url: string = null;

  constructor() {
    super();
    this.name = BlockNames.Page.Name;
    this.ComponentClass = DefaultNodeWidget;
  }

  @action.bound
  setUrl(url: string) {
    this.url = url;
  }

  public async execute({ browser }: any) {
    this.page = await browser.newPage();
    await this.page.goto(this.url);

    if (this.children[0]) {
      this.children[0].execute({ page: this.page, url: this.url });
    }
  }
}

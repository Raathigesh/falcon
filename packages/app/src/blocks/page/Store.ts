import { observable, action, asReference } from "mobx";
import { Block, IExecutionResult } from "core";
import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  public page: any;
  @observable public url: string = null;

  constructor(blocks) {
    super(blocks);
    this.name = "Page";
    this.ComponentClass = DefaultNodeWidget;
  }

  @action.bound
  setUrl(url: string) {
    this.url = url;
  }

  public async execute({ browser }: any): Promise<IExecutionResult> {
    this.page = await browser.newPage();
    await this.page.goto(this.url);

    return {
      debug: {
        browser: browser,
        page: this.page
      },
      continue: () => {
        return this.getChild().execute({ page: this.page, url: this.url });
      },
      block: this
    };
  }
}

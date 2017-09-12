import {
  Component as BrowserComponent,
  Store as BrowserStore
} from "./browser";
import { Component as PageComponent, Store as PageStore } from "./page";
import {
  Component as ScreenshotComponent,
  Store as ScreenshotStore
} from "./screenshot";
import {
  Component as ElementComponent,
  Store as ElementStore
} from "./element";
import BlockNames from "./BlockNames";

export interface IBlockMeta {
  Category?: string;
  Name: string;
  Label: string;
  Component: any;
  Store: any;
}

const Blocks: IBlockMeta[] = [
  {
    Category: "Browser",
    Name: BlockNames.Browser,
    Label: "Browser",
    Component: BrowserComponent,
    Store: BrowserStore
  },
  {
    Category: "Page",
    Name: BlockNames.Page.Name,
    Label: "Page",
    Component: PageComponent,
    Store: PageStore
  },
  {
    Category: "Page",
    Name: BlockNames.Page.Actions.Screenshot,
    Label: "Screenshot",
    Component: ScreenshotComponent,
    Store: ScreenshotStore
  },
  {
    Category: "Page",
    Name: BlockNames.Element,
    Label: "Element",
    Component: ElementComponent,
    Store: ElementStore
  }
];

export function getByName(name: string) {
  return Blocks.filter(block => block.Name === name)[0];
}

export default Blocks;

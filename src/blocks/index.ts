import {
  Component as BrowserComponent,
  Store as BrowserStore
} from "./browser";
import { Component as PageComponent, Store as PageStore } from "./page";
import {
  Component as ScreenshotComponent,
  Store as ScreenshotStore
} from "./screenshot";
import { Component as GotoComponent, Store as GotoStore } from "./goto";
import BlockNames from "./BlockNames";

export interface IBlockMeta {
  Name: string;
  Label: string;
  Component: any;
  Store: any;
}

const Blocks: IBlockMeta[] = [
  {
    Name: BlockNames.Browser,
    Label: "Browser",
    Component: BrowserComponent,
    Store: BrowserStore
  },
  {
    Name: BlockNames.Page.Name,
    Label: "Page",
    Component: PageComponent,
    Store: PageStore
  },
  {
    Name: BlockNames.Page.Actions.Screenshot,
    Label: "Screenshot",
    Component: ScreenshotComponent,
    Store: ScreenshotStore
  },
  {
    Name: BlockNames.Page.Actions.GoTo,
    Label: "Goto",
    Component: GotoComponent,
    Store: GotoStore
  }
];

export default Blocks;

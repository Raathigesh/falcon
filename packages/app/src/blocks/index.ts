import BrowserBlock from "./browser";
import PageBlock from "./page";
import ScreenshotBlock from "./screenshot";
import ElementBlock from "./element";
import ClickBlock from "./click";
import TypeBlock from "./type";

export interface IBlockMeta {
  Category?: string;
  Label: string;
  Component: any;
  Key: string;
  Store: any;
}

const Blocks: IBlockMeta[] = [
  BrowserBlock,
  PageBlock,
  ScreenshotBlock,
  ElementBlock,
  ClickBlock,
  TypeBlock
];

export function getByName(name: string) {
  return Blocks.filter(block => block.Key === name)[0];
}

export default Blocks;

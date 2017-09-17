import { observable, action, IObservableArray } from "mobx";
import blocks from "../blocks";

export class BlocksManager {
  @observable public blocksMeta: IObservableArray<any>;
  constructor() {
    this.blocksMeta = observable([]);
    this.addBlockMetas(blocks);
  }

  @action.bound
  public addBlockMetas(blocks: any[]) {
    this.blocksMeta.push(...blocks);
  }
}

export default new BlocksManager();

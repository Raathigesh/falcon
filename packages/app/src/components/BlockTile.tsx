import * as React from "react";
import styled from "styled-components";
import { Block } from "core";
import blocksManager from "../store/BlocksManager";
import EletronHandler from "../store/ElectronHandler";

const TileDiv = styled.div`
  height: 30px;
  width: 200px;
  margin: 5px;
  padding: 4px;
  > span {
    padding-right: 5px;
  }
`;

export interface IBlockTile {
  name: string;
  store: typeof Block;
  icon: string;
  onNewBlock: (store: any) => void;
}

export default function BlockTile({
  name,
  icon,
  store,
  onNewBlock
}: IBlockTile) {
  return (
    <TileDiv
      className="pt-card pt-elevation-0 pt-interactive"
      onClick={() => {
        onNewBlock(new store(blocksManager.blocksMeta, EletronHandler));
      }}
    >
      <span className={`pt-icon-size ${icon}`} />
      <span>{name}</span>
    </TileDiv>
  );
}

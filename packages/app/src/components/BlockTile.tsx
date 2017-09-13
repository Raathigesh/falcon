import * as React from "react";
import styled from "styled-components";
import { Block } from "core";

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
  onNewBlock: (store: any) => void;
}

export default function BlockTile({ name, store, onNewBlock }: IBlockTile) {
  return (
    <TileDiv
      className="pt-card pt-elevation-0 pt-interactive"
      onClick={() => {
        onNewBlock(new store());
      }}
    >
      <span className="pt-icon-size pt-icon-application" />
      <span>{name}</span>
    </TileDiv>
  );
}

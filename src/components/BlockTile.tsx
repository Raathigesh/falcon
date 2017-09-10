import * as React from "react";
import styled from "styled-components";
import Block from "../blocks/core/Block";

const TileDiv = styled.div`
  height: 55px;
  width: 170px;
  float: left;
  margin: 5px;
  padding: 4px;
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

import * as React from "react";
import { observer } from "mobx-react";
import Draggable from "react-draggable";
import styled from "styled-components";
import BlockTile from "./BlockTile";
import ActionPanel from "./ActionPanel";
import { IBlockMeta } from "../blocks";

const Container = styled.div`
  height: 500px;
  width: 400px;
  position: fixed;
  top: 20px;
  right: 20px;
`;

const PlayBtn = styled.button`border-radius: 50px;`;

export interface IToolbox {
  blocks: IBlockMeta[];
  onNewBlock: (store: any) => void;
  onRun: () => void;
}

function Toolbox({ blocks, onNewBlock, onRun }: IToolbox) {
  return (
    <Draggable>
      <Container className="pt-card">
        <ActionPanel>
          <PlayBtn
            className="pt-button pt-large pt-icon-play pt-intent-success"
            onClick={onRun}
          />
        </ActionPanel>
        <div className="pt-input-group .modifier">
          <span className="pt-icon pt-icon-search" />
          <input
            className="pt-input"
            type="search"
            placeholder="Search input"
            dir="auto"
          />
        </div>
        {blocks.map(block => {
          return (
            <BlockTile
              name={block.Name}
              onNewBlock={onNewBlock}
              store={block.Store}
            />
          );
        })}
      </Container>
    </Draggable>
  );
}

export default observer(Toolbox);

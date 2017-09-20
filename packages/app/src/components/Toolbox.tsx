import * as React from "react";
import { observer } from "mobx-react";
import Draggable from "react-draggable";
import styled from "styled-components";
import BlockTile from "./BlockTile";
import ActionPanel from "./ActionPanel";
import { IBlockMeta } from "../blocks";
import Context from "../store/Context";
import DebugPanel from "./DebugPanel";

const Container = styled.div`
  height: 500px;
  width: 250px;
  position: fixed;
  top: 20px;
  right: 20px;
`;

const PlayBtn = styled.button`border-radius: 50px;`;
const OtherBtn = styled.button`
  border-radius: 50px;
  margin-left: 5px;
  float: right;
  margin-top: 5px;
`;

const Separator = styled.div`
  height: 30px;
  padding: 5px;
  border-radius: 50px;
  background-color: #efefef;
  margin-top: 10px;
  margin-bottom: 10px;
  > span {
    margin-left: 5px;
    font-size: 16px;
    font-weight: bold;
  }
`;

export interface IToolbox {
  blocks: IBlockMeta[];
  context: Context;
  onNewBlock: (store: any) => void;
  onRun: () => void;
  onBoot: () => void;
  onSave: () => void;
  onOpen: () => void;
}

function groupBy(blocks: IBlockMeta[]) {
  const result = {};
  for (const block of blocks) {
    if (!result[block.Category]) {
      result[block.Category] = [];
    }
    result[block.Category].push(block);
  }
  return result;
}

function Toolbox({
  blocks,
  context,
  onNewBlock,
  onRun,
  onOpen,
  onSave
}: IToolbox) {
  const groupedBlocks = groupBy(blocks);
  return (
    <div>
      <Draggable>
        <Container className="pt-card">
          <ActionPanel>
            <PlayBtn
              className="pt-button pt-large pt-icon-play pt-intent-success"
              onClick={onRun}
            />
            <OtherBtn
              className="pt-button pt-medium pt-intent-primary pt-icon-floppy-disk"
              onClick={onSave}
            />
            <OtherBtn
              className="pt-button pt-medium pt-intent-primary pt-icon-folder-open"
              onClick={onOpen}
            />
          </ActionPanel>
          <div className="pt-input-group">
            <span className="pt-icon pt-icon-search" />
            <input
              className="pt-input"
              type="search"
              placeholder="Search input"
              dir="auto"
            />
          </div>
          {Object.keys(groupedBlocks).map(key => {
            return (
              <div>
                <Separator>
                  <span>{key}</span>
                </Separator>
                <div>
                  {groupedBlocks[key].map(block => {
                    return (
                      <BlockTile
                        name={block.Label}
                        onNewBlock={onNewBlock}
                        store={block.Store}
                        icon={block.Icon}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Container>
      </Draggable>
      {context.isPaused && <DebugPanel context={context} />}
    </div>
  );
}

export default observer(Toolbox);

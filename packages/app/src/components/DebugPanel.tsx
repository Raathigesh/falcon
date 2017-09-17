import * as React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import Draggable from "react-draggable";
import styled from "styled-components";
import Context from "../store/Context";
import JSONTree from "react-json-tree";

const Container = styled.div`
  height: 400px;
  width: 500px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: rgb(0, 43, 54);
  padding: 5px;
  overflow: auto;
`;

export interface IDebugPanel {
  context: Context;
}

function DebugPanel({ context }: IDebugPanel) {
  return (
    <Container className="pt-card">
      <JSONTree data={toJS(context.executionResult)} />
    </Container>
  );
}

export default observer(DebugPanel);

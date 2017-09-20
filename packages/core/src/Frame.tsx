import * as React from "react";
import styled from "styled-components";
import { Popover, Button, Intent } from "@blueprintjs/core";
import { observer } from "mobx-react";
import Port from "./Port";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Card = styled.div`
  padding: 10px;
  min-width: 150px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  font-size: 15px;
`;

const Content = styled.div`padding-top: 10px;`;

export interface IFrame {
  node: any;
  icon: string;
  children?: any;
  details?: any;
  onRemove?: () => void;
  store: {
    name: string;
    isDebug?: boolean;
    isPaused: boolean;
    removeLink: () => void;
    toggleDebug: () => void;
  };
}

const IconPanel = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 5px;
`;

function Frame({ node, store, children, details, icon, onRemove }: IFrame) {
  const { isPaused } = store;
  return (
    <Container>
      {node.getInPorts().map(port => {
        return <Port node={port.getParent()} name={port.name} />;
      })}
      <Card className="pt-card pt-elevation-0">
        <Header>
          <IconPanel className="pt-button-group pt-minimal">
            <a className={`pt-button ${icon}`}>{store.name}</a>
            <Button
              iconName="pt-icon-selection"
              intent={isPaused ? Intent.DANGER : Intent.NONE}
              onClick={store.toggleDebug}
              active={store.isDebug}
            />
            <a
              className="pt-button pt-icon-cross pt-intent-primary"
              role="button"
              onClick={onRemove}
            />
            <Popover>
              <a
                className="pt-button pt-icon-wrench pt-intent-success"
                role="button "
              />
              {details}
            </Popover>
          </IconPanel>
        </Header>
        <Content>{children}</Content>
      </Card>
      {node.getOutPorts().map(port => {
        return (
          <Port
            node={port.getParent()}
            name={port.name}
            onRemove={store.removeLink}
          />
        );
      })}
    </Container>
  );
}

export default observer(Frame);

import * as React from "react";
import styled from "styled-components";
import { Popover } from "@blueprintjs/core";
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

const HeaderLabel = styled.div`margin-right: 10px;`;

export interface IFrame {
  node: any;
  name: string;
  children: any;
  details?: any;
  onRemove: () => void;
}

const IconPanel = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 5px;
`;

export default function Frame({
  node,
  name,
  children,
  details,
  onRemove
}: IFrame) {
  return (
    <Container>
      {node.getInPorts().map(port => {
        return <Port node={port.getParent()} name={port.name} />;
      })}
      <Card className="pt-card pt-elevation-0">
        <Header>
          <IconPanel className="pt-button-group pt-minimal">
            <a className="pt-button pt-icon-applications">{name}</a>
            <a
              className="pt-button pt-icon-hand pt-intent-primary"
              role="button"
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
        return <Port node={port.getParent()} name={port.name} />;
      })}
    </Container>
  );
}

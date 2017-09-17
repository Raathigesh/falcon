import * as React from "react";
import styled from "styled-components";

export interface PortProps {
  name: string;
  node: any;
  onRemove: () => {};
}

export interface PortState {
  selected: boolean;
}

const ConnectorSpan = styled.div`
  border-radius: 50%;
  height: 10px !important;
  width: 10px !important;
  background-color: blue;
  background-color: white !important;
  margin-left: 5px;
  margin-right: 5px;
  &:hover {
    background-color: red !important;
  }
`;

export default class PortWidget extends React.Component<PortProps, PortState> {
  constructor(props: PortProps) {
    super(props);
    this.state = {
      selected: false
    };
  }

  render() {
    return (
      <ConnectorSpan
        className="port"
        data-name={this.props.name}
        data-nodeid={this.props.node.getID()}
      >
        <a
          className={`pt-button pt-icon-small-cross`}
          onClick={this.props.onRemove}
        >
          {name}
        </a>
      </ConnectorSpan>
    );
  }
}

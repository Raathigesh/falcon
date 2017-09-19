import * as React from "react";
import styled from "styled-components";

export interface PortProps {
  name: string;
  node: any;
  onRemove?: () => void;
}

export interface PortState {
  selected: boolean;
}

const ConnectorSpan = styled.div`
  border-radius: 50%;
  height: 10px !important;
  width: 10px !important;
  margin-left: 5px;
  margin-right: 5px;
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
        onMouseEnter={() => {
          this.setState({ selected: true });
        }}
        onMouseLeave={() => {
          this.setState({ selected: false });
        }}
        className={"port" + (this.state.selected ? " selected" : "")}
        data-name={this.props.name}
        data-nodeid={this.props.node.getID()}
      >
        <a>{name}</a>
      </ConnectorSpan>
    );
  }
}

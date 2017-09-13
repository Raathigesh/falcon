import * as React from "react";
import styled from "styled-components";

const ActionPanelDiv = styled.div`
  border: 1px solid #e4e4e4;
  padding: 5px;
  border-radius: 24px;
  margin-bottom: 10px;
`;

export default function ActionPanel({ children }) {
  return <ActionPanelDiv>{children}</ActionPanelDiv>;
}

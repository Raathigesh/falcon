import * as React from "react";
import styled from "styled-components";
import { Checkbox } from "@blueprintjs/core";

const DetailsDiv = styled.div`padding: 15px;`;

export default function Details({}) {
  return (
    <DetailsDiv>
      <label className="pt-label pt-inline">
        <div className="pt-input-group">
          <Checkbox checked={true} label="Headless" />
        </div>
      </label>

      <label className="pt-label pt-inline">
        SlowMo
        <div className="pt-input-group">
          <input className="pt-input" type="text" placeholder="Ms" />
        </div>
      </label>
    </DetailsDiv>
  );
}

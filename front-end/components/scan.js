import React from "react";
import styled from "styled-components";
import Violation from "./violation";

export class Scan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      violationsExpanded: false
    }
  }
  toggleViolationsExpanded = () => {
    this.setState({violationsExpanded: !this.state.violationsExpanded});
  }

  render() {
    const {scan} = this.props;
    const ViolationList = styled.ul`
      list-style-type:none;
      padding-left: 0;
    `;
    const ToggleExpanded = styled.button`
      padding: 0.5em;
      margin-bottom: 0.5em;
      background-color: #b8def5;
      border-radius: 1em;
      cursor: pointer;
      display: block;
      font-size: 16px;
      width: 100%;
    `;
    const ScanWrapper = styled.div`
      font-family: sans-serif;
      padding: 0 1em;
      border: thin solid grey;
      margin-bottom: 0.3em;
    `;

    return (
      <ScanWrapper>
        <h3>Page Scanned: {scan.baseURL}{scan.slug}</h3>
        <span>Scanned at: {scan.timeStamp}</span>
        <ToggleExpanded onClick={this.toggleViolationsExpanded}>Axe Violations Found: {scan.violations.length}</ToggleExpanded>
        {this.state.violationsExpanded ? (
          <ViolationList>
            {scan.violations.map((violation, index) => (
              <Violation violation={violation} key={index}></Violation>
            ))}
          </ViolationList>
        ): ""}

      </ScanWrapper>
    )
  }
};

export default Scan;
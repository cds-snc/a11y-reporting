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
    const ToggleExpanded = styled.div`
      margin: 1em 0;
      background-color: pink;
    `;
    return (
      <div>
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

      </div>
    )
  }
};

export default Scan;
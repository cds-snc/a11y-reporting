import React from "react";
import styled from "styled-components";
import ViolationNode from "./violationNode";

export class Violation extends React.Component {
  render() {
    const {violation} = this.props;
    let violationColour;
    switch(violation.impact) {
      case "minor":
        violationColour = "#ffdd00";
        break;
      case "moderate":
        violationColour = "#fa9a00";
        break;
      case "severe":
        violationColour = "#e34f00";
        break;
      case "critical":
        violationColour = "red";
        break;
    }
    const NodeList = styled.ul`
      list-style-type: none;
      padding-left: 1em;
    `;
    const ViolationEle = styled.li`
      border-bottom: thin solid black;
      border-left: thin solid black;;
      border-right: thin solid black;
      border-top: 1.5em solid ${violationColour};
      padding: 1em;
      margin-bottom: 0.5em;
    `;
    const Header = styled.h4`
      margin: 0;
    `;
    return (
      <ViolationEle>
        <div>
          <Header>Impact: {violation.impact}</Header>
          <p>{violation.description}.</p>
          <p>{violation.help}.</p>
          <span>Affected code:</span>
          <NodeList>
            {violation.nodes.map((node, index) => (
              <ViolationNode node={node} key={index}></ViolationNode>
            ))}
          </NodeList>
          <p>More information: <a href={violation.helpUrl}>{violation.helpUrl}</a></p>
        </div>
      </ViolationEle>
    )
  }
}

export default Violation;
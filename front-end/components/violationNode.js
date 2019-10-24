import React from "react";
import styled from "styled-components";

export class ViolationNode extends React.Component {
  render() {
    const {node} = this.props;
    const NodeEle = styled.li`
      margin: 0.25em;
      background-color: #eee;
      padding: 0.5em;
    `;
    return (
      <NodeEle>
        <code>{node.html}</code>
        <p>{node.failureSummary}</p>
      </NodeEle>
    )
  }
}

export default ViolationNode;
import React from "react";
import styled from "styled-components";

export class Domain extends React.Component {
  render() {
    const {domain, selected, onSelect} = this.props;
    const Item = styled.li`
      padding: 1em;
      width: 300px;
      cursor: pointer;
      border-top: thin solid black;
    `;
    const SelectedItem = styled(Item)`
      background-color: grey;
    `;
    return (selected ? (
      <SelectedItem onClick={() => { onSelect(domain)}}>
        {domain}
      </SelectedItem>
    ) : (
      <Item onClick={() => { onSelect(domain)}}>
        {domain}
      </Item>
    ));
  }
}
export default Domain;
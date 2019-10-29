import React from "react";
import styled from "styled-components";
import Domain from "./domain";

export class DomainList extends React.Component {
  changeSelect = (domain) => {
    this.props.onSelectedChange(domain);
  }

  render() {
    const Wrapper = styled.div`
      display: inline-block;
      vertical-align: top;
      font-family: sans-serif;
    `;
    const List = styled.ul`
      list-style-type: none;
      padding: 0;
    `;
    return (
      <Wrapper>
        <h2>Scanned Domains:</h2>
        <List>
          {this.props.domains.map(domain => (
            <Domain
              key={domain}
              domain={domain}
              selected={this.props.selected == domain}
              onSelect={this.changeSelect}
            ></Domain>
          ))}
        </List>
      </Wrapper>
    )
  }
}

export default DomainList;
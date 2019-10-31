import React from "react";
import styled from "styled-components";

const TextBox = styled.input`
  width: 300px;
  height: 2em;
  `;
const Wrapper = styled.div`
  margin: 0.5em;
  `;

export class TextInput extends React.Component {
  render() {
    const {name, label, hint, onchange, status} = this.props;
    // translate status to a colour
    let iconColour = "grey";
    switch (status) {
      case "sent":
        iconColour = "yellow";
        break;
      case "success":
        iconColour = "green";
        break;
      case "error":
        iconColour = "red";
        break;
    }
    let Hint = styled.span`
      margin-left: 1em;
      color: grey;
      font-family: sans-serif;
    `;

    let StatusIcon = styled.div`
      display: inline-block;
      width: 1em;
      height: 1em;
      background-color: ${props => props.iconColour || "grey"};
    `;

    let Label = styled.label`
      width: 120px;
      padding-left: 1em;
      display: inline-block;
      font-family: sans-serif;
    `;

    return (
      <Wrapper>
        <StatusIcon iconColour={iconColour}></StatusIcon>
        <Label htmlFor={name}>{label}</Label>
        <TextBox type="text" name={name} id="baseURL" onChange={onchange}></TextBox>
        <Hint>{hint ? hint : ""}</Hint>
      </Wrapper>
    )
  }
}

export default TextInput;
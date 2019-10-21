import React from "react";
import styled from "styled-components";

export class TextInput extends React.Component {
  render() {
    const {name, label, hint, onchange, status} = this.props;
    const hintEle = hint ? <span>{hint}</span> : "";
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
    let StatusIcon = styled.div`
      display: inline-block;
      width: 1em;
      height: 1em;
      background-color: ${props => props.iconColour || "grey"};
    `;

    return (
      <div>
        <StatusIcon iconColour={iconColour}></StatusIcon>
        <label htmlFor={name}>{label}</label>
        <input type="text" name={name} id="baseURL" onChange={onchange}></input>
        {hintEle}
      </div>
    )
  }
}

export default TextInput;
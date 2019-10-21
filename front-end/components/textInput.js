import React from "react";

export class TextInput extends React.Component {
  render() {
    const {name, label, hint} = this.props;
    const hintEle = hint ? <span>{hint}</span> : "";
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input type="text" name={name} id="baseURL"></input>
        {hintEle}
      </div>
    )
  }
}

export default TextInput;
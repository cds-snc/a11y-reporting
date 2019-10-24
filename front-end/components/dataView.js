import React from "react";
import styled from "styled-components";
import Scan from "./scan";

export class DataView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  async componentDidUpdate(prevProps) {
    if(this.props.domain != prevProps.domain && this.props.domain != "") {
      // fetch data
      let fetchurl = "https://a11y-reporting-hanuv4jn2q-ue.a.run.app/getScansForURL?baseURL=" + this.props.domain;
      fetch(fetchurl)
        .then(response => {
          return response.json();
        }).then(data => {
          // set state with new data
          this.setState({data: data});
        }).catch(err => {
          console.error(err);
        });
      }
  }

  render() {
    const Wrapper = styled.div`
      display: inline-block;
      max-width: 700px;
      margin-left: 2em
    `
    return (
      <Wrapper>
        {this.state.data.map(scan => (
          <div key={scan._id}>
            <Scan scan={scan}></Scan>
          </div>
        ))}
      </Wrapper>
    )
  }
};

export default DataView;
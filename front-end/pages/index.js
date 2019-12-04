import React from "react";
import styled from "styled-components";
import DomainList from "../components/domainList";
import DataView from "../components/dataView";
import Head from 'next/head'

export class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      api_url: process.env.API_URL,
      domains: [],
      selectedDomain: ""
    }
  }

  async componentDidMount() {
    // request initial list of domains to render
    const fetchurl = this.state.api_url + "/getbaseURLs";
    await fetch(fetchurl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
        this.setState({domains: data})
      })
  }

  renderBaseURLs = (urls) => {
    this.setState(domains[urls]);
  }

  selectedDomainChange = (selected) => {
    this.setState({selectedDomain:selected});
  }

  render() {
    const Header = styled.h1`
      font-family: sans-serif;
    `;

    return (
      <div>
        <Head>
          <title>A11Y Report</title>
        </Head>
        <Header>A11y Report</Header>
        <DomainList
          domains={this.state.domains}
          selected={this.state.selectedDomain}
          onSelectedChange={this.selectedDomainChange}
        ></DomainList>
        <DataView domain={this.state.selectedDomain}></DataView>
      </div>
    )
  }
};

export default Index;
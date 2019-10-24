import React from "react";
import DomainList from "../components/domainList";
import DataView from "../components/dataView";

export class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      api_url: "https://a11y-reporting-hanuv4jn2q-ue.a.run.app",
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
    return (
      <div>
        <h1>A11y Reporting</h1>
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
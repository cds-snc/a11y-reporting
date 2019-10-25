import React from "react";
import styled from "styled-components";
import Scan from "./scan";
import BarChart from "./barchart";

export class DataView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dates: {}
    }
  }

  async componentDidUpdate(prevProps) {
    if(this.props.domain != prevProps.domain && this.props.domain != "") {
      this.setState({dates: [], data: []});
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

      fetch("https://a11y-reporting-hanuv4jn2q-ue.a.run.app/getDistinctDates?baseURL=" + this.props.domain)
        .then(response => {
          return response.json();
        }).then(data => {
          // parse into better data
          let dates = {
            dates: [],
            counts: []
          }
          for (let i in data) {
            let d = data[i]._id
            dates.dates.push(d.year + "-" + d.month + "-" + d.dayOfMonth);
            dates.counts.push(data[i].count);
          }
          this.setState({dates: dates});
        }).catch(err => {
          console.error(err);
        });
    }
  }

  onSelectedDateChange = async (date) => {
    // fetch new data
    this.setState({data: []})
    let fetchurl = "https://a11y-reporting-hanuv4jn2q-ue.a.run.app/getScansForDate?baseURL=" + this.props.domain + "&date=" + date;
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

  render() {
    const Wrapper = styled.div`
      display: inline-block;
      max-width: 700px;
      margin-left: 2em
    `
    return (
      <Wrapper>
        <div id="dateChart">
          <h2>Scans for {this.props.domain} by Date:</h2>
          <BarChart data={this.state.dates} onSelectDate={this.onSelectedDateChange}></BarChart>
        </div>
        <div>
          {this.state.data.map(scan => (
            <div key={scan._id}>
              <Scan scan={scan}></Scan>
            </div>
          ))}
        </div>
      </Wrapper>
    )
  }
};

export default DataView;
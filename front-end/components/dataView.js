import React from "react";
import styled from "styled-components";
import Scan from "./scan";
import BarChart from "./barchart";

export class DataView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      slugs: [],
      slug: "",
      dates: {},
      date: ""
    }
  }

  async fetchAllScans() {
    // fetch data
    let fetchurl = "https://a11y-reporting-hanuv4jn2q-ue.a.run.app/getScans?baseURL=" + this.props.domain;
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

  async componentDidUpdate(prevProps) {
    if(this.props.domain != prevProps.domain && this.props.domain != "") {
      this.setState({dates: [], data: []});
      
      this.fetchAllScans();

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
      
      fetch("https://a11y-reporting-hanuv4jn2q-ue.a.run.app/getDistinctSlugs?baseURL=" + this.props.domain)
        .then(response => {
          return response.json();
        }).then(data => {
          this.setState({slugs: data});
        }).catch(err => {
          console.error(err);
        });
    }
  }

  onFilterChange = async (e) => {
    const slug = e.target.value;
    this.setState({slug: slug});
    this.setState({data: []});
    let fetchurl = "https://a11y-reporting-hanuv4jn2q-ue.a.run.app/getScans?baseURL=" + this.props.domain + "&slug=" + slug + "&date=" + this.state.date;
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

  clearFilters = () => {
    this.setState({slug: "", date: "", data: []});
    this.fetchAllScans();
  }

  onSelectedDateChange = async (date) => {
    // fetch new data
    this.setState({data: [], date: date})
    let fetchurl = "https://a11y-reporting-hanuv4jn2q-ue.a.run.app/getScans?baseURL=" + this.props.domain + "&date=" + date + "&slug=" + this.state.slug;
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
    `;

    return (
      <Wrapper>
        <div id="dateChart">
          <h2>Scans for {this.props.domain} by Date:</h2>
          <BarChart data={this.state.dates} onSelectDate={this.onSelectedDateChange} selectedDate={this.state.date}></BarChart>
          <div>
            <h3>Filter by scanned page:</h3>
            {this.state.slugs.map(slug => (
              <button onClick={this.onFilterChange} key={slug} value={slug}>
                {slug}
              </button>
            ))}
          </div>
          <button onClick={this.clearFilters}>Clear Filters</button>
        </div>
        <div>
          <h4>{this.state.data.length} scans found:</h4>
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
import React from "react";
import * as d3 from "d3";

export class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: {}
    }
  }
  componentDidMount() {
    this.setState({svg: d3.select("#dateChart").append("svg").attr("width", 700).attr("height", 300)});
  }

  componentDidUpdate() {
    if (this.props.data.counts) {
      this.drawChart();
    }
      
  }

  selectDate = (d, i) => {
    this.props.onSelectDate(this.props.data.dates[i])
  }

  drawChart() {
    const svg = this.state.svg,
      data = this.props.data;

    svg.selectAll("text")
      .data(data.dates)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 105 + 15)
      .attr("y", 295);
    
    const that = this;

    svg.selectAll("rect")
      .data(data.counts)
      .enter()
      .append("rect")
        .attr("x", (d, i) => i * 105)
        .attr("y", (d, i) => 275 - 10 * d)
        .attr("width", 100)
        .attr("height", (d, i) => d * 10)
        .attr("fill", (d, i) => {
          if(that.props.selectedDate == that.props.data.dates[i]) {
            return "green";
          }
          return "blue"
        })
        .on("click", this.selectDate)
        .on("mouseover", function(d) {
            d3.select(this).style("cursor", "pointer"); 
          });

  }

  render() {
    return <div id={"#" + this.props.id}></div>
  }
}
export default BarChart;
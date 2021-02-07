import * as d3 from "d3";
import React, { Component } from "react";

export default class CrimeChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.temps = React.createRef();
  }

  createChart = data => {};

  componentDidMount() {
    this.createChart(this.props.data);
  }

  render() {
    return <div ref={this.chartRef}></div>;
  }
}

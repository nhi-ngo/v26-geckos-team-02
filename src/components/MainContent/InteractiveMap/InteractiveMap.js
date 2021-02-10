import React, { Component } from "react";
import * as d3 from "d3";
// import topojson from "topojson-client";
import * as topojson from "topojson-client";
import testfile from "./states-albers-10m.json";

export default class InteractiveMap extends Component {
  constructor(props) {
    super(props);
    this.interactiveMap = React.createRef();
  }

  reset = () => {};

  componentDidMount() {
    const path = d3.geoPath();
    const us = testfile;

    const width = 975,
      height = 610;

    this.svg = d3
      .select(this.interactiveMap.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("border", "1px solid black");
    // .on("click", this.reset);

    const g = this.svg.append("g");

    this.states = g
      .append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .join("path")
      // .on("click", clicked)
      .attr("d", path);

    console.log("test file", testfile);
  }

  render() {
    return <div ref={this.interactiveMap}></div>;
  }
}

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

  reset = () => {
    console.log("RESET CALLED");

    this.states.transition().style("fill", null);
    this.svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2]),
      );
  };

  zoomed = evt => {
    console.log("ZOOMED CALLED");

    const { transform } = evt;
    this.g.attr("transform", transform);
    this.g.attr("stroke-width", 1 / transform.k);
  };

  componentDidMount() {
    const path = d3.geoPath();
    const us = testfile;

    const width = 975,
      height = 610;

    const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", this.zoomed);

    this.svg = d3
      .select(this.interactiveMap.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("border", "1px solid black");
    // .on("click", this.reset);

    this.g = this.svg.append("g");

    this.states = this.g
      .append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .join("path")
      // .on("click", clicked)
      .attr("d", path);

    this.g
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

    this.svg.call(zoom);

    console.log("test file", testfile);
  }

  render() {
    return <div ref={this.interactiveMap}></div>;
  }
}

import React, { Component } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import us from "./states-albers-10m.json";

export default class InteractiveMap extends Component {
  constructor(props) {
    super(props);
    this.interactiveMap = React.createRef();
    this.width = 975;
    this.height = 610;
  }

  reset = () => {
    console.log("RESET CALLED");

    this.states.transition().style("fill", null);
    this.svg
      .transition()
      .duration(750)
      .call(
        this.zoom.transform,
        d3.zoomIdentity,
        d3
          .zoomTransform(this.svg.node())
          .invert([this.width / 2, this.height / 2]),
      );
  };

  zoomed = evt => {
    const { transform } = evt;
    this.g.attr("transform", transform);
    this.g.attr("stroke-width", 1 / transform.k);
  };

  clicked = (event, d) => {
    const [[x0, y0], [x1, y1]] = this.path.bounds(d);

    console.log("D IS: ", d, x0, y0, x1, y1);

    event.stopPropagation();
    this.states.transition().style("fill", null);
    d3.select(event.target).transition().style("fill", "red");

    this.svg
      .transition()
      .duration(750)
      .call(
        this.zoom.transform,
        d3.zoomIdentity
          .translate(this.width / 2, this.height / 2)
          .scale(
            Math.min(
              8,
              0.9 / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height),
            ),
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, this.svg.node()),
      );

    console.log("CLICKED ON: ", d.properties.name);
  };

  componentDidMount() {
    this.path = d3.geoPath();

    this.zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", this.zoomed);

    this.svg = d3
      .select(this.interactiveMap.current)
      .append("svg")
      .attr("viewBox", [0, 0, this.width, this.height])
      .style("border", "1px solid black")
      .on("click", this.reset);

    this.g = this.svg.append("g");

    this.states = this.g
      .append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .join("path")
      .on("click", this.clicked)
      .attr("d", this.path);

    this.states.append("title").text(d => d.properties.name);

    this.g
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr(
        "d",
        this.path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)),
      );

    this.svg.call(this.zoom);
  }

  render() {
    return <div ref={this.interactiveMap}></div>;
  }
}

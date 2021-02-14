import React, { Component } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import us from "../../../data/states-albers-10m.json";
import { withRouter } from "react-router-dom";
import statesAbbr from "../../../data/states.json";

class InteractiveMap extends Component {
  constructor(props) {
    super(props);
    this.interactiveMap = React.createRef();
    this.width = 975;
    this.height = 610;
  }

  reset = () => {
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

    event.stopPropagation();
    this.states.transition().style("fill", null);
    d3.select(event.target).transition().style("fill", "#049c0b");

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

    this.props.history.push(
      `/crime/state/${
        statesAbbr.find(state => state.name === d.properties.name).abbr
      }`,
    );
  };

  drawMap = () => {
    this.path = d3.geoPath();
    this.zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", this.zoomed);

    const regexResult = this.props.location.pathname.match(
      /\/crime\/state\/([A-Z]{2})/,
    );

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

    // Results page
    if (regexResult) {
      const stateName = statesAbbr.find(state => state.abbr === regexResult[1])
        .name;

      const obj = this.states._groups[0].find(
        state => state.textContent === stateName,
      );

      const [[x0, y0], [x1, y1]] = this.path.bounds(
        topojson.feature(us, us.objects.states).features[
          this.states._groups[0].findIndex(
            state => state.textContent === stateName,
          )
        ],
      );

      this.states.transition().style("fill", null);
      d3.select(obj).transition().style("fill", "#049c0b");

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
          // d3.pointer(event, this.svg.node()),
        );
    }

    this.svg.call(this.zoom);
  };

  componentDidMount() {
    this.drawMap();
  }

  componentDidUpdate() {
    const intMap = document.querySelector(".interactiveMap");

    while (intMap.firstChild) {
      intMap.removeChild(intMap.lastChild);
    }

    this.drawMap();
  }

  render() {
    const { fullWidth } = this.props;
    const styleObj = fullWidth ? {} : { width: "400px", height: "300px" };

    return (
      <div
        style={styleObj}
        ref={this.interactiveMap}
        className="interactiveMap"
      ></div>
    );
  }
}

export default React.memo(withRouter(InteractiveMap));

import React, { Component } from "react";
import * as d3 from "d3";

const ENV_DEV = process.env.NODE_ENV === "development";

// Sample chart, for quick experimentation with D3. Feel free to remove this component
class SampleChart2 extends Component {
  constructor(props) {
    super(props);

    this.sampleChart2 = React.createRef();
  }

  componentDidMount() {
    // Create a canvas element with specified dimensions and a border
    const canvasHeight = 400,
      canvasWidth = 600;

    this.svgCanvas = d3
      .select(this.sampleChart2.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "1px solid black");

    this.drawBarChart(this.props);
  }

  componentDidUpdate() {
    this.drawBarChart(this.props);
    ENV_DEV && console.log(`Data to plot: ${this.props.data}`);
  }

  drawBarChart(props) {
    // Destructure props
    const { data, fromYear, toYear } = props;
    const canvasHeight = 400,
      canvasWidth = 600;

    // The Y coordinate of the max value will always be at 95% of the canvas height, and the other values will adjust accordingly
    const maxYRatio = 0.95;

    const margin = { top: 10, right: 20, bottom: 30, left: 50 },
      width = canvasWidth - margin.left - margin.right,
      height = canvasHeight - margin.top - margin.bottom;

    // Adjust rectangle width based on number of data points
    const rectGap = 10,
      rectWidth = width / data.length - rectGap;

    /* Normalize the height of the rectangles based on the max value */
    const maxVal = Math.max(...data);
    const maxValY = height * 0.95;

    // Clear previous graph
    this.svgCanvas.selectAll("*").remove();

    // For each element of the `data` array, create a rectangle
    this.svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", rectWidth)
      .attr("height", datapoint => (datapoint / maxVal) * maxValY)

      // Fill the rectangle in blue
      .attr("fill", "blue")

      // Offset each successive rectangle horizontally
      .attr("x", (dp, i) => margin.left + i * (rectWidth + rectGap))

      // Ensure that the bars lay on the bottom of the chart
      .attr("y", dp => height - (dp / maxVal) * maxValY);

    // Add X axis data points
    const x = d3
      .scaleLinear()
      .domain([fromYear, toYear])
      .range([
        margin.left + rectWidth / 2,
        margin.left + rectWidth / 2 + (data.length - 1) * (rectWidth + rectGap),
      ]);

    this.svgCanvas
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add X axis label
    this.svgCanvas
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", margin.left + width / 2)
      .attr("y", height + 33)
      .text("Year");

    // Y axis data points
    const y = d3
      .scaleLinear()
      .domain([0, Math.max(...data) / maxYRatio])
      .range([height, 0]);

    this.svgCanvas
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));
  }

  render() {
    return (
      <div>
        <h3>{this.props.crimeType} data</h3>
        <div ref={this.sampleChart2}></div>
      </div>
    );
  }
}
export default SampleChart2;

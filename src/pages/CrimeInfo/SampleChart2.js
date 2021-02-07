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

    // Adjust rectangle width based on number of data points
    const rectGap = 10,
      rectWidth = canvasWidth / data.length - rectGap;

    /* Normalize the height of the rectangles based on the max value (2 steps) */
    // step 1: Find max value
    const maxVal = Math.max(...data);

    // step 2: max value will always be at 95% of the canvas height, and the other values will adjust accordingly
    const maxValY = canvasHeight * 0.95;

    this.svgCanvas.selectAll("*").remove();

    // For each element of the `data` array, create a rectangle 40px wide and (datapoint * 20)px tall
    this.svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", rectWidth)
      // .attr("height", datapoint => (datapoint / maxVal) * maxValY)
      .attr("height", datapoint => datapoint * 19)

      // Fill the rectangle in blue
      .attr("fill", "blue")

      // Offset each successive rectangle horizontally by 50 pixels (40px width + a 10px gap between bars)
      .attr("x", (dp, i) => i * (rectWidth + rectGap))

      // Ensure that the bars lay on the bottom of the chart
      .attr("y", (dp, i) => canvasHeight - (dp / maxVal) * maxValY);
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

import React, { Component } from "react";
import * as d3 from "d3";

// Simple self-contained chart, for quick experimentation with D3. Feel free to remove this component
class SampleChart1 extends Component {
  constructor(props) {
    super(props);

    // Create a reference to a specific DOM element for later use
    this.sampleChart = React.createRef();
  }

  componentDidMount() {
    // Sample data
    const data = [2, 4, 2, 6, 8];
    this.drawBarChart(data);
  }

  drawBarChart(data) {
    // Variables
    const canvasHeight = 400,
      canvasWidth = 600;
    const rectWidth = 40,
      rectGap = 10;

    // Vertical pixels for each unit in the data
    const vScale = 20;

    // Select the REF in the DOM and create a canvas element with specified dimensions and a border
    const svgCanvas = d3
      .select(this.sampleChart.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "1px solid black");

    // For each element of the `data` array, create a rectangle 40px wide and (datapoint * 20)px tall
    svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", rectWidth)
      .attr("height", datapoint => datapoint * vScale)

      // Fill the rectangle in orange
      .attr("fill", "orange")

      // Offset each successive rectangle horizontally by 50 pixels (40px width + a 10px gap between bars)
      .attr("x", (dp, i) => i * (rectWidth + rectGap))

      // Ensure that the bars lay on the bottom of the chart
      .attr("y", (dp, i) => canvasHeight - dp * vScale);
  }

  render() {
    return (
      <div>
        <h3>Sample chart 1</h3>
        <div ref={this.sampleChart}></div>
      </div>
    );
  }
}
export default SampleChart1;

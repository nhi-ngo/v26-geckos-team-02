import React, { useEffect, useRef } from "react";
import * as d3 from "d3v4";

function NhiChart(props) {
  const { data, fromYear, toYear, crimeType } = props;

  const crimeChart = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    // Clear previous graph
    const chart = document.querySelector(".crimeChart");
    while (chart.firstChild) {
      chart.removeChild(chart.lastChild);
    }

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 20, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // parse the year
    function convertToYearFormat(t) {
      let parseTime = d3.timeParse("%Y");
      return parseTime(t);
    }

    // append the svg object to the body of the page
    const svg = d3
      .select(".crimeChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    const x = d3
      .scaleTime()
      .domain([convertToYearFormat(fromYear), convertToYearFormat(toYear)])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(d3.timeYear.every(1)));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0, Math.max(...data)])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // ! Add the line - STUCK HERE
    svg
      .append("path")
      .datum(data)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveBasis)
          .x((d, i) => x(convertToYearFormat(fromYear + i)))
          .y(d => y(d)),
      );
  }

  return (
    <div>
      <h3>{crimeType} data</h3>
      <div ref={crimeChart} className="crimeChart"></div>
    </div>
  );
}

export default NhiChart;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box } from "@material-ui/core";

import DateDropdown from "./DateDropdown";
import CrimeTypeDropdown from "./CrimeTypeDropdown";
import CrimeChart from "./CrimeChart";
import SampleChart1 from "./SampleChart1";
import SampleChart2 from "./SampleChart2";
import stateData from "../../../src/components/Navbar/data.json";

export default function CrimeInfo(props) {
  const [info, setInfo] = useState([]);
  const [fromYear, setFromYear] = useState(1998);
  const [toYear, setToYear] = useState(2010);
  const [crimeType, setCrimeType] = useState("Homicide");

  const API_KEY = process.env.REACT_APP_API_KEY;
  const stateId = props.match.params.stateId;

  const updateFrom = year => {
    setFromYear(year);
  };

  const updateTo = year => {
    setToYear(year);
  };

  const fetchCrimeInfo = () => {
    axios
      .get(
        `https://api.usa.gov/crime/fbi/sapi/api/estimates/states/${props.match.params.stateId}/${fromYear}/${toYear}?API_KEY=${API_KEY}`,
      )
      .then(res => setInfo(res.data.results.sort((a, b) => a.year - b.year)));
  };

  useEffect(() => {
    fetchCrimeInfo();
  }, [stateId, fromYear, toYear]);

  const getCrimeType = type => {
    setCrimeType(type);
  };

  const abbrToState = () => {
    return stateData.map(state =>
      state.abbr === props.match.params.stateId ? state.name : "",
    );
  };

  // Build a data array from the selected data
  const filterData = (crimeData, type) =>
    crimeData.map(item => {
      switch (type) {
        case "Rape":
          return item.rape_legacy;
        case "Robbery":
          return item.robbery;
        case "Arson":
          return item.arson;
        case "Larceny":
          return item.larceny;
        case "Burglary":
          return item.burglary;
        default:
          return item.homicide;
      }
    });

  return (
    <div>
      <div className = "crime-info-heading-container" >
        <h1 className="crime-info-heading">Crime data for <i>{abbrToState()}</i></h1>
      </div>

      <Box display="flex" justifyContent="center" flexWrap="wrap">
        <Box p={1}>
          <DateDropdown
            fromYear={fromYear}
            toYear={toYear}
            updateFromYear={updateFrom}
            updateToYear={updateTo}
          />
        </Box>

        <Box p={1}>
          <CrimeTypeDropdown type={crimeType} getCrimeType={getCrimeType} />
        </Box>
      </Box>

      <CrimeChart
        data={filterData(info, crimeType)}
        crimeType={crimeType}
        fromYear={fromYear}
        toYear={toYear}
      />

      <SampleChart2
        data={filterData(info, crimeType)}
        crimeType={crimeType}
        fromYear={fromYear}
        toYear={toYear}
      />
    </div>
  );
}

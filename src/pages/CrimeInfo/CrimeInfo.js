import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box, Container } from "@material-ui/core";

import DateDropdown from "./DateDropdown";
import CrimeTypeDropdown from "./CrimeTypeDropdown";
import LineChart from "./LineChart";
import stateData from "../../../src/data/states.json";
import InteractiveMap from "../../components/MainContent/InteractiveMap/InteractiveMap";

export default function CrimeInfo(props) {
  const [info, setInfo] = useState([]);
  const [fromYear, setFromYear] = useState(2005);
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
        `https://api.usa.gov/crime/fbi/cde/estimate/state/${props.match.params.stateId}?from=${fromYear}&to=${toYear}&API_KEY=${API_KEY}`,
      )
      .then(res => setInfo(res.data.sort((a, b) => a.year - b.year)));
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
    <Container>
      <div className="crime-info-heading-container">
        <h1 className="crime-info-heading">
          Crime data for <i>{abbrToState()}</i>
        </h1>
      </div>

      <Box
        id="dropdown-box"
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        marginBottom="2rem"
      >
        <Box id="dropdown-container" p={1}>
          <DateDropdown
            className="dropdown"
            fromYear={fromYear}
            toYear={toYear}
            updateFromYear={updateFrom}
            updateToYear={updateTo}
          />
        </Box>

        <Box className="dropdown" p={1}>
          <CrimeTypeDropdown type={crimeType} getCrimeType={getCrimeType} />
        </Box>
      </Box>

      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} md={6}>
          <LineChart
            data={filterData(info, crimeType)}
            crimeType={crimeType}
            fromYear={fromYear}
            toYear={toYear}
          />
        </Grid>

        <Grid id="map-container" item xs={12} md={4}>
          <InteractiveMap fullWidth={false} />
        </Grid>
      </Grid>
    </Container>
  );
}

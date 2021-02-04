import React, { useState, useEffect } from "react";
import axios from "axios";
import Divider from "@material-ui/core/Divider";

import DateDropdown from "./DateDropdown";
import CrimeTypeDropdown from "./CrimeTypeDropdown";
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
      .then(res => setInfo(res.data.results));
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

  const renderList = () => {
    return info.map(entry => {
      return (
        <li key={entry.year}>
          {entry.year} - {crimeType}:{" "}
          {crimeType === "Rape"
            ? entry.rape_legacy
            : crimeType === "Robbery"
            ? entry.robbery
            : crimeType === "Arson"
            ? entry.arson
            : crimeType === "Larceny"
            ? entry.larceny
            : crimeType === "Burglary"
            ? entry.burglary
            : entry.homicide}
        </li>
      );
    });
  };

  return (
    <div>
      <h1>{abbrToState()} </h1>
      <Divider />

      <DateDropdown
        fromYear={fromYear}
        toYear={toYear}
        updateFromYear={updateFrom}
        updateToYear={updateTo}
      />

      <CrimeTypeDropdown type={crimeType} getCrimeType={getCrimeType} />

      <ul>{renderList()}</ul>
    </div>
  );
}

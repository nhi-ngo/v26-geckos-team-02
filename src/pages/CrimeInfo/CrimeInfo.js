import React, { useState, useEffect } from "react";
import axios from "axios";
import DateDropdown from "./DateDropdown";

export default function CrimeInfo(props) {
  const [info, setInfo] = useState([]);
  const [fromYear, setFromYear] = useState(1998);
  const [toYear, setToYear] = useState(2010);
  const updateFrom = year => {
    setFromYear(year)
  }
  const updateTo = year => {
    setToYear(year)
  }

  const API_KEY = process.env.REACT_APP_API_KEY;
  const stateId = props.match.params.stateId;

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

  return (
    <div>
      <h1>Crime Info for {stateId} </h1>

      <DateDropdown fromYear={fromYear} toYear={toYear} updateFromYear={updateFrom} updateToYear={updateTo}/>
      <ul>
        {info.map(entry => (
          <li key={entry.year}>
            Year: {entry.year} - Burglary: {entry.burglary}
          </li>
        ))}
      </ul>
    </div>
  );
}

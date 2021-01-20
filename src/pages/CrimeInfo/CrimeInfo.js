import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CrimeInfo(props) {
  const [info, setInfo] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const stateId = props.match.params.stateId;

  const fetchCrimeInfo = () => {
    axios
      .get(
        `https://api.usa.gov/crime/fbi/sapi/api/estimates/states/${props.match.params.stateId}/2009/2019?API_KEY=${API_KEY}`,
      )
      .then(res => setInfo(res.data.results));
  };

  useEffect(() => {
    fetchCrimeInfo();
  }, [stateId]);

  return (
    <div>
      <h1>Crime Info for {stateId} </h1>

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

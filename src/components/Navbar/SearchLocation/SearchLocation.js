import React, { useState, useEffect } from "react";
import data from "./data.json";

export default function SearchLocation() {
  const [states, setStates] = useState([]);

  // const API_KEY = "e14y0OqlWGddCHCXLC3UzLBlcKecsGrxlahVvogx";

  // const stateEl = useRef();

  useEffect(() => {
    fetchListOfStates();
  }, []);

  function fetchListOfStates() {
    setStates(data);
  }

  return (
    <div>
      <select id="states">
        {states.map(state => (
          <option value={state.abbr} key={state.abbr}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
}

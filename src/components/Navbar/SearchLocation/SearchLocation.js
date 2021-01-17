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
<<<<<<< HEAD
        <option value="" hidden>
=======
        <option value="" disabled>
>>>>>>> 81bbeab34aa5276b374a2f1a1685d0dd9be6cd1b
          Select a state
        </option>
        {states.map(state => (
          <option value={state.abbr} key={state.abbr}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
}

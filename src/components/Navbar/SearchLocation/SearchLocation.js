import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function SearchLocation(props) {
  const handleStateChange = e => {
    props.history.push(`/crime/state/${e.target.value}`);
  };

  const [selection, setSelection] = useState("Select a state");

  useEffect(() => {
    const regexResult = props.location.pathname.match(
      /\/crime\/state\/([A-Z]{2})/,
    );

    if (regexResult) {
      setSelection(regexResult[1]);
    } else {
      setSelection("Select a state");
    }
  }, [props.history.location.pathname]);

  return (
    <div id="search-location">
      <select
        id="states"
        onChange={handleStateChange}
        value={selection === "Select a state" ? "" : selection}
      >
        <option value="" hidden>
          Select a state
        </option>
        {props.states.map(state => (
          <option value={state.abbr} key={state.abbr}>
            {state.name}, {state.abbr}
          </option>
        ))}
      </select>
    </div>
  );
}

export default withRouter(SearchLocation);

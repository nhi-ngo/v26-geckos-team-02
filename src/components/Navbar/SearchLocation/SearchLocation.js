import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";

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
      <FormControl
        style={{
          width: "165px",
          height: "44px",
          backgroundColor: "transparent",
        }}
      >
        <InputLabel id="states" style={{ paddingLeft: "1rem" }}>
          Select a state
        </InputLabel>

        <Select
          onChange={handleStateChange}
          labelId="states"
          style={{ color: "#121212", fontWeight: "bold", paddingLeft: "1rem" }}
          value={selection === "Select a state" ? "" : selection}
        >
          {props.states.map(state => (
            <MenuItem value={state.abbr} key={state.abbr}>
              {state.name}, {state.abbr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default withRouter(SearchLocation);

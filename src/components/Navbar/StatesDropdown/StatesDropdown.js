import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";

function StatesDropdown(props) {
  const [selected, setSelected] = useState("Select a state");

  const handleChange = e => {
    props.history.push(`/crime/state/${e.target.value}`);
  };

  useEffect(() => {
    const regexResult = props.location.pathname.match(
      /\/crime\/state\/([A-Z]{2})/,
    );

    if (regexResult) {
      setSelected(regexResult[1]);
    } else {
      setSelected("Select a state");
    }
  }, [props.history.location.pathname]);

  return (
    <div id="search-location">
      <FormControl
        style={{
          width: "205px",
          height: "44px",
          backgroundColor: "transparent",
        }}
      >
        <InputLabel id="states" style={{ paddingLeft: "1rem" }}>
          Select a state
        </InputLabel>

        <Select
          onChange={handleChange}
          labelId="states"
          style={{ color: "#121212", fontWeight: "bold", paddingLeft: "1rem" }}
          value={selected === "Select a state" ? "" : selected}
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

export default withRouter(StatesDropdown);

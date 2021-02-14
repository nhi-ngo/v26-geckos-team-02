import React from "react";
import { withRouter } from "react-router-dom";
import { FormControl, MenuItem, Select, InputLabel, FormHelperText } from '@material-ui/core';
class SearchLocation extends React.Component {
  handleStateChange = e => {
    this.props.history.push(`/crime/state/${e.target.value}`);
  };

  render() {
    return (
      <div id="search-location">
        <FormControl style={{ width: "165px", height: "44px", backgroundColor:"transparent" }}>

        <InputLabel id="states" style={{ paddingLeft: "1rem" }}>Select a state</InputLabel>

          <Select
            onChange = {this.handleStateChange}
            labelId = "states"
            style = {{ color: "#121212", fontWeight:"bold", paddingLeft: "1rem" }}
          >
            {this.props.states.map(state => (
              <MenuItem value={state.abbr} key={state.abbr}>
                {state.name}, {state.abbr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default withRouter(SearchLocation);

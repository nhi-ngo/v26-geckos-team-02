import React from "react";
import { withRouter } from "react-router-dom";
class SearchLocation extends React.Component {
  handleStateChange = e => {
    this.props.history.push(`/crime/state/${e.target.value}`);
  };

  render() {
    return (
      <div>
        <select id="states" onChange={this.handleStateChange}>
          <option value="" hidden>
            Select a state
          </option>
          {this.props.states.map(state => (
            <option value={state.abbr} key={state.abbr}>
              {state.name}, {state.abbr}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default withRouter(SearchLocation);

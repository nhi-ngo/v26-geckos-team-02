import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  icon: {
    color: "white",
    paddingRight: "0.5rem"
  },
});

class dateDropDown extends Component {
  constructor(props) {
    super(props);
  }

  updateYear(type, val) {
    if (type === "fromYear") {
      this.props.updateFromYear(val);
    } else {
      this.props.updateToYear(val);
    }
  }

  render() {
    const { classes, fromYear, toYear } = this.props;

    const startYear = 1993,
      endYear = 2019,
      yearsArray = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i,
      );

    return (
      <div>
        <FormControl
          className="date-dropdown"
          style={{
            width: "180px",
            paddingLeft: "1rem",
            backgroundColor: "#121212",
          }}
        >
          <InputLabel
            id="from"
            style={{
              color: "white",
              paddingLeft: "1rem",
              paddingTop: "0.6rem",
            }}
          >
            From:
          </InputLabel>

          <Select
            style={{ color: "white", fontWeight: "bold" }}
            classes={{
              icon: classes.icon,
            }}
            labelId="from"
            id="from-year-select"
            value={this.props.fromYear}
            onChange={e => this.updateYear("fromYear", e.target.value)}
          >
            {yearsArray.map(i => (
              <MenuItem key={i} value={i} disabled={i > toYear}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className="date-dropdown"
          style={{
            width: "180px",
            marginLeft: "1rem",
            paddingLeft: "1rem",
            backgroundColor: "#121212",
          }}
        >
          <InputLabel
            id="to-select"
            style={{
              color: "white",
              paddingLeft: "1rem",
              paddingTop: "0.6rem",
            }}
          >
            To:
          </InputLabel>
          <Select
            style={{ color: "white", fontWeight: "bold" }}
            classes={{
              icon: classes.icon,
            }}
            labelId="to-select"
            id="to-select"
            value={this.props.toYear}
            onChange={e => this.updateYear("toYear", e.target.value)}
          >
            {yearsArray.map(i => (
              <MenuItem key={i} value={i} disabled={i < fromYear}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(dateDropDown));

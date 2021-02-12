import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function CrimeTypeDropdown(props) {
  const types = ["Rape", "Robbery", "Arson", "Larceny", "Burglary"];

  const onMenuChange = e => {
    props.getCrimeType(e.target.value);
  };

  return (
    <div>
      <FormControl
        className="crimeTypes-dropdown"
        style={{ width: "390px", backgroundColor:"#121212"}}
      >
        <InputLabel id="crimeTypes" style={{color: "white", paddingLeft:"1rem", paddingTop: "0.2rem" }}>Select a Crime Type</InputLabel>

        <Select
          style={{color: "white", fontWeight: "bold", paddingLeft: "1rem" }}
          labelId="crimeTypes"
          id="crimeTypes"
          value={props.type}
          onChange={onMenuChange}
        >
          <MenuItem value="Homicide">Homicide</MenuItem>

          {types.map(el => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
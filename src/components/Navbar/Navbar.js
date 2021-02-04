import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Box } from "@material-ui/core";

import data from "./data.json";

import Logo from "./Logo/Logo";
import LocateMeButton from "./LocateMeButton/LocateMeButton";
import SearchLocation from "./SearchLocation/SearchLocation";

export default function Navbar(props) {
  const [states, setStates] = useState([]);

  const fetchListOfStates = () => {
    setStates(data);
  };

  useEffect(() => {
    fetchListOfStates();
  }, []);

  return (
    <Box mt={4}>
      <Grid container justify="space-between">
        <Link to="/" className="logo">
          <Logo />
        </Link>
        <LocateMeButton />
        <SearchLocation states={states} />
      </Grid>
    </Box>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "./data.json";

import Logo from "./Logo/Logo";
import LocateMeButton from "./LocateMeButton/LocateMeButton";
import SearchLocation from "./SearchLocation/SearchLocation";

export default function Navbar() {
  const [states, setStates] = useState([]);

  const fetchListOfStates = () => {
    setStates(data);
  };
  
  useEffect(() => {
    fetchListOfStates();
  }, []);

  return (
    <>
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <LocateMeButton />
      <SearchLocation states={states} />
    </>
  );
}

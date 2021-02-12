import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Landing from "./pages/Landing/Landing";
import CrimeInfo from "./pages/CrimeInfo/CrimeInfo";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "./App.css";

const ENV_DEV = process.env.NODE_ENV === "development";
require("dotenv").config();

export default function App() {
  const [isGeolocationAllowed, setIsGeolocationAllowed] = useState(false);
  const [isGeolocationSupported, setIsGeolocationSupported] = useState(true);
  const [isGeolocationBlocked, setIsGeolocationBlocked] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState(null);

  const onSuccess = pos => {
    const crds = pos.coords;

    ENV_DEV &&
      console.log(
        `You are at lat: ${crds.latitude} lon: ${crds.longitude} plus or minus ${crds.accuracy} meters`,
      );

    setIsGeolocationAllowed(true);
    setUserCoordinates(crds);
  };

  const onFailure = () => {
    ENV_DEV && console.log("You blocked geolocation for this website");
    setIsGeolocationBlocked(true);
  };

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
    } else {
      ENV_DEV && console.error("Geolocation is not supported by your browser");
      setIsGeolocationSupported(false);
    }
  };

  useEffect(() => {
    getGeoLocation();
  }, []);

  return (
    <Container>
      <BrowserRouter>
        <Navbar geolocationAllowed={isGeolocationAllowed} />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Landing
                geolocationSupported={isGeolocationSupported}
                geolocationBlocked={isGeolocationBlocked}
                userCoordinates={userCoordinates}
              />
            )}
          />
          <Route path="/crime/state/:stateId" component={CrimeInfo} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Container } from "@material-ui/core";
import Landing from "./pages/Landing/Landing";
import CrimeInfo from "./pages/CrimeInfo/CrimeInfo";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "./App.css";

const ENV_DEV = process.env.NODE_ENV === "development";
require("dotenv").config();

export default function App() {
  const [isGeolocationSupported, setIsGeolocationSupported] = useState(true);
  const [isGeolocationBlocked, setIsGeolocationBlocked] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [userState, setUserState] = useState(null);

  const onSuccess = pos => {
    const crds = pos.coords;

    ENV_DEV &&
      console.log(
        `You are at lat: ${crds.latitude} lon: ${crds.longitude} plus or minus ${crds.accuracy} meters`,
      );

    setUserCoordinates(crds);

    // Detect US state of user
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${crds.longitude},${crds.latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&country=us&types=region`,
      )
      .then(res => {
        const location = res.data.features[0].properties.short_code;
        ENV_DEV && console.log("User location: ", location);

        if (location.split("-")[0] === "US") {
          ENV_DEV && console.log("User state set to ", location.split("-")[1]);
          setUserState(location.split("-")[1]);
        }
      });
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
        <Navbar userState={userState} />
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

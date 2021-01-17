import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import "./App.css";

const ENV_DEV = process.env.NODE_ENV === "development";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoLocation: {},
      isGeolocationBlocked: false,
      isGeolocationSupported: true,
    };
  }

  onSuccess = pos => {
    const crds = pos.coords;

    ENV_DEV &&
      console.log(
        `You are at lat: ${crds.latitude} lon: ${crds.longitude} plus or minus ${crds.accuracy} meters`,
      );

    this.setState({ coordinates: crds });
  };

  onFailure = () => {
    ENV_DEV && console.log("You blocked geolocation for this website");
    this.setState({ isGeolocationBlocked: true });
  };

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onFailure);
    } else {
      ENV_DEV && console.error("Geolocation is not supported by your browser");
      this.setState({ isGeolocationSupported: false });
    }
  };

  componentDidMount() {
    this.getGeoLocation();
  }

  render() {
    const {
      isGeolocationSupported,
      isGeolocationBlocked,
      coordinates,
    } = this.state;

    return (
      <>
        <Navbar />
        <MainContent
          showGeolocationInfoBanner={
            isGeolocationSupported && !isGeolocationBlocked && !coordinates
          }
        />
        <Footer />
      </>
    );
  }
}

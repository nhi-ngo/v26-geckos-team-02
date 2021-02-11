import React, { Component } from "react";
import GeolocationInfoBanner from "./GeolocationInfoBanner/GeolocationInfoBanner";
import InteractiveMap from "./InteractiveMap/InteractiveMap";
import LogoImg from "../../images/logo_transparent_150.png";

const ENV_DEV = process.env.NODE_ENV === "development";
export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    this.setState({
      coordinates: crds,
    });
  };

  onFailure = () => {
    ENV_DEV && console.log("You blocked geolocation for this website");
    this.setState({
      isGeolocationBlocked: true,
    });
  };

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onFailure);
    } else {
      ENV_DEV && console.error("Geolocation is not supported by your browser");
      this.setState({
        isGeolocationSupported: false,
      });
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
      <div>
        <div className="title-container">
          <h1 className="light-green no-margin">
            Knowledge = safety, Safety = power.{" "}
          </h1>
          <h1 className="light-green no-margin">
            {" "}
            Be in a <i>State of Safety</i>
          </h1>
        </div>
        <div className="banner-container">
          <img src={LogoImg} alt="logo-2"></img>
          <p>
            gives you access to crime data in your state. Use the interactive
            graph below to search for crime data where you live
          </p>
        </div>
        {isGeolocationSupported && !isGeolocationBlocked && !coordinates && (
          <GeolocationInfoBanner />
        )}
        <InteractiveMap fullWidth={true} />
      </div>
    );
  }
}

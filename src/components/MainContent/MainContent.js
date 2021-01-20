import React, { Component } from "react";
import GeolocationInfoBanner from "./GeolocationInfoBanner/GeolocationInfoBanner";
import InteractiveMap from "./InteractiveMap/InteractiveMap";

const ENV_DEV = process.env.NODE_ENV === "development";
export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGeolocationBlocked: false,
      isGeolocationSupported: true,
      showFullWidthMap: true,
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

    const { showFullWidthMap } = this.state;

    return (
      <div>
        <h1>Title/Heading: Be Safe Where You Are!</h1>

        {isGeolocationSupported && !isGeolocationBlocked && !coordinates && (
          <GeolocationInfoBanner />
        )}

        <InteractiveMap fullWidth={showFullWidthMap} />
      </div>
    );
  }
}

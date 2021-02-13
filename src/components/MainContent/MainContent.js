import React, { Component } from "react";
import GeolocationInfoBanner from "./GeolocationInfoBanner/GeolocationInfoBanner";
import InteractiveMap from "./InteractiveMap/InteractiveMap";
import LogoImg from "../../images/logo_transparent_150.png";
export default class MainContent extends Component {
  render() {
    const {
      geolocationSupported,
      geolocationBlocked,
      userCoordinates,
    } = this.props;

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
        {geolocationSupported && !geolocationBlocked && !userCoordinates && (
          <GeolocationInfoBanner />
        )}
        <InteractiveMap fullWidth={true} />
      </div>
    );
  }
}

import React, { Component } from "react";
import GeolocationDisclaimer from "./GeolocationDisclaimer/GeolocationDisclaimer";
import DataSearchForm from "./DataSearchForm/DataSearchForm";
import InteractiveMap from "./InteractiveMap/InteractiveMap";
import DataGraph from "./DataGraph/DataGraph";

export default class MainContent extends Component {
  constructor() {
    super();
    this.state = {
      showGeolocationDisclaimer: true,
      showDataSearchForm: false,
      showFullWidthMap: true,
    };
  }

  render() {
    const {
      showGeolocationDisclaimer,
      showDataSearchForm,
      showFullWidthMap,
    } = this.state;

    return (
      <div>
        <h1>Be Save Where You Are!</h1>

        {showGeolocationDisclaimer && <GeolocationDisclaimer />}
        {showDataSearchForm && <DataSearchForm />}
        <InteractiveMap fullWidth={showFullWidthMap} />

        <DataGraph />
      </div>
    );
  }
}

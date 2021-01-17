import React, { Component } from "react";
import GeolocationInfoBanner from "./GeolocationInfoBanner/GeolocationInfoBanner";
import DataSearchForm from "./DataSearchForm/DataSearchForm";
import InteractiveMap from "./InteractiveMap/InteractiveMap";
import DataGraph from "./DataGraph/DataGraph";

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGeolocationInfoBanner: true,
      showDataSearchForm: false,
      showFullWidthMap: true,
    };
  }

  render() {
    const { showDataSearchForm, showFullWidthMap } = this.state;

    const { showGeolocationInfoBanner } = this.props;

    return (
      <div>
        <h1>Be Save Where You Are!</h1>

        {showGeolocationInfoBanner && <GeolocationInfoBanner />}
        {showDataSearchForm && <DataSearchForm />}
        <InteractiveMap fullWidth={showFullWidthMap} />

        <DataGraph />
      </div>
    );
  }
}

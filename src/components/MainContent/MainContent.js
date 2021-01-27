import React, { Component } from "react";
import GeolocationInfoBanner from "./GeolocationInfoBanner/GeolocationInfoBanner";
import DataSearchForm from "./DataSearchForm/DataSearchForm";
import InteractiveMap from "./InteractiveMap/InteractiveMap";
import DataGraph from "./DataGraph/DataGraph";
import DateDropDown from "./DateDropdown";

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGeolocationInfoBanner: true,
      showDataSearchForm: false,
      showFullWidthMap: true,
      fromYear: 1993,
      toYear: 2000,
    };
    this.updateToYear = this.updateToYear.bind(this)
    this.updateFromYear = this.updateFromYear.bind(this)
  }
  updateToYear(toYear){
    console.log(toYear)
    this.setState({ toYear : toYear })
  }
  updateFromYear(fromYear){
    this.setState({ fromYear : fromYear })
  }
  render() {
    const { showDataSearchForm, showFullWidthMap } = this.state;

    const { showGeolocationInfoBanner } = this.props;

    return (
      <div>
        <h1>Be Save Where You Are!</h1>

        {showGeolocationInfoBanner && <GeolocationInfoBanner />}
        <DateDropDown updateToYear={this.updateToYear} updateFromYear={this.updateFromYear} fromYear={this.state.fromYear} toYear={this.state.toYear}/>
        {showDataSearchForm && <DataSearchForm />}
        <InteractiveMap fullWidth={showFullWidthMap} />

        <DataGraph />
      </div>
    );
  }
}

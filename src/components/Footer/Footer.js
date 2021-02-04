import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <h2>Data Disclaimer</h2>
        <p>
          Please note that information provided on this website is based on the
          data from&nbsp;
          <a href="https://crime-data-explorer.fr.cloud.gov/api">
            https://crime-data-explorer.fr.cloud.gov/api
          </a>
          . We do not own the data. CrimeApp (or the name of the app here) does
          not accept any responsibility or liability for the accuracy, content,
          completeness, or reliability of the information contained on the
          website.
        </p>
        <h2>Use of Location Disclaimer</h2>
        <p>
          CrimeApp(or the name of the app here) asks you to share your location
          only while the app is in use. Your location data will be used to
          determine the state name of your location, and display appropriate
          crime data in that state.
        </p>
      </div>
    );
  }
}

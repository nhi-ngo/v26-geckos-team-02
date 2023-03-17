import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";
import "./Footer.css";
export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Divider />
        <p>
          <span className="footer-heading">Data Disclaimer</span>: Please note
          that information provided on this website is based on the data from
          the&nbsp;
          <a
            className="footer-link"
            href="https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/docApi"
          >
            FBI Crime Data API
          </a>
          . We do not own the data. State of Safety does not accept any
          responsibility or liability for the accuracy, content, completeness,
          or reliability of the information contained on the website.
        </p>

        <p>
          <span className="footer-heading">Use of Location Disclaimer</span>:
          State of Safety asks you to share your location only while the app is
          in use. Your location data will be used to determine the state name of
          your location, and display appropriate crime data in that state.
        </p>

        <p style={{ textAlign: "center", paddingTop: "15px" }}>
          © 2021{" "}
          <a className="footer-link" href="https://chingu.io/" target="_blank">
            Chingu
          </a>{" "}
          <a
            className="footer-link"
            href="https://github.com/chingu-voyages/v26-geckos-team-02"
            target="_blank"
          >
            Geckos-Team-02
          </a>{" "}
          | Voyage 26
        </p>
      </div>
    );
  }
}

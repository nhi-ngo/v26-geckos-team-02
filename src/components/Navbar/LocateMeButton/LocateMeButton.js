import React from "react";
import { withRouter } from "react-router-dom";

function LocateMeButton(props) {
  const clickLocateMe = destinationState => {
    props.history.push(`/crime/state/${destinationState}`);
  };

  return (
    <div className="locate-me-container">
      <div
        className="locate-me-btn"
        onClick={() => clickLocateMe(props.userState)}
      >
        Locate Me
      </div>
    </div>
  );
}

export default withRouter(LocateMeButton);

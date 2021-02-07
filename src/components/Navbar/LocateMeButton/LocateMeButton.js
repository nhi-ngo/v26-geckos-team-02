import React from "react";
import Button from "@material-ui/core/Button";

export default function LocateMeButton() {
  return (
    <div className="locate-me-container">
      <div
        className="locate-me-btn"
        onClick={() => clickLocateMe()}
      >
        Locate Me
      </div>
    </div>
  );
}

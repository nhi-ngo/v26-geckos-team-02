import React from "react";
import Button from "@material-ui/core/Button";

export default function LocateMeButton() {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => clickLocateMe()}
      >
        Locate Me
      </Button>
    </div>
  );
}

import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

export default function GeolocationDisclaimer() {
  return (
    <div>
      <Alert severity="info">
        <AlertTitle>
          <strong>Geolocation permission</strong>
        </AlertTitle>
        Please click 'Allow' in the browser dialog above for a more personalized
        experience!
      </Alert>
    </div>
  );
}

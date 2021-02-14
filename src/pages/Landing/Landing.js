import React from "react";
import MainContent from "../../components/MainContent/MainContent";

export default function Landing({
  userCoordinates,
  geolocationSupported,
  geolocationBlocked,
}) {
  return (
    <div>
      <MainContent
        geolocationSupported={geolocationSupported}
        geolocationBlocked={geolocationBlocked}
        userCoordinates={userCoordinates}
      />
    </div>
  );
}

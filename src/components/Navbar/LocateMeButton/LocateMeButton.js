import React from "react";
import Button from '@material-ui/core/Button';

export default function LocateMeButton() {
  // const fetchLocationName = async (lat,lng) => {
  // };

  function onSuccess(pos) {
    console.log("you running..")
    let crd = pos.coords;
    console.log(`More or less ${crd.accuracy} meters.`);
    let lat = crd.latitude.toString(); 
    let lng = crd.longitude.toString(); 
    //var coordinates = [lat, lng]; 
    console.log('Your current position is:');
    console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
    //fetchLocationName(lat, lng);

  }
  
  function onError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert("Geolocation is not supported by your browser.")
  }

  const clickLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
  }


  return <div>
    <Button variant="contained" color="primary" onClick={() => clickLocateMe()}>
      Locate Me
    </Button>
  </div>;
}

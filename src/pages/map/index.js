import React from "react";
import GoogleMapReact from 'google-map-react';
import { WithAuth } from "@/hooks";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SimpleMap = () =>{
  const defaultProps = {
    center: {
      lat: -9.648139,
      lng: -35.717239
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default WithAuth(SimpleMap)
import { useState } from "react";

import dynamic from "next/dynamic";
const LocationPicker = dynamic(() => import("react-location-picker"), {
  ssr: false,
});

const MapPicker = ({ onLocationChanged, defaultPosition }) => {
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });

  const handleLocationChange = ({ address, position }) => {
    // Set new location
    setPosition(position);
    if (onLocationChanged) onLocationChanged(address, position);
  };

  return (
      <div className="mapBox">
        <LocationPicker
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "500px" }} />}
          defaultPosition={defaultPosition}
          onChange={handleLocationChange}
          zoom={18}
          radius={5}
        />
      </div>
  );
};

export default MapPicker;

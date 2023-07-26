import React, { useEffect, useRef, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

function CustomMap({ google, locations = [], handleSelectChange }) {
  // initial location
  const [initialLocation, setinitialLocation] = useState({
    lat: -33.870453,
    lng: 151.208755,
  });

  useEffect(() => {
    console.log("LOCATIONS ===", locations)
    if(locations?.length > 0){
      setinitialLocation({
        lat: locations[0]?.lat,
        lng: locations[0]?.lng
      })
    }
  },[])

  // handle drag end
  const onDragEnd = (mapProps, map) => {
    const centerLat = map.center.lat();
    const centerLng = map.center.lng();

    if (handleSelectChange) {
      handleSelectChange(`${centerLat}-${centerLng}`, "location");
    }
  };

  // on zoom change
  const onZoomChangeHandle = () => {};

  return (
    <div className="GooglemapcompStyles">
      <div className="Googlemapbox">
        <Map
          google={google}
          center={locations[0]}
          initialCenter={initialLocation}
          zoom={locations.length === 1 ? 18 : 12}
          onDragend={onDragEnd}
          onZoomChanged={onZoomChangeHandle}
        >
          {locations.map((coords, index) => {
            if (coords.lat && coords.lng) {
              return (
                <Marker key={index} position={coords} label={coords.name} />
              );
            }
          })}
        </Map>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBW5EjxWCEnwVNN2DZThoVMB8KZMl0zZM4",
})(CustomMap);

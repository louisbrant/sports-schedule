import { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

const MapSearchAddress = ({ getAddressLatLng, fromFacility, facAddress, isAddFacility }) => {
  const [gmapsLoaded, setGmapsLoaded] = useState(false)
  const [address, setAddress] = useState("");

  useEffect(() => {
    window.initMap = () => setGmapsLoaded(true)
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBW5EjxWCEnwVNN2DZThoVMB8KZMl0zZM4&libraries=places&callback=initMap`
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)

    if(facAddress !== undefined && facAddress !== null && facAddress !== ''){
      console.log("FACILITY ADDRESS ======",facAddress)
      setAddress(facAddress);
      geocodeByAddress(facAddress)
      .then((results) => getAddressLatLng(results[0]))
      .catch((error) => console.error("Error", error));
    }
  }, [])

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    setAddress(address)
    geocodeByAddress(address)
      .then((results) => getAddressLatLng(results[0]))
      .catch((error) => console.error("Error", error));
  };

  return (
    <>
      {
        gmapsLoaded &&
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading, value }) => (
            <div className="location-group" style={{backgroundColor: '#fff'}}>
              { fromFacility && <div className={isAddFacility===false ? `search`: null}>
                {isAddFacility===false && <i className="fa fa-search "></i>}
              </div>}
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: fromFacility ? "form-control ipt1" : "form-control ipt",
                })}
                value={address}
              />
              <div className={ suggestions.length > 0 && "autocomplete-dropdown-container"}>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? "suggestion-item suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
              
                  return (
                    <div className={className} key={`place_${index}`} {...getSuggestionItemProps(suggestion, { className, })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      }
    </>
  );
};

export default MapSearchAddress;

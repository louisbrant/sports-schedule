
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet-defaulticon-compatibility";

const MY_ACCESS_TOKEN = "pk.eyJ1Ijoic2hlcmllZmFiZGVsbWFnZWVkIiwiYSI6ImNra3F3anRtdzBud28ybnFuOWcxcDV5YWoifQ.PulU0IaBqGdKkQd-cngnPw"
const MapLocation = ({ places = [] }) => {
  return (<MapContainer
    center={places && places.length ? places[0].position : [-33.865143, 151.209900]}
    zoom={14}
    scrollWheelZoom={false}
    style={{ height: "100%", width: "100%", display: "block", backgroundColor: "black" }}
  >
    <TileLayer
      url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MY_ACCESS_TOKEN}`}
      //attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      attribution=''
    />

    {places && places.map((place, index) => <Marker key={index} position={place ? place.position : []} draggable={false} animate={true}>
      <Popup>{place ? place.title : ""}</Popup>
    </Marker>)}

  </MapContainer>);
}

export default MapLocation
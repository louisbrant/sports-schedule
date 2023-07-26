import GMap from "../../components/map/g-map"


const Test = () => {
    // list of icons
    const iconList = {
        icon2:
            "https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png",
        icon4:
            "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png",
    };
    const markerList = [
        { lat: 59.2967322, lng: 18.0009393, icon: iconList.icon4 },
        { lat: 59.2980245, lng: 17.9971503, icon: iconList.icon2 },
        { lat: 59.2981078, lng: 17.9980875, icon: iconList.icon4 },
        { lat: 59.2987638, lng: 17.9917639, icon: iconList.icon2 },
    ];
    return <GMap markerList={markerList}></GMap>
}

export default Test
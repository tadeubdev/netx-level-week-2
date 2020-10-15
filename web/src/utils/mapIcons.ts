import Leaflet from "leaflet";
import mapMarkerPng from "../images/map-marker.svg";

export default Leaflet.icon({
    iconUrl: mapMarkerPng,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});
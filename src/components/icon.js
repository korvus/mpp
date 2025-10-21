import markerBasique from "../img/markerBasique.png";
import pain from "../img/pain.png";
import painOff from "../img/painOff.png";

import markerShadow from "../img/markerShadow.png";
import roundShadow from "../img/roundShadow.png";

import L from 'leaflet';

export const IconBread = new L.Icon({
    iconUrl: pain,
    iconRetinaUrl: pain,
    shadowUrl: roundShadow,
    shadowSize: [50, 41],
    shadowAnchor: [28, 32],
    popupAnchor: [-13, -41],
    iconSize: new L.Point(25, 41),
    iconAnchor: [25, 41],
    className: 'leaflet-div-icon'
});

export const IconBreadOff = new L.Icon({
    iconUrl: painOff,
    iconRetinaUrl: painOff,
    shadowUrl: roundShadow,
    shadowSize: [50, 41],
    shadowAnchor: [28, 32],
    popupAnchor: [-13, -41],
    iconSize: new L.Point(25, 41),
    iconAnchor: [25, 41],
    className: 'leaflet-div-icon'
})

export const IconDefault = new L.Icon({
    iconUrl: markerBasique,
    iconRetinaUrl: markerBasique,
    shadowUrl: markerShadow,
    shadowSize: [50, 41],
    shadowAnchor: [25, 41],
    popupAnchor: [-13, -41],
    iconSize: new L.Point(25, 41),
    iconAnchor: [25, 41],
    className: 'leaflet-div-icon'
});

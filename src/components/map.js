import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet';
import React, { Fragment, useContext, useEffect } from 'react';
import coords from '../datas/datas.json';
import { IconBread, IconBreadOff } from '../components/icon.js';
import { PinContext } from '../store';
import Modalcontent from './modal.js';
import Warningcontent from './warning.js';

const listDate = Object.keys(coords);

const Paris = [48.853381, 2.348367];

function transformForGgl(chaine) {
    chaine.replace(' ', '+');
    chaine = `${chaine}+paris`;
    return chaine;
}

function loopOnAllMarkers(boulangeries) {
    for (const [index, value] of listDate.entries()) {
        for (let a = 0; a < coords[listDate[index]].length; a++) {
            let idCoords = JSON.stringify(coords[listDate[index]][a].coords);
            let titre = value === "Autre" ? "" : `${value}`;
            if (!boulangeries.hasOwnProperty(idCoords)) {
                boulangeries[idCoords] = { "popup": [titre], "icon": listDate[index], "rank": a, "name": coords[listDate[index]][a].name, "adresse": coords[listDate[index]][a].adresse, "coords": coords[listDate[index]][a].coords }
            } else {
                boulangeries[idCoords].popup.push(titre);
                if (a < boulangeries[idCoords].rank) {
                    boulangeries[idCoords].rank = a;
                }
            }
        }
    }
    return boulangeries;
}

function loopForOneMarker(boulangeries, clee) {
    for (const [index, value] of listDate.entries()) {
        for (let a = 0; a < coords[listDate[index]].length; a++) {
            let icon = value === clee ? "active" : "default";
            let idCoords = JSON.stringify(coords[listDate[index]][a].coords);
            let titre = value === "Autre" ? "" : `${value}`;
            // console.log(coords[listDate[index]][0].pic);
            if (!boulangeries.hasOwnProperty(idCoords)) {
                boulangeries[idCoords] = {
                    "popup": [titre],
                    "icon": icon,
                    "rank": a,
                    "name": coords[listDate[index]][a].name,
                    "adresse": coords[listDate[index]][a].adresse,
                    "coords": coords[listDate[index]][a].coords
                }
            } else {
                boulangeries[idCoords].popup.push(titre);
                if (a < boulangeries[idCoords].rank) {
                    boulangeries[idCoords].rank = a;
                }
            }
        }
    }
    return boulangeries;
}

function constructJsx(boulangeries, map) {
    const jsxElements = [];
    let i = 0;
    let shouldBeOneAtLeast = 0;
    for (var boulangerie in boulangeries) {

        const trophies = [];
        for (const [index, value] of boulangeries[boulangerie].popup.entries()) {
            trophies.push(<span key={index}>{value}</span>);
        }

        const forUrl = transformForGgl(boulangeries[boulangerie].adresse);

        if (boulangeries.hasOwnProperty(boulangerie)) {
            let icone = boulangeries[boulangerie].icon === "default" ? IconBreadOff : IconBread;
            let zindex = boulangeries[boulangerie].icon === "default" ? 0 : 10;

            if (map.getBounds().contains(boulangeries[boulangerie].coords)) { shouldBeOneAtLeast++ };

            jsxElements.push(
                <Marker
                    key={i}
                    zIndexOffset={zindex}
                    position={boulangeries[boulangerie].coords}
                    icon={icone}
                >
                    <Popup>
                        <strong>{boulangeries[boulangerie].name}</strong>
                        <address>
                            <a
                                rel="noreferrer"
                                target="_blank"
                                href={`https://www.google.fr/maps/place/${forUrl}`}>
                                {boulangeries[boulangerie].adresse}
                            </a>
                        </address>
                    </Popup>
                </Marker>
            )
        }
        i++;
    }
    return [jsxElements, shouldBeOneAtLeast]
}

function Meta(props) {
    let facts = "http://instagram.com/lepaindemonquartier/";
    if (props.tmphover !== 0) {
        // facts = coords[listDate]["insta"];
        facts = "https://instagram.com" + coords[props.tmphover][0].insta;
    } else {
        // facts = coords[props.active]["insta"];
        if (props.active !== 0) {
            facts = "https://instagram.com" + coords[props.active][0].insta;
        }
    }

    return <span className="meta"><a href={facts} target="blank">{facts}</a></span>
}

function ListMarkers(props) {

    const map = useMap();
    const setWarn = props.warning;

    let boulangeries = {};

    // Si on survole
    if (props.hover !== 0) {
        boulangeries = loopForOneMarker(boulangeries, props.hover);
    } else {
        if (props.list === 0) {
            boulangeries = loopOnAllMarkers(boulangeries);
        } else {
            boulangeries = loopForOneMarker(boulangeries, props.list);
        }
    }

    let arrBoulangeries = constructJsx(boulangeries, map);

    useEffect(() => {
        if (arrBoulangeries[1] === 0) {
            setWarn(true);
        } else {
            setWarn(false);
        }
    });

    useMapEvent('drag', () => {
        let arrBoulangeries = constructJsx(boulangeries, map);
        if (arrBoulangeries[1] === 0) {
            props.warning(true);
        } else {
            props.warning(false);
        }
    })

    useMapEvent('zoomend', () => {
        let arrBoulangeries = constructJsx(boulangeries, map);
        if (arrBoulangeries[1] === 0) {
            props.warning(true);
        } else {
            props.warning(false);
        }
    })

    return (
        <Fragment>
            {arrBoulangeries[0]}
        </Fragment>
    )
}

const Map = () => {
    const { pins, tmppins, dm, setDm, warning, setWarning } = useContext(PinContext);

    function escFunction(event) {
        if (event.keyCode === 27) {
            if (dm) {
                setDm(false);
                setWarning(false);
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
    });

    return (
        <div className="App">
            {dm === true &&
                <div className={"modal"}>
                    <Modalcontent />
                </div>
            }
            {warning === true &&
                <div className={"warning"}>
                    <Warningcontent />
                </div>
            }

            <Meta active={pins} tmphover={tmppins} />

            <MapContainer
                center={Paris}
                zoom={13}
                scrollWheelZoom={false}
                tap={false}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ListMarkers list={pins} hover={tmppins} warning={setWarning} />
            </MapContainer>
        </div>
    )
}

export default Map;


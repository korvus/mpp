import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from "react-leaflet";
import React, { Fragment, useContext, useEffect } from "react";
import coords from "../datas/datas.json";
import { slugify, translateCategoryLabel, translateComment, formatRecommendedFor } from "../utils/i18n";
import {
    IconDefault,
    IconPavlova,
    IconViennoiserie,
    IconTartes,
    IconStHonore,
    IconParisBrest,
    IconMedovic,
    IconMacaron,
    IconGalette,
    IconEclairs,
    IconCookies,
    IconChurros,
    IconChoux,
    IconKouignaman,
    IconChausson,
    IconMontBlanc,
    IconMadeleine,
    IconPainChocolat,
    IconCinnamon,
    IconBrioche,
    IconBabka,
    IconCheesecake,
    IconMerveilleux,
    IconOriental,
    IconFlan,
    IconMillefeuilles,
    IconGlace,
    IconAutres
} from "./icon.jsx";
import { PinContext } from "../store.jsx";
import Modalcontent from "./modal.jsx";
import Warningcontent from "./warning.jsx";

const ICON_COMPONENTS = {
    pavlova: IconPavlova,
    macarons: IconMacaron,
    tartes: IconTartes,
    viennoiseries: IconViennoiserie,
    "saint-honore": IconStHonore,
    "paris-brest": IconParisBrest,
    medovik: IconMedovic,
    "cinnamon-roll": IconCinnamon,
    madeleine: IconMadeleine,
    "pain-au-chocolat": IconPainChocolat,
    eclairs: IconEclairs,
    "galettes-des-rois": IconGalette,
    cookies: IconCookies,
    "kouign-amann": IconKouignaman,
    "mont-blanc": IconMontBlanc,
    "chausson-aux-pommes": IconChausson,
    cheesecake: IconCheesecake,
    churros: IconChurros,
    "choux-a-la-creme": IconChoux,
    brioche: IconBrioche,
    babka: IconBabka,
    merveilleux: IconMerveilleux,
    oriental: IconOriental,
    flan: IconFlan,
    "mille-feuilles": IconMillefeuilles,
    glace: IconGlace,
    autre: IconAutres
};

const listDate = Object.keys(coords);
const Paris = [48.853381, 2.348367];

function transformForGgl(chaine) {
  chaine.replace(" ", "+");
  chaine = `${chaine}+paris`;
  return chaine;
}

function loopOnAllMarkers(boulangeries) {
    for (const [index, value] of listDate.entries()) {
        for (let a = 0; a < coords[listDate[index]].length; a++) {
            const data = coords[listDate[index]][a];
            const idCoords = JSON.stringify(data.coords);
            const comment = data.comments;
            if (!Object.prototype.hasOwnProperty.call(boulangeries, idCoords)) {
                boulangeries[idCoords] = {
                    categories: value === "Autre" ? [] : [value],
                    icon: listDate[index],
                    rank: a,
                    name: data.name,
                    adresse: data.adresse,
                    coords: data.coords,
                    comments: comment ? [comment] : []
                };
            } else {
                if (value !== "Autre" && !boulangeries[idCoords].categories.includes(value)) {
                    boulangeries[idCoords].categories.push(value);
                }
                if (comment && !boulangeries[idCoords].comments.includes(comment)) {
                    boulangeries[idCoords].comments.push(comment);
                }
                if (a < boulangeries[idCoords].rank) {
                    boulangeries[idCoords].rank = a;
                }
            }
        }
    }
    return boulangeries;
}

function loopForOneMarker(boulangeries, year) {
    for (let a = 0; a < coords[year].length; a++) {
        const data = coords[year][a];
        const idCoords = JSON.stringify(data.coords);
        const comment = data.comments;
        if (!Object.prototype.hasOwnProperty.call(boulangeries, idCoords)) {
            boulangeries[idCoords] = {
                categories: year === "Autre" ? [] : [year],
                icon: year,
                rank: a,
                name: data.name,
                adresse: data.adresse,
                coords: data.coords,
                comments: comment ? [comment] : []
            };
        } else {
            if (year !== "Autre" && !boulangeries[idCoords].categories.includes(year)) {
                boulangeries[idCoords].categories.push(year);
            }
            if (comment && !boulangeries[idCoords].comments.includes(comment)) {
                boulangeries[idCoords].comments.push(comment);
            }
            if (a < boulangeries[idCoords].rank) {
                boulangeries[idCoords].rank = a;
            }
        }
    }
    return boulangeries;
}

function constructJsx(boulangeries, map, language) {
    const jsxElements = [];
    let i = 0;
    let shouldBeOneAtLeast = 0;

    for (const boulangerie in boulangeries) {
        if (!Object.prototype.hasOwnProperty.call(boulangeries, boulangerie)) {
            continue;
        }

        const data = boulangeries[boulangerie];
        const categories = data.categories || [];
        const comments = data.comments || [];
        const recommendedLabel = formatRecommendedFor(language);

        const trophies = categories.map((category, index) => (
            <span key={`category-${index}`}>
                {`${recommendedLabel} ${translateCategoryLabel(category, language)}`}
            </span>
        ));

        const commentLines = comments.map((comment, index) => (
            <em className="popup-comment" key={`comment-${index}`}>
                {translateComment(comment, language)}
            </em>
        ));

        const forUrl = transformForGgl(data.adresse);
        const iconSlug = slugify(data.icon);
        const icone = ICON_COMPONENTS[iconSlug] || IconDefault;

        if (map.getBounds().contains(data.coords)) {
            shouldBeOneAtLeast++;
        }

        jsxElements.push(
            <Marker
                key={i}
                position={data.coords}
                icon={icone}
            >
                <Popup>
                    {trophies}
                    <strong>{data.name}</strong>
                    {commentLines}
                    <address>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://www.google.fr/maps/place/${forUrl}`}>
                            {data.adresse}
                        </a>
                    </address>
                </Popup>
            </Marker>
        );
        i++;
    }

    return [jsxElements, shouldBeOneAtLeast];
}

function ListMarkers(props) {

    const map = useMap();
    const { userLanguage } = useContext(PinContext);
    const setWarn = props.warning;

    let boulangeries = {};
    if(props.list === 0){
        boulangeries = loopOnAllMarkers(boulangeries);
    } else {
        boulangeries = loopForOneMarker(boulangeries, props.list);
    }
  
    let arrBoulangeries = constructJsx(boulangeries, map, userLanguage);
  
    useEffect(() => {
        if(arrBoulangeries[1] === 0){
            setWarn(true);
        } else {
            setWarn(false);
        }
    });

    useMapEvent('drag', () => {
        let arrBoulangeries = constructJsx(boulangeries, map, userLanguage);
        if(arrBoulangeries[1] === 0){
            props.warning(true);
        } else {
            props.warning(false);
        }
    })

    useMapEvent('zoomend', () => {
        let arrBoulangeries = constructJsx(boulangeries, map, userLanguage);
        if(arrBoulangeries[1] === 0){
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
    const {pins, dm, setDm, warning, setWarning} = useContext(PinContext);

    function escFunction(event){
        if(event.keyCode === 27) {
            if(dm){
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
        }`n        <MapContainer
            center={Paris}
            zoom={13}
            scrollWheelZoom={false}
            tap={false}
        > 
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ListMarkers list={pins} warning={setWarning} />
        </MapContainer>
    </div>
    )
}

export default Map;





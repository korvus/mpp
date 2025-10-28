import React, { Fragment, useContext } from "react";
import boulangeries from "../datas/datas.json";
import { PinContext, Text } from "../store";
import { slugify, translateCategoryLabel } from "../utils/i18n";

import Pavlova from "../img/pavlova.png";
import markerBasique from "../img/markerBasique.png";
import viennoiserie from "../img/croissant.png";
import babka from "../img/babka.png";
import brioche from "../img/brioche.png";
import choux from "../img/choux.png";
import churros from "../img/churros.png";
import cookies from "../img/cookies.png";
import eclairs from "../img/eclairs.png";
import kouignaman from "../img/kouignaman.png";
import chausson from "../img/chausson.png";
import madeleine from "../img/madeleine.png";
import painChocolat from "../img/painChocolat.png";
import cheesecake from "../img/cheesecake.png";
import montblanc from "../img/montblanc.png";
import galette from "../img/galette.png";
import macaron from "../img/macaron.png";
import medovic from "../img/medovic.png";
import cinnamon from "../img/cinnamon.png";
import parisBrest from "../img/parisBrest.png";
import stHonore from "../img/st-honore.png";
import tartes from "../img/tartes.png";
import merveilleux from "../img/merveilleux.png";
import oriental from "../img/oriental.png";
import flan from "../img/flan.png";
import millefeuilles from "../img/millefeuilles.png";
import glace from "../img/glace.png";
import autres from "../img/autres.png";

const CATEGORY_ICONS = {
  pavlova: Pavlova,
  macarons: macaron,
  tartes,
  viennoiseries: viennoiserie,
  "saint-honore": stHonore,
  "paris-brest": parisBrest,
  medovik: medovic,
  "cinnamon-roll": cinnamon,
  madeleine,
  "pain-au-chocolat": painChocolat,
  eclairs,
  "galettes-des-rois": galette,
  cookies,
  "kouign-amann": kouignaman,
  "mont-blanc": montblanc,
  "chausson-aux-pommes": chausson,
  cheesecake,
  churros,
  "choux-a-la-creme": choux,
  brioche,
  babka,
  merveilleux,
  oriental,
  flan,
  "mille-feuilles": millefeuilles,
  glace,
  autre: autres
};

const listDate = Object.keys(boulangeries);

const ListByYears = (props) => {
  const [pins, setPins] = props.actions;
  const { userLanguage, dictionary } = useContext(PinContext);
  const countTooltip = dictionary?.countTooltip ?? "Nombre de pâtisseries référencées";

  const years = [];
  for (const [index, value] of listDate.entries()) {
    const slug = slugify(value);
    const categoryLabel = translateCategoryLabel(value, userLanguage);

    const iconSource = CATEGORY_ICONS[slug];
    let pic = (
      <img
        alt={categoryLabel}
        src={iconSource || markerBasique}
        title={categoryLabel}
      />
    );

    if (!iconSource && value === "Autre") {
      pic = (
        <span className="category-text" title={categoryLabel}>
          <Text tid="autre" />
        </span>
      );
    }

    years.push(
      <li
        className={pins === value ? "active" : ""}
        key={slug || index}
        title={categoryLabel}
        onClick={() => setPins(value)}
      >
        {pic}
        <sup className="small" title={countTooltip}>
          {boulangeries[listDate[index]].length}
        </sup>
      </li>
    );
  }
  return <Fragment>{years}</Fragment>;
};

const Col = () => {
  const { pins, setPins, dm, setDm, dictionary } = useContext(PinContext);
  const navLabel = dictionary?.sidebarLabel || "Pastry filters";
  const helpTooltip = dictionary?.helpTooltip || "Learn more";

  return (
    <div className="pannel">
      <div className="pannel-header">
        <h1><Text tid="titre" /></h1>
        <button
          type="button"
          className="about-button"
          title={helpTooltip}
          aria-expanded={dm}
          aria-controls="about-modal"
          onClick={() => setDm(!dm)}
        >
          <span className="about-icon">?</span>
        </button>
      </div>
      <nav aria-label={navLabel}>
        <ul>
          <li className={pins === 0 ? "active" : ""} onClick={() => setPins(0)}><Text tid="tous" /></li>
          <ListByYears actions={[pins, setPins]} />
        </ul>
      </nav>
    </div>
  );
};

export default Col;





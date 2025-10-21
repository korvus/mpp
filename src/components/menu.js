import React, { Fragment, useContext } from 'react';
import boulangeries from '../datas/datas.json';
import { PinContext, Text } from '../store';
import { languageOptions } from '../datas/languages';

const listDate = Object.keys(boulangeries);

const LanguageSwitcher = () => {
  const { userLanguage, userLanguageChange } = useContext(PinContext);

  return (
    <div className="langues">
      {Object.entries(languageOptions).map(([id, label]) => (
        <button
          type="button"
          key={id}
          className={userLanguage === id ? 'active' : ''}
          onClick={() => userLanguageChange(id)}
          aria-pressed={userLanguage === id}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const ListByYears = (props) => {
  const tooltipLabel = props.tooltip || 'Nombre de boulangeries referencees dans le palmares';
  const [pins, setPins] = props.actions;
  const setTmppins = props.hover;

  const years = [];
  for (const [index, value] of listDate.entries()) {
    years.push(
      <li
        className={pins === value ? 'active' : ''}
        key={index}
        onPointerMove={() => setTmppins(value)}
        onPointerOut={() => setTmppins(0)}
        onClick={() => setPins(value)}
      >
        <sup
          className={'small'}
          title={tooltipLabel}
        >
          {boulangeries[listDate[index]].length}
        </sup>
        {value}
      </li>
    );
  }
  return <Fragment>{years}</Fragment>;
};

const Col = () => {
  const { pins, setPins, setTmppins, setDm, dm, dictionary } = useContext(PinContext);
  const learnMoreLabel = (dictionary && dictionary.learnMore) || 'En savoir plus';
  const countTooltip = (dictionary && dictionary.countTooltip) || 'Nombre de boulangeries referencees dans le palmares';

  return (
    <div className="pannel">
      <div className="language-switcher">
        <LanguageSwitcher />
      </div>
      <div className="pannel-header">
        <h1><Text tid="titre" /></h1>
        <button
          type="button"
          className="about-link"
          onClick={() => setDm(!dm)}
          title={learnMoreLabel}
          aria-label={learnMoreLabel}
        >
          ?
        </button>
      </div>
      <ul>
        <li className={pins === 0 ? 'active' : ''} onClick={() => setPins(0)}><Text tid="tous" /></li>
        <ListByYears actions={[pins, setPins]} hover={setTmppins} tooltip={countTooltip} />
      </ul>
    </div>
  );
};

export default Col;

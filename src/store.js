import React, { useState, createContext, useContext, useCallback } from "react";
import { languageOptions, dictionaryList } from './datas/languages.js';

export const PinContext = createContext(null);

export function getCurrentLanguage () {
  if (typeof window === 'undefined') {
    return 'fr';
  }
  let defaultLanguage = window.localStorage.getItem('mbp-lang');
  if (!defaultLanguage) {
    defaultLanguage = window.navigator.language.substring(0, 2);
  }
  if (defaultLanguage) {
    defaultLanguage = defaultLanguage.toLowerCase();
  }
  if (!languageOptions[defaultLanguage]) {
    defaultLanguage = 'fr';
  }
  return defaultLanguage;
}

export const PinContextProvider = props => {
    const [pins, setPins] = useState(0);
    const [tmppins, setTmppins] = useState(0);
    const [dm, setDm] = useState(true);
    const [warning, setWarning] = useState(false);
    const [userLanguage, setUserLanguage] = useState(getCurrentLanguage());

    const userLanguageChange = useCallback(selected => {
      const newLanguage = languageOptions[selected] ? selected : 'fr';
      setUserLanguage(newLanguage);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('mbp-lang', newLanguage);
      }
    }, [setUserLanguage]);

    const provider = {
      dm,
      setDm,
      setTmppins,
      tmppins,
      pins,
      setPins,
      warning,
      setWarning,
      userLanguage,
      dictionary: dictionaryList[userLanguage] || dictionaryList.fr,
      userLanguageChange
    };

    return (
      <PinContext.Provider value={provider}>
        {props.children}
      </PinContext.Provider>
    );
};

export function Text({ tid }) {
  const languageContext = useContext(PinContext);
  let str = languageContext.dictionary && languageContext.dictionary[tid] ? languageContext.dictionary[tid] : "";
  return str;
};

import React, { useState, createContext, useContext, useMemo } from "react";
import { languageOptions, dictionaryList } from "./datas/languages.js";

export const PinContext = createContext(null);

export function getCurrentLanguage() {
  let defaultLanguage = window.localStorage.getItem("mbp-lang");
  if (!defaultLanguage) {
    defaultLanguage = window.navigator.language.substring(0, 2);
  }
  return defaultLanguage;
}

export const PinContextProvider = ({ children }) => {
  const [pins, setPins] = useState(0);
  const [dm, setDm] = useState(true);
  const [warning, setWarning] = useState(false);
  const [userLanguage, setUserLanguage] = useState("fr");

  const providerValue = useMemo(
    () => ({
      dm,
      setDm,
      pins,
      setPins,
      warning,
      setWarning,
      userLanguage,
      dictionary: dictionaryList[userLanguage],
      userLanguageChange: (selected) => {
        const newLanguage = languageOptions[selected] ? selected : "fr";
        setUserLanguage(newLanguage);
        window.localStorage.setItem("mbp-lang", newLanguage);
      },
    }),
    [dm, pins, warning, userLanguage]
  );

  return (
    <PinContext.Provider value={providerValue}>
      {children}
    </PinContext.Provider>
  );
};

export function Text({ tid }) {
  const languageContext = useContext(PinContext);
  return languageContext.dictionary[tid] ? languageContext.dictionary[tid] : "";
}

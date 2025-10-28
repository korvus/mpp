import React, { useContext, useEffect } from "react";

import { languageOptions } from "../datas/languages";
import { PinContext, getCurrentLanguage } from "../store.jsx";

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange, dictionary } = useContext(PinContext);

  useEffect(() => {
    const defaultLanguage = getCurrentLanguage();
    if (defaultLanguage && defaultLanguage !== userLanguage) {
      userLanguageChange(defaultLanguage);
    }
  }, [userLanguage, userLanguageChange]);

  const groupLabel = dictionary?.languageGroupLabel || "Languages";

  return (
    <div className="langues" role="group" aria-label={groupLabel}>
      {Object.entries(languageOptions).map(([id, name]) => (
        <button
          type="button"
          key={id}
          className={userLanguage === id ? "active" : ""}
          aria-pressed={userLanguage === id}
          onClick={() => userLanguageChange(id)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

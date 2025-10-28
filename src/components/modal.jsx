import { useContext } from "react";
import LanguageSelector from "./languageSelector";
import { PinContext } from "../store.jsx";
import { formatWithTokens, yearsSince } from "../utils/i18n";

const Modalcontent = () => {
  const { setDm, dictionary } = useContext(PinContext);
  const years = Math.max(yearsSince("2020-01-01"), 0);
  const tokens = { YEARS: String(years) };

  const intro = formatWithTokens(dictionary?.goalContent, tokens);
  const source = formatWithTokens(dictionary?.contestwikipedia, tokens);
  const reminder = formatWithTokens(dictionary?.goalContentEnd, tokens);
  const capsule = formatWithTokens(dictionary?.capsuleDisclaimer, tokens);
  const contactIntro = dictionary?.writeMe || "Vous pouvez m'écrire directement à";
  const showMapLabel = dictionary?.showMap || "Afficher la carte";
  const promoTitle = dictionary?.promoTitle;
  const promoLinks = Array.isArray(dictionary?.promoLinks) ? dictionary.promoLinks : [];

  return (
    <div className="innerModal">
      <button
        type="button"
        title="Close"
        aria-label="Close"
        onClick={() => setDm(false)}
        className="close"
      ></button>
      <LanguageSelector />
      <h2 id="about-modal-title">{dictionary?.About || "About"}</h2>
      <p>{intro}</p>
      <p>{source}</p>
      <p>{reminder}</p>
      <p className="capsule-disclaimer">{capsule}</p>
      <h2>Contact</h2>
      <p>
        {contactIntro}&nbsp;
        <a href="mailto:ecrivez.moi@simonertel.net">ecrivez.moi@simonertel.net</a>.
      </p>
      <button type="button" className="modal-cta" onClick={() => setDm(false)}>
        {showMapLabel}
      </button>
      {promoLinks.length > 0 && (
        <section className="promo-section" aria-label={promoTitle || 'Additional resources'}>
          {promoTitle && <h3>{promoTitle}</h3>}
          <div className="promo-grid">
            {promoLinks.map((item, idx) => {
              const isExternal = typeof item.href === 'string' && item.href.startsWith('http');
              const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
              return (
                <a
                  className="promo-card"
                  key={idx}
                  href={item.href}
                  {...linkProps}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Modalcontent;



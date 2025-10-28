import { useContext, useEffect } from "react";
import { PinContext } from "../store.jsx";
import { formatWithTokens, yearsSince } from "../utils/i18n";

const DEFAULT_URL = typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL
  ? import.meta.env.VITE_SITE_URL
  : "https://patisseriesparis.200.work";

const ensureMeta = (selector, attribute, value) => {
  if (!value) {
    return;
  }
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    if (selector.startsWith("meta[name")) {
      const nameMatch = selector.match(/name="([^"]+)"/);
      if (nameMatch) {
        element.setAttribute("name", nameMatch[1]);
      }
    } else if (selector.startsWith("meta[property")) {
      const propertyMatch = selector.match(/property="([^"]+)"/);
      if (propertyMatch) {
        element.setAttribute("property", propertyMatch[1]);
      }
    }
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
};

const ensureLink = (selector, relValue) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", relValue);
    document.head.appendChild(element);
  }
  return element;
};

const ensureScript = (selector, typeValue) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("script");
    const idMatch = selector.match(/#([A-Za-z0-9_-]+)/);
    if (idMatch) {
      element.id = idMatch[1];
    }
    element.setAttribute("type", typeValue);
    document.head.appendChild(element);
  }
  return element;
};

const SeoManager = () => {
  const { userLanguage, dictionary } = useContext(PinContext);

  useEffect(() => {
    const lang = userLanguage || "fr";
    const years = Math.max(yearsSince("2020-01-01"), 0);
    const tokens = { YEARS: String(years) };

    const title = formatWithTokens(
      dictionary?.seoTitle || "Les bonnes pâtisseries de Paris",
      tokens
    );
    const description = formatWithTokens(
      dictionary?.seoDescription || "Carte interactive des meilleures pâtisseries de Paris.",
      tokens
    );
    const keywords = dictionary?.seoKeywords || "pâtisserie paris, desserts parisiens";
    const ogTitle = formatWithTokens(dictionary?.ogTitle || title, tokens);
    const ogDescription = formatWithTokens(dictionary?.ogDescription || description, tokens);
    const canonicalUrl = lang === "en" ? `${DEFAULT_URL}/?lang=en` : DEFAULT_URL;

    document.title = title;
    document.documentElement.setAttribute("lang", lang);

    ensureMeta('meta[name="description"]', "content", description);
    ensureMeta('meta[name="keywords"]', "content", keywords);
    ensureMeta('meta[property="og:title"]', "content", ogTitle);
    ensureMeta('meta[property="og:description"]', "content", ogDescription);
    ensureMeta('meta[property="og:url"]', "content", canonicalUrl);
    ensureMeta('meta[property="og:locale"]', "content", lang === "en" ? "en_GB" : "fr_FR");
    ensureMeta('meta[name="twitter:title"]', "content", ogTitle);
    ensureMeta('meta[name="twitter:description"]', "content", ogDescription);

    const canonicalLink = ensureLink('link[rel="canonical"]', "canonical");
    canonicalLink.setAttribute("href", canonicalUrl);

    const alternateFr = ensureLink('link[rel="alternate"][hreflang="fr"]', "alternate");
    alternateFr.setAttribute("href", DEFAULT_URL);
    alternateFr.setAttribute("hreflang", "fr");

    const alternateEn = ensureLink('link[rel="alternate"][hreflang="en"]', "alternate");
    alternateEn.setAttribute("href", `${DEFAULT_URL}/?lang=en`);
    alternateEn.setAttribute("hreflang", "en");

    const ldScript = ensureScript('script#structured-data', "application/ld+json");
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      url: canonicalUrl,
      description,
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      inLanguage: lang,
      creator: {
        "@type": "Person",
        name: "Simon Ertel",
        email: "ecrivez.moi@simonertel.net"
      },
      about: {
        "@type": "Place",
        name: "Paris",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Paris",
          addressCountry: "FR"
        }
      }
    };
    ldScript.textContent = JSON.stringify(structuredData, null, 2);
  }, [userLanguage, dictionary]);

  return null;
};

export default SeoManager;

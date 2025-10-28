import { categoryTranslations, commentTranslations } from "../datas/translations";

export const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .toLowerCase();

export const formatWithTokens = (template, tokens = {}) => {
  if (!template) {
    return "";
  }
  return Object.entries(tokens).reduce(
    (acc, [key, value]) => acc.split(`%${key}%`).join(value),
    template
  );
};

export const yearsSince = (dateLike) => {
  const now = new Date();
  const from = new Date(dateLike);
  if (Number.isNaN(from.getTime())) {
    return 0;
  }
  let years = now.getFullYear() - from.getFullYear();
  const hasNotPassedYet =
    now.getMonth() < from.getMonth() ||
    (now.getMonth() === from.getMonth() && now.getDate() < from.getDate());
  if (hasNotPassedYet) {
    years -= 1;
  }
  return years < 0 ? 0 : years;
};

export const translateCategoryLabel = (value, language = "fr") => {
  if (!value) {
    return "";
  }
  const slug = slugify(value);
  const table = categoryTranslations[language];
  if (table && table[slug]) {
    return table[slug];
  }
  const fallback = categoryTranslations.fr?.[slug];
  return fallback || value;
};

export const translateComment = (value, language = "fr") => {
  if (!value) {
    return "";
  }
  if (language === "fr") {
    return value;
  }
  const slug = slugify(value);
  const translation = commentTranslations[language]?.[slug];
  return translation || value;
};

export const formatRecommendedFor = (language = "fr") =>
  language === "en" ? "Recommended for:" : "Conseillé pour :";

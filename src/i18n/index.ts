import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import it from "./it";

const langs = {
  it: {
    translation: it,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    lng: "it",
    fallbackLng: "it",
    resources: {
      ...langs,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
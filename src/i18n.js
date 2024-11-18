import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en.json";
import deTranslation from "./locales/de.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    de: {
      translation: deTranslation,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

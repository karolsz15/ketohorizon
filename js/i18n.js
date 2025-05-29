import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';
import zhTranslations from './translations/zh.json';

i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      zh: { translation: zhTranslations }
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18next; 
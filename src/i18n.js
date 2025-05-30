import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        loading: 'Loading',
        error: 'Error',
        untitled: 'Untitled',
        noDescription: 'No description available'
      },
      articles: {
        hero: {
          title: 'Keto Diet Articles & Guides'
        },
        readMore: 'Read More',
        noArticles: 'No articles found'
      },
      home: {
        latestArticles: 'Latest Articles'
      }
    }
  },
  es: {
    translation: {
      home: {
        latestArticles: 'Últimos Artículos'
      },
      // ... other translations
    }
  },
  zh: {
    translation: {
      home: {
        latestArticles: '最新文章'
      },
      // ... other translations
    }
  },
  hi: {
    translation: {
      home: {
        latestArticles: 'नवीनतम लेख'
      },
      // ... other translations
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
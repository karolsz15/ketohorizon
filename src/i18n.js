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
      common: {
        loading: 'Cargando',
        error: 'Error',
        untitled: 'Sin título',
        noDescription: 'Sin descripción'
      },
      articles: {
        hero: {
          title: 'Artículos y Guías de Dieta Keto'
        },
        readMore: 'Leer Más',
        noArticles: 'No se encontraron artículos'
      },
      home: {
        latestArticles: 'Últimos Artículos'
      }
    }
  },
  zh: {
    translation: {
      common: {
        loading: '加载中',
        error: '错误',
        untitled: '无标题',
        noDescription: '暂无描述'
      },
      articles: {
        hero: {
          title: '生酮饮食文章和指南'
        },
        readMore: '阅读更多',
        noArticles: '未找到文章'
      },
      home: {
        latestArticles: '最新文章'
      }
    }
  },
  hi: {
    translation: {
      common: {
        loading: 'लोड हो रहा है',
        error: 'त्रुटि',
        untitled: 'शीर्षकहीन',
        noDescription: 'कोई विवरण उपलब्ध नहीं'
      },
      articles: {
        hero: {
          title: 'कीटो आहार लेख और गाइड'
        },
        readMore: 'और पढ़ें',
        noArticles: 'कोई लेख नहीं मिला'
      },
      home: {
        latestArticles: 'नवीनतम लेख'
      }
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
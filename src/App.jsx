import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticlePage from './components/articles/ArticlePage';
import Recipes from './pages/Recipes';
import Ebooks from './pages/Ebooks';

const App = () => {
  const { i18n } = useTranslation();

  // Get supported languages from i18n configuration
  const supportedLanguages = ['en', 'es', 'zh', 'hi'];
  
  // Redirect to user's language or default to English
  const getDefaultLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return supportedLanguages.includes(browserLang) ? browserLang : 'en';
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to default language */}
          <Route path="/" element={<Navigate to="/en" replace />} />
          
          <Route path="/:lang" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:id" element={<ArticlePage />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="ebooks" element={<Ebooks />} />
          </Route>

          {/* Redirect unknown paths to default language */}
          <Route path="*" element={<Navigate to="/en" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App; 
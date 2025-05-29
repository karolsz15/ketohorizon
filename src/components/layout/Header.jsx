import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLang) => {
    const currentPath = location.pathname;
    const newPath = currentPath.replace(`/${i18n.language}`, `/${newLang}`);
    i18n.changeLanguage(newLang);
    navigate(newPath);
  };

  // ... rest of the component
};

export default LanguageSwitcher; 
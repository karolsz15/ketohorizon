import React, { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  // Update language when route changes
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  // Update URL when language changes
  useEffect(() => {
    if (lang !== i18n.language) {
      const newPath = window.location.pathname.replace(`/${lang}`, `/${i18n.language}`);
      navigate(newPath, { replace: true });
    }
  }, [i18n.language, lang, navigate]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout; 
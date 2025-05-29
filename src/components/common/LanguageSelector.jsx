import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LanguageSelectorContainer = styled.div`
  position: relative;
`;

const CurrentLang = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const LangMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
  min-width: 150px;
  z-index: 1000;
`;

const LangOption = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  width: 100%;
  border: none;
  background: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #f5f5f5;
    color: ${props => props.theme.colors.primary};
  }
`;

const Flag = styled.span`
  font-size: 1.2em;
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <LanguageSelectorContainer className="language-selector">
      <CurrentLang onClick={() => setIsOpen(!isOpen)}>
        <Flag>{currentLang.flag}</Flag>
        <span>{currentLang.code.toUpperCase()}</span>
      </CurrentLang>
      <LangMenu isOpen={isOpen}>
        {languages.map(lang => (
          <LangOption
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <Flag>{lang.flag}</Flag>
            {lang.name}
          </LangOption>
        ))}
      </LangMenu>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector; 
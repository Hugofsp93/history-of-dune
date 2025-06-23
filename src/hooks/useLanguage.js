import { useState } from 'react';
import { getSavedLanguage } from '../locales';

export const useLanguage = () => {
  const [language, setLanguage] = useState(getSavedLanguage);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('dune-language', newLang);
  };

  return { language, changeLanguage };
}; 
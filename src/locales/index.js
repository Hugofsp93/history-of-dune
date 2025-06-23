export const languages = {
  pt: { 
    name: 'Português', 
    flag: '🇧🇷',
    dateFormat: 'dd/MM/yyyy',
    locale: 'pt-BR'
  },
  en: { 
    name: 'English', 
    flag: '🇺🇸',
    dateFormat: 'MM/dd/yyyy',
    locale: 'en-US'
  }
};

export const defaultLanguage = 'pt';

// Função para formatar datas baseada no idioma
export const formatDate = (dateString, language) => {
  const lang = languages[language];
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return dateString; // Retorna a string original se não for uma data válida
  }
  
  return date.toLocaleDateString(lang.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Função para obter o idioma salvo no localStorage
export const getSavedLanguage = () => {
  const saved = localStorage.getItem('dune-language');
  return saved && languages[saved] ? saved : defaultLanguage;
}; 
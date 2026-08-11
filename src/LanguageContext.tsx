import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Language, i18n } from './i18n';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof i18n.en;
}

const LANGUAGE_STORAGE_KEY = 'pocket-cosmos-language';

const isChineseLanguageTag = (tag: string) => tag.toLowerCase().startsWith('zh');

const detectBrowserLanguage = (): Language => {
  const candidates = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean);
  return candidates.some(isChineseLanguageTag) ? 'zh' : 'en';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to English on the server and first paint, then detect after mount
  // to keep server/client rendering consistent.
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    setLanguage(saved === 'zh' || saved === 'en' ? saved : detectBrowserLanguage());
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next: Language = prev === 'en' ? 'zh' : 'en';
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      return next;
    });
  };

  const t = i18n[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

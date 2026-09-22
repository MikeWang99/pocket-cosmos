import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Language, i18n } from './i18n';
import { buildTabUrl, parseAppPath, type AppLanguage } from './routing';

interface LanguageContextType {
  language: Language;
  ready: boolean;
  toggleLanguage: () => void;
  t: typeof i18n.en;
}

const LANGUAGE_STORAGE_KEY = 'pocket-cosmos-language';
export const ROUTE_CHANGE_EVENT = 'pocket-cosmos:route-change';

const isChineseLanguageTag = (tag: string) => tag.toLowerCase().startsWith('zh');

const detectBrowserLanguage = (): Language => {
  const candidates = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean);
  return candidates.some(isChineseLanguageTag) ? 'zh' : 'en';
};

const detectInitialLanguage = (): AppLanguage => {
  if (typeof window === 'undefined') return 'en';
  const route = parseAppPath(window.location.pathname, window.location.search);
  if (route.language) return route.language;

  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved === 'zh' || saved === 'en' ? saved : detectBrowserLanguage();
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage,
}) => {
  // Localized routes provide the language on the server so /zh renders
  // Chinese immediately instead of flashing English before hydration.
  const [language, setLanguage] = useState<Language>(initialLanguage ?? 'en');
  const [ready, setReady] = useState(Boolean(initialLanguage));

  useEffect(() => {
    const next = initialLanguage ?? detectInitialLanguage();
    setLanguage(next);
    document.documentElement.lang = next;
    if (initialLanguage) window.localStorage.setItem(LANGUAGE_STORAGE_KEY, initialLanguage);
    setReady(true);
  }, [initialLanguage]);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next: AppLanguage = prev === 'en' ? 'zh' : 'en';
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      document.documentElement.lang = next;

      const route = parseAppPath(window.location.pathname, window.location.search);
      const nextUrl = buildTabUrl(route.tab, next, window.location.search);
      window.history.pushState({}, '', nextUrl);
      window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
      return next;
    });
  };

  const t = i18n[language];

  return (
    <LanguageContext.Provider value={{ language, ready, toggleLanguage, t }}>
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

'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PracticeSection } from './components/PracticeSection';
import { HomeworkSection } from './components/HomeworkSection';
import { CurriculumSection } from './components/CurriculumSection';
import { AdminSection } from './components/AdminSection';
import { AuthStatusButton } from './components/AuthStatusButton';
import { AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './auth/AuthContext';

const validTabs = new Set(['curriculum', 'practice', 'homework', 'admin']);

const normalizeRequestedTab = (tab: string | null | undefined) =>
  tab && validTabs.has(tab) ? tab : 'curriculum';

const readTabFromUrl = () => {
  if (typeof window === 'undefined') return 'curriculum';
  return normalizeRequestedTab(new URLSearchParams(window.location.search).get('tab'));
};

const normalizeUrlForTab = (tab: string, mode: 'push' | 'replace' = 'push') => {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.pathname = '/';
  url.hash = '';

  if (tab === 'curriculum') {
    url.searchParams.delete('tab');
    url.searchParams.delete('set');
    url.searchParams.delete('q');
    url.searchParams.delete('assignment');
  } else {
    url.searchParams.set('tab', tab);
    if (tab !== 'practice') {
      url.searchParams.delete('set');
      url.searchParams.delete('q');
    }
    if (tab !== 'homework') {
      url.searchParams.delete('assignment');
    }
  }

  const nextUrl = `${url.pathname}${url.search}`;
  if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    window.history[mode === 'replace' ? 'replaceState' : 'pushState']({}, '', nextUrl);
  }
};

export default function App({ initialTab = 'curriculum' }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(() => normalizeRequestedTab(initialTab));
  const { t, language } = useLanguage();
  const { isAdmin, loading: authLoading } = useAuth();

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    normalizeUrlForTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const initialTab = readTabFromUrl();
    setActiveTab(initialTab);
    normalizeUrlForTab(initialTab, 'replace');

    const handlePopState = () => {
      setActiveTab(readTabFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (activeTab === 'physics' || activeTab === 'about' || activeTab === 'books') {
      setActiveTab('curriculum');
      normalizeUrlForTab('curriculum', 'replace');
      return;
    }
    if (!authLoading && !isAdmin && activeTab === 'admin') {
      setActiveTab('practice');
      normalizeUrlForTab('practice', 'replace');
    }
  }, [activeTab, isAdmin, authLoading]);

  return (
    <div className="min-h-screen bg-space-950 font-sans text-starlight antialiased selection:bg-quantum/20 flex">
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
      
      <Sidebar activeTab={activeTab} setActiveTab={selectTab} showAdmin={isAdmin} />
      
      <main className="relative z-10 flex min-h-screen flex-1 flex-col pb-24 md:ml-20 md:pb-0">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-5 sm:px-6 sm:py-8 md:p-10 lg:p-14 xl:p-16">
          <header className="mb-8 flex flex-col gap-5 border-b border-line pb-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between md:mb-12 md:pb-6">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <img
                src="/assets/poco-mark.svg"
                alt={t.site.logoAlt}
                className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14 md:h-[72px] md:w-[72px]"
              />
              <div className="flex min-w-0 flex-col">
                <h1 className="truncate font-serif text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">{t.site.title}</h1>
                <p className={`mt-1 text-[10px] opacity-50 sm:mt-2 sm:text-xs ${language === 'en' ? 'tracking-[0.22em] uppercase sm:tracking-[0.3em]' : 'tracking-[0.1em] sm:tracking-[0.18em]'}`}>
                  {t.site.subtitle}
                </p>
              </div>
            </div>
            
            <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end">
              <div className="hidden gap-6 pb-1 text-xs font-semibold uppercase tracking-widest md:flex">
                <button onClick={() => selectTab('curriculum')} className={`transition-colors ${activeTab === 'curriculum' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.curriculum}</button>
                <button onClick={() => selectTab('practice')} className={`transition-colors ${activeTab === 'practice' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.practice}</button>
                <button onClick={() => selectTab('homework')} className={`transition-colors ${activeTab === 'homework' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.homework}</button>
                {isAdmin && (
                  <button onClick={() => selectTab('admin')} className={`transition-colors ${activeTab === 'admin' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.admin}</button>
                )}
              </div>
              <AuthStatusButton />
            </div>
          </header>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'curriculum' && <CurriculumSection key="curriculum" />}
              {activeTab === 'practice' && <PracticeSection key="practice" />}
              {activeTab === 'homework' && <HomeworkSection key="homework" />}
              {activeTab === 'admin' && isAdmin && <AdminSection key="admin" />}
            </AnimatePresence>
          </div>
          
          <footer className="mt-12 flex items-center justify-between border-t border-line pb-2 pt-6 text-[10px] uppercase tracking-widest text-ink-muted sm:mt-16 sm:pb-8 sm:pt-8">
            <div>{t.site.footerBrand}</div>
          </footer>
        </div>
      </main>
    </div>
  );
}

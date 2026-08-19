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
import { AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './auth/AuthContext';
import { HomeSection } from './components/HomeSection';

const validTabs = new Set(['home', 'curriculum', 'practice', 'homework', 'admin']);

const normalizeRequestedTab = (tab: string | null | undefined) =>
  tab && validTabs.has(tab) ? tab : 'home';

const readTabFromUrl = () => {
  if (typeof window === 'undefined') return 'home';
  return normalizeRequestedTab(new URLSearchParams(window.location.search).get('tab'));
};

const normalizeUrlForTab = (tab: string, mode: 'push' | 'replace' = 'push') => {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.pathname = '/';
  url.hash = '';

  if (tab === 'home') {
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
  const { t } = useLanguage();
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
      setActiveTab('home');
      normalizeUrlForTab('home', 'replace');
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
      
      <main className="relative z-10 flex min-h-screen flex-1 flex-col pb-24 md:ml-[88px] md:pb-0">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-5 sm:px-6 sm:py-8 md:p-10 lg:p-14 xl:p-16">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && <HomeSection key="home" />}
              {activeTab !== 'home' && (
                <div key={`shell-${activeTab}`} className="min-w-0">
                  {activeTab === 'curriculum' && <CurriculumSection key="curriculum" />}
                  {activeTab === 'practice' && <PracticeSection key="practice" />}
                  {activeTab === 'homework' && <HomeworkSection key="homework" />}
                  {activeTab === 'admin' && isAdmin && <AdminSection key="admin" />}
                </div>
              )}
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

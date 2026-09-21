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
import { ROUTE_CHANGE_EVENT, useLanguage } from './LanguageContext';
import { useAuth } from './auth/AuthContext';
import { HomeSection } from './components/HomeSection';
import {
  buildTabUrl,
  normalizeAppTab,
  parseAppPath,
  type AppTab,
} from './routing';

const readTabFromUrl = () => {
  if (typeof window === 'undefined') return 'home' as AppTab;
  return parseAppPath(window.location.pathname, window.location.search).tab;
};

export default function App({ initialTab = 'home' }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState<AppTab>(() => normalizeAppTab(initialTab));
  const { language, ready: languageReady, t } = useLanguage();
  const { isAdmin, loading: authLoading } = useAuth();

  const normalizeUrlForTab = (tab: AppTab, mode: 'push' | 'replace' = 'push') => {
    if (typeof window === 'undefined') return;

    const nextUrl = buildTabUrl(tab, language, window.location.search);
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (nextUrl !== currentUrl) {
      window.history[mode === 'replace' ? 'replaceState' : 'pushState']({}, '', nextUrl);
    }
  };

  const selectTab = (tab: string) => {
    const nextTab = normalizeAppTab(tab);
    setActiveTab(nextTab);
    normalizeUrlForTab(nextTab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!languageReady) return;

    const syncRoute = (mode: 'push' | 'replace' = 'replace') => {
      const route = parseAppPath(window.location.pathname, window.location.search);
      setActiveTab(route.tab);

      const nextUrl = buildTabUrl(route.tab, language, window.location.search);
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      if (route.legacy || nextUrl !== currentUrl) {
        window.history[mode === 'replace' ? 'replaceState' : 'pushState']({}, '', nextUrl);
      }
    };

    syncRoute('replace');
    const handleRouteChange = () => setActiveTab(readTabFromUrl());

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);
    };
  }, [language, languageReady]);

  useEffect(() => {
    if (!authLoading && !isAdmin && activeTab === 'admin') {
      setActiveTab('practice');
      normalizeUrlForTab('practice', 'replace');
    }
  }, [activeTab, isAdmin, authLoading, language]);

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

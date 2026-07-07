'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PracticeSection } from './components/PracticeSection';
import { CurriculumSection } from './components/CurriculumSection';
import { AdminSection } from './components/AdminSection';
import { AuthStatusButton } from './components/AuthStatusButton';
import { AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './auth/AuthContext';

export default function App() {
  const [activeTab, setActiveTab] = useState('curriculum');
  const { t, language } = useLanguage();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (activeTab === 'physics' || activeTab === 'about' || activeTab === 'books') {
      setActiveTab('curriculum');
      return;
    }
    if (!isAdmin && activeTab === 'admin') {
      setActiveTab('practice');
    }
  }, [activeTab, isAdmin]);

  return (
    <div className="min-h-screen bg-space-950 font-sans text-starlight antialiased selection:bg-quantum/20 flex">
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} showAdmin={isAdmin} />
      
      <main className="flex-1 ml-20 flex flex-col min-h-screen relative z-10">
        <div className="flex-1 p-8 md:p-12 lg:p-16 max-w-7xl mx-auto w-full flex flex-col">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 mb-12 gap-8">
            <div className="flex items-center gap-4">
              <img
                src="/assets/poco-mark.svg"
                alt={t.site.logoAlt}
                className="h-16 w-16 md:h-[72px] md:w-[72px] object-contain"
              />
              <div className="flex flex-col">
                <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight">{t.site.title}</h1>
                <p className={`text-xs opacity-50 mt-2 ${language === 'en' ? 'tracking-[0.3em] uppercase' : 'tracking-[0.18em]'}`}>
                  {t.site.subtitle}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-start gap-4 md:items-end">
              <div className="hidden md:flex gap-6 text-xs font-semibold tracking-widest uppercase pb-1">
                <button onClick={() => setActiveTab('curriculum')} className={`transition-colors ${activeTab === 'curriculum' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.curriculum}</button>
                <button onClick={() => setActiveTab('practice')} className={`transition-colors ${activeTab === 'practice' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.practice}</button>
                {isAdmin && (
                  <button onClick={() => setActiveTab('admin')} className={`transition-colors ${activeTab === 'admin' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.admin}</button>
                )}
              </div>
              <AuthStatusButton />
            </div>
          </header>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'curriculum' && <CurriculumSection key="curriculum" />}
              {activeTab === 'practice' && <PracticeSection key="practice" />}
              {activeTab === 'admin' && isAdmin && <AdminSection key="admin" />}
            </AnimatePresence>
          </div>
          
          <footer className="mt-16 pb-8 flex justify-between items-center text-[10px] tracking-widest uppercase opacity-30 border-t border-white/10 pt-8">
            <div>{t.site.footerBrand}</div>
          </footer>
        </div>
      </main>
    </div>
  );
}

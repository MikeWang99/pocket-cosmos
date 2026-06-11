/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PhysicsSection } from './components/PhysicsSection';
import { AboutSection } from './components/AboutSection';
import { BooksSection } from './components/BooksSection';
import { PracticeSection } from './components/PracticeSection';
import { AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';

export default function App() {
  const [activeTab, setActiveTab] = useState('physics');
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-space-950 font-sans text-starlight antialiased selection:bg-quantum/20 flex">
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-20 flex flex-col min-h-screen relative z-10">
        <div className="flex-1 p-8 md:p-12 lg:p-16 max-w-7xl mx-auto w-full flex flex-col">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 mb-12 gap-8">
            <div className="flex items-center gap-4">
              <img
                src="/assets/poco-logo.png"
                alt={t.site.logoAlt}
                className="h-14 w-14 rounded-full object-cover border border-white/10 shadow-sm"
              />
              <div className="flex flex-col">
                <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight">{t.site.title}</h1>
                <p className={`text-xs opacity-50 mt-2 ${language === 'en' ? 'tracking-[0.3em] uppercase' : 'tracking-[0.18em]'}`}>
                  {t.site.subtitle}
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase pb-1">
              <button onClick={() => setActiveTab('physics')} className={`transition-colors ${activeTab === 'physics' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.home}</button>
              <button onClick={() => setActiveTab('practice')} className={`transition-colors ${activeTab === 'practice' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.practice}</button>
              <button onClick={() => setActiveTab('about')} className={`transition-colors ${activeTab === 'about' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.about}</button>
              <button onClick={() => setActiveTab('books')} className={`transition-colors ${activeTab === 'books' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>{t.nav.books}</button>
            </div>
          </header>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'physics' && <PhysicsSection key="physics" />}
              {activeTab === 'practice' && <PracticeSection key="practice" />}
              {activeTab === 'about' && <AboutSection key="about" />}
              {activeTab === 'books' && <BooksSection key="books" />}
            </AnimatePresence>
          </div>
          
          <footer className="mt-16 pb-8 flex justify-between items-center text-[10px] tracking-widest uppercase opacity-30 border-t border-white/10 pt-8">
            <div>{t.site.footerBrand}</div>
            <div className="hidden sm:block">{t.site.footerLocation}</div>
          </footer>
        </div>
      </main>
    </div>
  );
}

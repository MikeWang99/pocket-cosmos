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

export default function App() {
  const [activeTab, setActiveTab] = useState('physics');

  return (
    <div className="min-h-screen bg-space-950 font-sans text-starlight antialiased selection:bg-quantum/30 flex">
      <div className="fixed inset-0 bg-grid-pattern opacity-50 pointer-events-none mix-blend-screen"></div>
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-20 flex flex-col min-h-screen relative z-10">
        <div className="flex-1 p-8 md:p-12 lg:p-16 max-w-7xl mx-auto w-full flex flex-col">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 mb-12 gap-8">
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight">Pocket <span className="italic font-normal">Cosmos</span></h1>
              <p className="text-xs tracking-[0.3em] uppercase opacity-50 mt-2">口袋宇宙 · Online Physics Instruction</p>
            </div>
            
            <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase pb-1">
              <button onClick={() => setActiveTab('physics')} className={`transition-colors ${activeTab === 'physics' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>The Method</button>
              <button onClick={() => setActiveTab('practice')} className={`transition-colors ${activeTab === 'practice' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>Practice</button>
              <button onClick={() => setActiveTab('about')} className={`transition-colors ${activeTab === 'about' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>About Me</button>
              <button onClick={() => setActiveTab('books')} className={`transition-colors ${activeTab === 'books' ? 'text-nebula border-b border-nebula pb-1' : 'hover:text-nebula'}`}>Library</button>
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
            <div>© 2024 Pocket Cosmos by Mike Wang</div>
            <div className="hidden sm:block">Munich · Shanghai · Global</div>
          </footer>
        </div>
      </main>
    </div>
  );
}

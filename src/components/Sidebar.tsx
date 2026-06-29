import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Atom, Orbit, BookOpen, ClipboardCheck, BookOpenCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t, toggleLanguage } = useLanguage();

  const navItems = [
    { id: 'physics', icon: Atom, label: t.nav.home },
    { id: 'curriculum', icon: BookOpenCheck, label: t.nav.curriculum },
    { id: 'practice', icon: ClipboardCheck, label: t.nav.practice },
    { id: 'about', icon: Orbit, label: t.nav.about },
    { id: 'books', icon: BookOpen, label: t.nav.books },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-20 flex flex-col items-center justify-between py-6 border-r border-white/10 glass z-50">
      <div className="flex flex-col gap-8 items-center w-full">
        <div className="text-[10px] font-bold tracking-widest opacity-40 uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {t.site.established}
        </div>
        <img
          src="/assets/poco-logo-transparent.png"
          alt={t.site.logoAlt}
          className="w-11 h-11 object-contain"
        />
      </div>

      <nav className="flex-1 w-full flex flex-col items-center justify-center gap-6">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative group flex items-center justify-center w-12 h-12"
              title={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 shrink-0 relative z-10 transition-colors ${isActive ? 'text-nebula' : 'text-slate-400 group-hover:text-slate-200'}`} />
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-4 text-[10px] font-semibold tracking-tighter w-full">
        <button onClick={toggleLanguage} className="text-nebula hover:text-quantum transition-colors" title={t.nav.language}>
          {t.nav.language}
        </button>
      </div>
    </aside>
  );
};

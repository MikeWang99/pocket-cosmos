import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ClipboardCheck, BookOpenCheck, Languages, ListChecks, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showAdmin?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, showAdmin = false }) => {
  const { language, t, toggleLanguage } = useLanguage();

  const navItems = [
    { id: 'curriculum', icon: BookOpenCheck, label: t.nav.curriculum },
    { id: 'practice', icon: ClipboardCheck, label: t.nav.practice },
    { id: 'homework', icon: ListChecks, label: t.nav.homework },
    ...(showAdmin ? [{ id: 'admin', icon: ShieldCheck, label: t.nav.admin }] : []),
  ];

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-line glass md:inset-x-auto md:left-0 md:top-0 md:h-full md:w-20 md:border-r md:border-t-0">
      <div className="hidden w-full flex-col items-center gap-8 py-6 md:flex">
        <div
          className="text-[10px] font-bold tracking-widest opacity-40 uppercase"
          style={{
            writingMode: 'vertical-rl',
            transform: language === 'zh' ? 'none' : 'rotate(180deg)',
          }}
        >
          {t.site.established}
        </div>
        <img
          src="/assets/poco-mark.svg"
          alt={t.site.logoAlt}
          className="h-[52px] w-[52px] object-contain"
        />
      </div>

      <nav className={`mx-auto grid max-w-md items-center gap-1 py-2 pl-3 pr-14 md:absolute md:inset-y-0 md:left-0 md:mx-0 md:flex md:w-full md:max-w-none md:flex-col md:justify-center md:gap-6 md:px-0 md:py-0 ${navItems.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="group relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 text-[10px] font-semibold text-slate-500 md:h-12 md:min-h-0 md:w-12 md:rounded-none md:px-0"
              title={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl border border-line bg-surface-tint md:rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 shrink-0 relative z-10 transition-colors ${isActive ? 'text-nebula' : 'text-ink-soft group-hover:text-ink'}`} />
              <span className={`relative z-10 leading-none md:hidden ${isActive ? 'text-nebula' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute right-3 top-3 hidden flex-col items-center gap-4 text-[10px] font-semibold tracking-tighter md:bottom-6 md:left-0 md:right-auto md:top-auto md:flex md:w-full">
        <button onClick={toggleLanguage} className="text-nebula transition-colors hover:text-quantum" title={t.nav.language}>
          {t.nav.language}
        </button>
      </div>

      <button
        onClick={toggleLanguage}
        className="absolute right-3 top-2 grid h-10 w-10 place-items-center rounded-full border border-line bg-surface-tint text-nebula md:hidden"
        title={t.nav.language}
      >
        <Languages className="h-4 w-4" />
      </button>
    </aside>
  );
};

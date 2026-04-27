import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Compass, Lightbulb, Zap } from 'lucide-react';

export const PhysicsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl"
    >
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-light mb-6 text-white leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide max-w-2xl">
          {t.hero.subtitle}
        </p>
      </div>

      <div className="mb-20 accent-gradient p-10 py-12 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <svg width="200" height="200" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/><circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1"/><path d="M50 2 L50 98 M2 50 L98 50" stroke="white" strokeWidth="0.2"/></svg>
        </div>
        <div className="max-w-xl relative z-10">
          <span className="text-nebula text-sm font-semibold tracking-widest uppercase mb-4 block">
            {t.home.whatIsPhysicsTitle}
          </span>
          <p className="text-lg text-slate-300 leading-relaxed font-light mb-8">
            {t.home.whatIsPhysicsText}
          </p>
          <div className="flex gap-4">
             <button className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-nebula hover:text-white transition-all">Start Learning</button>
             <button className="border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-full hover:border-white transition-all">Curriculum</button>
          </div>
        </div>
      </div>

      <h2 className="text-xs font-bold tracking-widest uppercase mb-8 text-white opacity-40">
        {t.home.howToLearnTitle}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start mb-6">
            <span className="text-nebula font-bold opacity-50">01</span>
            <Compass className="w-5 h-5 text-slate-400" />
          </div>
          <h3 className="text-sm font-semibold mb-3 tracking-widest uppercase text-white">{t.home.point1Title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed">{t.home.point1Text}</p>
        </div>
        
        <div className="glass p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start mb-6">
            <span className="text-nebula font-bold opacity-50">02</span>
            <Lightbulb className="w-5 h-5 text-slate-400" />
          </div>
          <h3 className="text-sm font-semibold mb-3 tracking-widest uppercase text-white">{t.home.point2Title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed">{t.home.point2Text}</p>
        </div>
        
        <div className="glass p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start mb-6">
            <span className="text-nebula font-bold opacity-50">03</span>
            <Zap className="w-5 h-5 text-slate-400" />
          </div>
          <h3 className="text-sm font-semibold mb-3 tracking-widest uppercase text-white">{t.home.point3Title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed">{t.home.point3Text}</p>
        </div>
      </div>
    </motion.div>
  );
};

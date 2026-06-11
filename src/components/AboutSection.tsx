import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 flex flex-col gap-6">
          <div className="glass p-8 rounded-2xl border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">{t.about.sectionLabel}</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
              <img
                src="/assets/founder-photo.png"
                alt={t.about.photoAlt}
                className="w-20 h-20 rounded-full object-cover border border-nebula/30 shrink-0"
              />
              <div>
                <h1 className="text-2xl font-serif font-bold text-white mb-1">
                  {t.about.displayName}
                </h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                  {t.about.credential}
                </p>
              </div>
            </div>
            <div className="w-full h-px bg-white/5 my-6"></div>
            <p className="text-[13px] text-slate-300 leading-relaxed font-light">
              {t.about.description}
            </p>
          </div>

          <div className="glass p-8 rounded-2xl border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">{t.about.featuresTitle}</h3>
            <ul className="space-y-4 text-xs text-slate-300 font-light">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>{t.about.feature1}</span>
                <span className="text-nebula tracking-wider uppercase">01</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>{t.about.feature2}</span>
                <span className="text-nebula tracking-wider uppercase">02</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>{t.about.feature3}</span>
                <span className="text-nebula tracking-wider uppercase">03</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex-1 glass p-8 rounded-2xl border border-white/10 flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">{t.about.eduTitle}</h3>
            
            <div className="space-y-8 flex-1">
              <div>
                <div className="text-[10px] text-nebula tracking-widest uppercase mb-1">{t.about.master}</div>
                <h3 className="text-sm font-semibold text-white mb-2">{t.about.edu1Degree}</h3>
                <p className="text-[10px] text-slate-400 italic">{t.about.edu1School}</p>
              </div>
              
              <div className="w-12 h-px bg-white/10"></div>
              
              <div>
                <div className="text-[10px] text-nebula tracking-widest uppercase mb-1">{t.about.bachelor}</div>
                <h3 className="text-sm font-semibold text-white mb-2">{t.about.edu2Degree}</h3>
                <p className="text-[10px] text-slate-400 italic">{t.about.edu2School}</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-nebula/10 border border-nebula/20 rounded-lg">
              <p className="text-[10px] leading-relaxed text-indigo-200">
                {t.about.quote} <br/><br/>— {t.about.quoteAuthor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

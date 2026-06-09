import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { BookMarked } from 'lucide-react';

export const BooksSection: React.FC = () => {
  const { t } = useLanguage();

  const books = [
    {
      title: t.books.book1Title,
      author: t.books.book1Author,
      desc: t.books.book1Desc,
      tag: t.books.book1Tag,
    },
    {
      title: t.books.book2Title,
      author: t.books.book2Author,
      desc: t.books.book2Desc,
      tag: t.books.book2Tag,
    },
    {
      title: t.books.book3Title,
      author: t.books.book3Author,
      desc: t.books.book3Desc,
      tag: t.books.book3Tag,
    },
    {
      title: t.books.book4Title,
      author: t.books.book4Author,
      desc: t.books.book4Desc,
      tag: t.books.book4Tag,
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl"
    >
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-4 text-white">
          {t.books.title}
        </h1>
        <p className="text-sm text-slate-400 font-light max-w-2xl tracking-widest uppercase opacity-60">
          {t.books.subtitle}
        </p>
      </div>

      <div className="glass p-8 rounded-2xl border border-white/10 flex flex-col gap-6">
        <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">{t.books.sectionLabel}</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {books.map((book, idx) => (
            <div 
              key={idx} 
              className="group flex gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
            >
              <div className="w-16 h-20 bg-nebula/10 rounded flex items-center justify-center text-[10px] font-bold tracking-widest border border-white/10 shrink-0 uppercase text-slate-300">
                {book.tag}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-sm font-bold text-white mb-1">
                  {book.title}
                </h3>
                <p className="text-[11px] text-slate-400 italic mb-2 uppercase tracking-wide">
                  {book.author}
                </p>
                <p className="text-[11px] leading-relaxed text-slate-500 line-clamp-2">
                  {book.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

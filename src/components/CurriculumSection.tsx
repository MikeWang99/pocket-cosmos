import React, { useMemo, useState } from 'react';
import { BookOpenCheck, ChevronDown, ExternalLink, Layers3 } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { apPhysicsCurriculum } from '../data/apPhysicsCurriculum';

export const CurriculumSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [courseId, setCourseId] = useState(apPhysicsCurriculum[0].id);
  const course = apPhysicsCurriculum.find((item) => item.id === courseId) ?? apPhysicsCurriculum[0];
  const [openUnits, setOpenUnits] = useState<Set<number>>(() => new Set([course.units[0].number]));

  const topicCount = useMemo(
    () => course.units.reduce((total, unit) => total + unit.topics.length, 0),
    [course],
  );

  const selectCourse = (id: typeof courseId) => {
    const nextCourse = apPhysicsCurriculum.find((item) => item.id === id);
    setCourseId(id);
    setOpenUnits(new Set(nextCourse ? [nextCourse.units[0].number] : []));
  };

  const toggleUnit = (number: number) => {
    setOpenUnits((current) => {
      const next = new Set(current);
      if (next.has(number)) next.delete(number);
      else next.add(number);
      return next;
    });
  };

  const allOpen = openUnits.size === course.units.length;
  const toggleAll = () => {
    setOpenUnits(allOpen ? new Set() : new Set(course.units.map((unit) => unit.number)));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-nebula mb-4">
          <BookOpenCheck className="h-4 w-4" />
          <span className="text-xs font-bold tracking-widest uppercase">{t.curriculum.sectionLabel}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-light">{t.curriculum.title}</h2>
        <p className="mt-4 text-sm md:text-base leading-7 text-slate-600">{t.curriculum.description}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2" role="tablist" aria-label={t.curriculum.courseSelector}>
        {apPhysicsCurriculum.map((item) => {
          const active = item.id === course.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectCourse(item.id)}
              className={`min-h-16 border rounded-lg px-3 py-3 text-left transition-colors ${
                active
                  ? 'border-nebula bg-white/10 text-nebula'
                  : 'border-white/10 bg-white/5 text-slate-600 hover:border-white/30 hover:text-starlight'
              }`}
            >
              <span className="block text-sm font-semibold leading-5">{item.name[language]}</span>
              <span className="block mt-1 text-[10px] uppercase tracking-wider opacity-60">{item.level[language]}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-nebula">{course.level[language]}</p>
          <h3 className="mt-2 text-2xl font-semibold">{course.name[language]}</h3>
          <p className="mt-2 text-sm text-slate-500">
            {course.units.length} {t.curriculum.units} · {topicCount} {t.curriculum.topics}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-600 hover:border-white/30 hover:text-nebula transition-colors"
          >
            <Layers3 className="h-4 w-4" />
            {allOpen ? t.curriculum.collapseAll : t.curriculum.expandAll}
          </button>
          <a
            href={course.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-600 hover:border-white/30 hover:text-nebula transition-colors"
          >
            {t.curriculum.officialSource}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {course.units.map((unit) => {
          const open = openUnits.has(unit.number);
          const panelId = `${course.id}-unit-${unit.number}`;
          return (
            <article key={unit.number}>
              <button
                type="button"
                onClick={() => toggleUnit(unit.number)}
                aria-expanded={open}
                aria-controls={panelId}
                className="w-full py-5 flex items-center gap-4 text-left group"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-nebula">
                  {unit.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {t.curriculum.unit} {unit.number}
                  </span>
                  <span className="mt-1 block text-base md:text-lg font-semibold leading-6 group-hover:text-nebula transition-colors">
                    {unit.title[language]}
                  </span>
                </span>
                <span className="hidden sm:block text-xs text-slate-500">
                  {unit.weighting} {t.curriculum.examWeight}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>

              {open && (
                <motion.div
                  id={panelId}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-0 sm:pl-14 grid gap-px bg-slate-200 sm:grid-cols-2">
                    {unit.topics.map((item) => (
                      <div key={item.id} className="min-h-14 bg-space-950 px-4 py-3 flex items-start gap-3">
                        <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-nebula">{item.id}</span>
                        <span className="text-sm leading-5 text-slate-600">{item.title[language]}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </article>
          );
        })}
      </div>

      <p className="text-xs leading-5 text-slate-500">{t.curriculum.sourceNote}</p>
    </motion.section>
  );
};

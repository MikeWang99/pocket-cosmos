'use client';

import { ArrowRight, BookOpenCheck, ClipboardCheck, ListChecks, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { ProfileInfoPanel } from './ProfileInfoPanel';

const appLinks = [
  { id: 'curriculum', icon: BookOpenCheck },
  { id: 'practice', icon: ClipboardCheck },
  { id: 'homework', icon: ListChecks },
];

export function HomeSection() {
  const { language } = useLanguage();

  const content = language === 'zh'
    ? {
        badge: '口袋寰宇 · Physics Learning Platform',
        headline: '系统化学习物理：看清知识结构，做高价值练习，持续追踪进步。',
        subtitle:
          '面向 AP、IGCSE、A Level、IB 与物理竞赛，把知识地图、针对性练习和作业反馈放在同一个学习流程里。',
        systems: ['AP Physics', 'IGCSE', 'A Level', 'IB', 'Physics Competitions'],
        modulesTitle: '从这里开始',
        modules: [
          {
            id: 'curriculum',
            title: '知识地图',
            body: '先看清章节结构、核心概念和学习顺序，再决定下一步学什么。',
          },
          {
            id: 'practice',
            title: '练习题库',
            body: '按体系、章节、难度和题型训练，并记录每道题的完成情况。',
          },
          {
            id: 'homework',
            title: '作业模块',
            body: '集中查看老师布置的题目、截止时间和已完成进度。',
          },
        ],
        primaryCta: '进入知识地图',
        secondaryCta: '免费试做题目',
        openLabel: '打开',
      }
    : {
        badge: 'Pocket Cosmos · Physics Learning Platform',
        headline: 'Learn physics systematically: see the structure, practise what matters, and track progress.',
        subtitle:
          'Built for AP, IGCSE, A Level, IB, and physics competitions, with knowledge maps, targeted practice, and homework feedback in one learning flow.',
        systems: ['AP Physics', 'IGCSE', 'A Level', 'IB', 'Physics Competitions'],
        modulesTitle: 'Start here',
        modules: [
          {
            id: 'curriculum',
            title: 'Knowledge Map',
            body: 'See the chapter structure, core concepts, and learning sequence before deciding what to study next.',
          },
          {
            id: 'practice',
            title: 'Practice Library',
            body: 'Train by system, chapter, difficulty, and question type while keeping track of completed work.',
          },
          {
            id: 'homework',
            title: 'Homework',
            body: 'Keep assigned questions, deadlines, and completion progress in one place.',
          },
        ],
        primaryCta: 'Open Knowledge Map',
        secondaryCta: 'Try Free Practice',
        openLabel: 'Open',
      };

  return (
    <section className="space-y-6">
      <div className="glass-panel rounded-[28px] p-6 sm:p-8 lg:p-10">
        <div className="inline-flex rounded-full border border-nebula/20 bg-surface-tint px-4 py-1.5 text-xs font-semibold text-nebula">
          {content.badge}
        </div>

        <h1 className="mt-5 max-w-5xl font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl xl:text-6xl">
          {content.headline}
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft sm:text-lg">
          {content.subtitle}
        </p>

        <div className="mt-5 flex flex-wrap gap-2" aria-label={language === 'zh' ? '支持的课程体系' : 'Supported systems'}>
          {content.systems.map((system) => (
            <span
              key={system}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft"
            >
              {system}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="/?tab=curriculum"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-nebula px-5 py-3 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
          >
            {content.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/?tab=practice"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-nebula/40 hover:text-nebula"
          >
            {content.secondaryCta}
          </a>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="glass-panel rounded-[28px] p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-nebula" />
            <h2 className="font-serif text-2xl tracking-tight text-ink">{content.modulesTitle}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {content.modules.map((item, index) => {
              const Icon = appLinks[index]?.icon ?? BookOpenCheck;
              return (
                <a
                  key={item.id}
                  href={`/?tab=${item.id}`}
                  className="group rounded-[24px] border border-line bg-surface p-5 transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-tint text-nebula">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-lg font-semibold text-ink">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.body}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-nebula">
                    {content.openLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="xl:self-start">
          <ProfileInfoPanel compact />
        </div>
      </div>
    </section>
  );
}

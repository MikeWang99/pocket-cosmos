'use client';

import { ArrowRight, BookOpenCheck, ClipboardCheck, ListChecks, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { ProfileContactPanel } from './ProfileContactPanel';

const appLinks = [
  { id: 'curriculum', icon: BookOpenCheck },
  { id: 'practice', icon: ClipboardCheck },
  { id: 'homework', icon: ListChecks },
];

export function HomeSection() {
  const { language } = useLanguage();

  const content = language === 'zh'
    ? {
        badge: 'Pocket Cosmos · Physics Learning Platform',
        headline: '系统化的物理学习平台，服务于课程学习、能力诊断与长期提升。',
        subtitle:
          'Pocket Cosmos 面向 AP Physics、IGCSE Physics 以及竞赛方向的学生与家长，提供知识地图、习题训练、作业管理与持续沉淀的学习资料。',
        introTitle: '平台定位',
        introBody:
          '这个网站不是单纯的资料展示页，也不是临时的联系中转页。它的核心目标，是把物理学习中最重要的几件事情——知识梳理、做题训练、作业跟进与学习反馈——放到同一个清晰的体系里。',
        modulesTitle: '核心模块',
        modules: [
          {
            id: 'curriculum',
            title: '知识地图',
            body: '按章节整理课程内容，帮助学生快速看清每个单元的知识结构、重点概念与学习路径。',
          },
          {
            id: 'practice',
            title: '练习题库',
            body: '结合不同体系与章节分类，支持按主题做题、按难度训练，也方便老师筛题和布置专项练习。',
          },
          {
            id: 'homework',
            title: '作业模块',
            body: '用于承接每次课后的完整作业安排，减少学生来回找题的成本，也方便后续跟踪完成情况。',
          },
        ],
        audienceTitle: '适合谁使用',
        audience: [
          '正在学习 AP Physics 1、AP Physics C、IGCSE Physics 等课程的学生',
          '希望系统整理教学资料、题库与作业流程的老师',
          '想快速了解学习路径、判断当前阶段重点的家长',
        ],
        nextTitle: '进入平台',
        nextBody:
          '你可以从知识地图开始了解课程结构，也可以直接进入练习题库查看当前已有的内容。',
        primaryCta: '进入知识地图',
        secondaryCta: '查看练习题库',
        openLabel: '打开',
      }
    : {
        badge: 'Pocket Cosmos · Physics Learning Platform',
        headline: 'A structured physics platform for course learning, diagnostics, and long-term progress.',
        subtitle:
          'Pocket Cosmos supports AP Physics, IGCSE Physics, and competition-focused learners with knowledge maps, targeted practice, homework workflows, and steadily expanding learning materials.',
        introTitle: 'Platform Overview',
        introBody:
          'This is not just a materials page, and it is not a temporary contact bridge. Its purpose is to bring the most important parts of physics learning—concept structure, question training, homework follow-up, and study support—into one clear system.',
        modulesTitle: 'Core Modules',
        modules: [
          {
            id: 'curriculum',
            title: 'Knowledge Map',
            body: 'Chapter-based curriculum structure that helps students see each unit’s concepts, priorities, and learning path clearly.',
          },
          {
            id: 'practice',
            title: 'Practice Library',
            body: 'Topic-based question sets organized by system, chapter, and difficulty for both class practice and targeted revision.',
          },
          {
            id: 'homework',
            title: 'Homework Module',
            body: 'A cleaner way to assign and review full homework sets without making students jump across different sections to find questions.',
          },
        ],
        audienceTitle: 'Who This Is For',
        audience: [
          'Students studying AP Physics 1, AP Physics C, IGCSE Physics, and related courses',
          'Teachers who want a cleaner way to organize materials, question banks, and homework',
          'Parents who want a faster view of the learning structure and current priorities',
        ],
        nextTitle: 'Start Exploring',
        nextBody:
          'You can begin with the knowledge map to understand the course structure, or jump straight into the practice library.',
        primaryCta: 'Open Knowledge Map',
        secondaryCta: 'Browse Practice',
        openLabel: 'Open',
      };

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <div className="glass-panel rounded-[28px] p-6 sm:p-8">
          <div className="inline-flex rounded-full border border-nebula/20 bg-surface-tint px-4 py-1.5 text-xs font-semibold text-nebula">
            {content.badge}
          </div>
          <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {content.headline}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-ink-soft sm:text-lg">
            {content.subtitle}
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="glass-panel rounded-[28px] p-6">
            <h3 className="font-serif text-2xl tracking-tight text-ink">{content.introTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
              {content.introBody}
            </p>
          </div>

          <div className="glass-panel rounded-[28px] p-6">
            <h3 className="font-serif text-2xl tracking-tight text-ink">{content.audienceTitle}</h3>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-ink-soft sm:text-base">
              {content.audience.map((item) => (
                <li key={item} className="rounded-2xl border border-line bg-surface px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 glass-panel rounded-[28px] p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-nebula" />
            <h3 className="font-serif text-2xl tracking-tight text-ink">{content.modulesTitle}</h3>
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

        <div className="mt-6 glass-panel rounded-[28px] p-6 sm:p-8">
          <h3 className="font-serif text-2xl tracking-tight text-ink">{content.nextTitle}</h3>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">{content.nextBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/?tab=curriculum"
              className="inline-flex items-center gap-2 rounded-full bg-nebula px-5 py-3 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
            >
              {content.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/?tab=practice"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-nebula/40 hover:text-nebula"
            >
              {content.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      <div className="xl:sticky xl:top-8 xl:self-start">
        <ProfileContactPanel />
      </div>
    </section>
  );
}

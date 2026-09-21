'use client';

import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  ListChecks,
  RefreshCcw,
  Route,
  Target,
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { ProfileInfoPanel } from './ProfileInfoPanel';
import { buildAppPath, type AppTab } from '../routing';

const moduleIcons: Record<'curriculum' | 'practice' | 'homework', typeof BookOpenCheck> = {
  curriculum: BookOpenCheck,
  practice: ClipboardCheck,
  homework: ListChecks,
};

export function HomeSection() {
  const { language } = useLanguage();

  const content = language === 'zh'
    ? {
        badge: '口袋寰宇 · Pocket Cosmos',
        headline: '把物理学习，从“做很多题”变成一条看得见的学习路径。',
        subtitle:
          '用知识地图建立结构，用针对性题库诊断问题，再通过作业与反馈把薄弱点真正补起来。覆盖 AP、IGCSE、A Level 与物理竞赛方向。',
        primaryCta: '从知识地图开始',
        secondaryCta: '免费试做 5 题',
        systems: ['AP Physics', 'IGCSE', 'A Level', 'BPhO / F=ma', 'Physics Bowl'],
        modulesTitle: '一套连续的学习系统',
        modules: [
          {
            id: 'curriculum' as const,
            eyebrow: '01 · Learn',
            title: '知识地图',
            body: '按课程、单元和知识点拆解内容，让学生先知道自己正在学什么、前后知识如何连接。',
          },
          {
            id: 'practice' as const,
            eyebrow: '02 · Diagnose',
            title: '练习题库',
            body: '按体系、章节、题型与难度筛选练习。公开体验题无需登录即可开始。',
          },
          {
            id: 'homework' as const,
            eyebrow: '03 · Follow through',
            title: '作业与反馈',
            body: '把课后任务、作答记录和老师反馈放到同一个学习闭环里，而不是散落在聊天记录中。',
          },
        ],
        loopTitle: '不是题库，而是学习闭环',
        loop: [
          ['建立结构', '先通过 Knowledge Map 明确知识框架与学习顺序。'],
          ['针对训练', '用题库快速暴露概念、建模和计算中的具体薄弱点。'],
          ['记录与复盘', '保存作答历史、作业完成情况与老师反馈，观察长期变化。'],
        ],
        aboutTitle: '由真实教学工作流驱动',
        aboutBody:
          'Pocket Cosmos 不是把资料简单堆到网页上，而是围绕真实的一对一物理教学流程持续迭代：讲什么、练什么、课后布置什么、下节课复盘什么。',
      }
    : {
        badge: 'Pocket Cosmos · Physics Learning Platform',
        headline: 'Turn physics study from “more questions” into a visible learning path.',
        subtitle:
          'Build structure with knowledge maps, diagnose gaps with targeted practice, then close the loop through homework and teacher feedback. Built for AP, IGCSE, A Level, and competition physics.',
        primaryCta: 'Start with the Knowledge Map',
        secondaryCta: 'Try 5 questions free',
        systems: ['AP Physics', 'IGCSE', 'A Level', 'BPhO / F=ma', 'Physics Bowl'],
        modulesTitle: 'One continuous learning system',
        modules: [
          {
            id: 'curriculum' as const,
            eyebrow: '01 · Learn',
            title: 'Knowledge Map',
            body: 'See the course structure, unit sequence, and key concepts before practice becomes a collection of disconnected questions.',
          },
          {
            id: 'practice' as const,
            eyebrow: '02 · Diagnose',
            title: 'Practice Library',
            body: 'Target questions by curriculum, unit, question type, and difficulty. A public sample is available without signing in.',
          },
          {
            id: 'homework' as const,
            eyebrow: '03 · Follow through',
            title: 'Homework & Feedback',
            body: 'Keep assignments, attempts, and teacher review in the same learning loop instead of scattering them across messages and files.',
          },
        ],
        loopTitle: 'A learning loop, not just a question bank',
        loop: [
          ['Build structure', 'Use the Knowledge Map to understand what comes first and how ideas connect.'],
          ['Practice deliberately', 'Use targeted questions to expose specific conceptual, modelling, and calculation gaps.'],
          ['Review progress', 'Keep attempts, assignments, and teacher feedback so improvement stays visible over time.'],
        ],
        aboutTitle: 'Built around a real tutoring workflow',
        aboutBody:
          'Pocket Cosmos is designed around the actual cycle of one-to-one physics tutoring: what to teach, what to practise, what to assign, and what to revisit next lesson.',
      };

  return (
    <section className="space-y-6">
      <div className="glass-panel overflow-hidden rounded-[30px] p-6 sm:p-8 lg:p-10">
        <div className="max-w-4xl">
          <div className="inline-flex rounded-full border border-nebula/20 bg-surface-tint px-4 py-2 text-xs font-semibold text-nebula">
            {content.badge}
          </div>
          <h1 className="mt-6 text-balance font-serif text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {content.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft sm:text-lg">
            {content.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={buildAppPath('curriculum', language)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-nebula px-5 py-3 text-sm font-semibold text-on-accent shadow-sm transition-transform hover:-translate-y-0.5"
            >
              {content.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={buildAppPath('practice', language)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-nebula/40 hover:text-nebula"
            >
              {content.secondaryCta}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-5">
          {content.systems.map((system) => (
            <span key={system} className="rounded-full bg-surface-tint px-3 py-1.5 text-xs font-semibold text-ink-soft">
              {system}
            </span>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-[28px] p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <Route className="h-5 w-5 text-nebula" />
          <h2 className="font-serif text-2xl tracking-tight text-ink sm:text-3xl">{content.modulesTitle}</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {content.modules.map((item) => {
            const Icon = moduleIcons[item.id];
            return (
              <a
                key={item.id}
                href={buildAppPath(item.id as AppTab, language)}
                className="group flex min-h-64 flex-col rounded-[24px] border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:border-nebula/35 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-surface-tint text-nebula">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">{item.eyebrow}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">{item.body}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-nebula">
                  {language === 'zh' ? '进入' : 'Open'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="glass-panel rounded-[28px] p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <RefreshCcw className="h-5 w-5 text-nebula" />
            <h2 className="font-serif text-2xl tracking-tight text-ink">{content.loopTitle}</h2>
          </div>
          <div className="grid gap-3">
            {content.loop.map(([title, body], index) => (
              <div key={title} className="grid gap-3 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-[44px_minmax(0,1fr)] sm:items-start">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-surface-tint text-xs font-bold text-nebula">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="font-semibold text-ink">{title}</div>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-nebula/20 bg-nebula/[0.05] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Target className="h-4 w-4 text-nebula" />
              {content.aboutTitle}
            </div>
            <p className="mt-2 text-sm leading-7 text-ink-soft">{content.aboutBody}</p>
          </div>
        </div>

        <div className="xl:sticky xl:top-8 xl:self-start">
          <ProfileInfoPanel compact />
        </div>
      </div>
    </section>
  );
}

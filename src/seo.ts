import type { Metadata } from 'next';
import type { AppLanguage, AppTab } from './routing';
import { buildAppPath } from './routing';

const COPY: Record<AppLanguage, Record<AppTab, { title: string; description: string }>> = {
  en: {
    home: {
      title: 'Pocket Cosmos | Structured Physics Learning',
      description: 'Structured physics learning for AP, IGCSE, A Level, IB, and competition students.',
    },
    curriculum: {
      title: 'Physics Knowledge Map',
      description: 'Explore structured physics knowledge maps, units, lessons, formulas, and classroom checks.',
    },
    practice: {
      title: 'Physics Practice Library',
      description: 'Target physics practice by course, unit, topic, question type, and difficulty.',
    },
    homework: {
      title: 'Physics Homework',
      description: 'View assigned physics homework, submit work, and track completion from one student account.',
    },
    admin: {
      title: 'Teacher Dashboard',
      description: 'Pocket Cosmos teacher dashboard for assignments, practice records, and learner review.',
    },
  },
  zh: {
    home: {
      title: '口袋寰宇 | 系统化物理学习平台',
      description: '面向 AP、IGCSE、A Level、IB 与物理竞赛学生的系统化物理学习平台。',
    },
    curriculum: {
      title: '物理知识地图',
      description: '按课程、单元和知识点浏览物理知识地图、公式与课堂检查。',
    },
    practice: {
      title: '物理练习题库',
      description: '按课程体系、章节、题型与难度进行针对性物理训练。',
    },
    homework: {
      title: '物理作业',
      description: '集中查看物理作业、提交答案并同步学习进度。',
    },
    admin: {
      title: '教师后台',
      description: '查看作业、练习记录与学生学习情况。',
    },
  },
};

export const metadataFor = (tab: AppTab, language: AppLanguage): Metadata => {
  const copy = COPY[language][tab];
  const url = buildAppPath(tab, language);
  const alternateLanguage: AppLanguage = language === 'en' ? 'zh' : 'en';

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: {
        [language]: url,
        [alternateLanguage]: buildAppPath(tab, alternateLanguage),
        'x-default': buildAppPath(tab, 'en'),
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      siteName: 'Pocket Cosmos',
      images: ['/assets/pocket-cosmos-og.png'],
      locale: language === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
  };
};

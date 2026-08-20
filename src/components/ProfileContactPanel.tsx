'use client';

import { QrCode as SectionIcon } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { DotMatrixGraph } from './DotMatrixGraph';

interface ProfileContactPanelProps {
  compact?: boolean;
}

export function ProfileContactPanel({ compact = false }: ProfileContactPanelProps) {
  const { language } = useLanguage();

  const content = language === 'zh'
    ? {
        title: '创始人 Mike 老师',
        intro:
          '专注于国际初高中物理教学及国际物理竞赛教学。',
        contactTitle: '联系方式',
      }
    : {
        title: 'Founder Mike',
        intro:
          'Focused on international middle and high school physics teaching, as well as international physics competition training.',
        contactTitle: 'Contact',
      };

  return (
    <aside className={`glass-panel rounded-[24px] ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
      <div className="flex items-start gap-4">
        <img
          src="/assets/mike-wang-portrait.jpg"
          alt="Mike Wang portrait"
          className={`${compact ? 'h-20 w-20' : 'h-32 w-32'} rounded-2xl border border-line object-cover object-center`}
        />
        <div>
          <div className="text-lg font-semibold text-nebula">{content.title}</div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-ink-soft">{content.intro}</p>

      <div className="mt-4 rounded-2xl border border-line bg-surface p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <SectionIcon className="h-4 w-4 text-nebula" />
          {content.contactTitle}
        </div>
        <div className="mt-4">
          <DotMatrixGraph />
        </div>
      </div>
    </aside>
  );
}

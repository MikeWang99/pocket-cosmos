'use client';

import { MapPin, QrCode } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ProfileContactPanelProps {
  compact?: boolean;
}

export function ProfileContactPanel({ compact = false }: ProfileContactPanelProps) {
  const { language } = useLanguage();

  const content = language === 'zh'
    ? {
        title: 'Mike Wang',
        role: 'Physics Tutor',
        location: 'Haidian, Beijing',
        intro:
          '专注于 AP Physics、Physics C 与竞赛方向的物理教学。欢迎通过右侧二维码联系交流。',
        focusTitle: '教学方向',
        focuses: ['AP Physics 1', 'AP Physics C: Mechanics', 'AP Physics C: E&M', 'Physics Competition'],
        contactTitle: '联系方式',
        qrHint: '微信扫码即可联系',
      }
    : {
        title: 'Mike Wang',
        role: 'Physics Tutor',
        location: 'Haidian, Beijing',
        intro:
          'Focused on AP Physics, Physics C, and competition-oriented physics teaching. Feel free to connect through the WeChat QR code below.',
        focusTitle: 'Teaching Focus',
        focuses: ['AP Physics 1', 'AP Physics C: Mechanics', 'AP Physics C: E&M', 'Physics Competition'],
        contactTitle: 'Contact',
        qrHint: 'Scan the QR code to connect on WeChat',
      };

  return (
    <aside className={`glass-panel rounded-[24px] ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
      <div className="flex items-start gap-4">
        <img
          src="/assets/mike-wang-portrait.jpg"
          alt="Mike Wang portrait"
          className={`${compact ? 'h-20 w-20' : 'h-24 w-24'} rounded-2xl border border-line object-cover object-center`}
        />
        <div>
          <div className="text-lg font-semibold text-nebula">{content.title}</div>
          <div className="mt-1 text-sm font-medium text-ink">{content.role}</div>
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-muted">
            <MapPin className="h-3.5 w-3.5" />
            {content.location}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-ink-soft">{content.intro}</p>

      <div className="mt-4 rounded-2xl border border-line bg-surface p-4">
        <div className="text-sm font-semibold text-ink">{content.focusTitle}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {content.focuses.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line bg-surface-muted px-3 py-1.5 text-xs font-medium text-ink-soft"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-surface p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <QrCode className="h-4 w-4 text-nebula" />
          {content.contactTitle}
        </div>
        <img
          src="/assets/mike-wang-wechat-qr.jpg"
          alt="Mike Wang WeChat QR code"
          className="mx-auto mt-4 aspect-square w-full max-w-[230px] rounded-2xl border border-line bg-white object-contain"
        />
        <div className="mt-3 text-center text-xs leading-6 text-ink-muted">{content.qrHint}</div>
      </div>
    </aside>
  );
}

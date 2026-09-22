import React from 'react';
import { Download } from 'lucide-react';
import type { PracticeStep } from '../../types/practice';

export const QuestionMedia: React.FC<{
  step: PracticeStep;
  label: string;
  questionLabel: string;
}> = ({ step, label, questionLabel }) => {
  if (!step.image) return null;
  const isQuestionImage = step.image.role === 'question';

  return (
    <figure className={`practice-media ${isQuestionImage ? 'practice-media--question' : ''}`}>
      <div className="mb-3 text-[10px] uppercase tracking-widest text-slate-500">
        {isQuestionImage ? questionLabel : label}
      </div>
      <div className={isQuestionImage ? 'practice-question-image-scroll' : undefined}>
        <img
          src={step.image.src}
          alt={step.image.alt}
          className={`practice-media-image ${isQuestionImage ? 'practice-question-image' : ''} ${step.image.responsive ? 'practice-question-image--responsive' : ''}`}
        />
      </div>
      {step.image.caption && <figcaption>{step.image.caption}</figcaption>}
    </figure>
  );
};

export const SupportingQuestionImages: React.FC<{ step: PracticeStep; label: string }> = ({
  step,
  label,
}) => {
  if (!step.supportingImages?.length) return null;

  return (
    <div className="grid gap-4">
      {step.supportingImages.map((figure, index) => (
        <figure key={`${figure.src}-${index}`} className="practice-media practice-media--question">
          {index === 0 && (
            <div className="mb-3 text-[10px] uppercase tracking-widest text-slate-500">{label}</div>
          )}
          <div className="practice-question-image-scroll">
            <img
              src={figure.src}
              alt={figure.alt}
              className="practice-media-image practice-question-image practice-question-image--responsive"
            />
          </div>
          {figure.caption && <figcaption>{figure.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
};

export const QuestionAssetDownloads: React.FC<{
  step: PracticeStep;
  language: 'en' | 'zh';
}> = ({ step, language }) => {
  if (!step.assets?.length) return null;

  return (
    <details className="mt-1">
      <summary className="inline-flex min-h-9 w-fit cursor-pointer list-none items-center gap-2 rounded-full border border-line bg-surface-tint px-3 py-1.5 text-[11px] font-semibold text-ink-soft transition-colors hover:border-nebula/40 hover:text-nebula">
        <Download className="h-3.5 w-3.5" />
        {language === 'zh'
          ? `下载题目素材 (${step.assets.length})`
          : `Download assets (${step.assets.length})`}
      </summary>
      <div className="mt-2 grid gap-2 rounded-lg border border-line bg-surface-muted p-3 sm:grid-cols-2 xl:grid-cols-3">
        {step.assets.map((asset) => (
          <a
            key={asset.id}
            href={asset.src}
            download={asset.downloadName}
            className="flex min-h-10 items-center gap-2 rounded-md border border-line bg-surface-muted px-3 py-2 text-xs text-ink-soft transition-colors hover:border-nebula/45 hover:text-nebula"
          >
            <Download className="h-3.5 w-3.5 shrink-0" />
            <span className="min-w-0 truncate">{asset.downloadName}</span>
            <span className="ml-auto shrink-0 text-[9px] uppercase tracking-wider text-slate-600">
              {asset.kind}
            </span>
          </a>
        ))}
      </div>
    </details>
  );
};

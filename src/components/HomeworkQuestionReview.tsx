import React from 'react';
import katex from 'katex';
import {
  Check,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FileText,
  ImageIcon,
} from 'lucide-react';
import type { HomeworkAttempt } from '../homework/types';
import type { PracticeStep } from '../types/practice';

const renderMath = (value: string) =>
  katex.renderToString(value, { throwOnError: false, strict: false });

const MathText: React.FC<{ children: string }> = ({ children }) => {
  const parts = children.split(/(\$[^$]+\$|\\\([^)]+\\\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        const dollar = part.startsWith('$') && part.endsWith('$');
        const paren = part.startsWith('\\(') && part.endsWith('\\)');
        if (!dollar && !paren) return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
        const expression = dollar ? part.slice(1, -1) : part.slice(2, -2);
        return (
          <span
            key={`${part}-${index}`}
            className="math-inline"
            dangerouslySetInnerHTML={{ __html: renderMath(expression) }}
          />
        );
      })}
    </>
  );
};

const formatSubmitted = (value: string, language: 'en' | 'zh') =>
  new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

interface HomeworkQuestionReviewProps {
  step: PracticeStep;
  attempt?: HomeworkAttempt;
  questionNumber: number;
  total: number;
  setLabel: string;
  language: 'en' | 'zh';
}

export const HomeworkQuestionReview: React.FC<HomeworkQuestionReviewProps> = ({
  step,
  attempt,
  questionNumber,
  total,
  setLabel,
  language,
}) => {
  const selectedAnswers = new Set((attempt?.answer ?? '').split(',').filter(Boolean));
  const correctAnswers = new Set((step.correctAnswer ?? '').split(',').filter(Boolean));
  const multipleChoice = Boolean(step.choices?.length);
  const hideDuplicatePrompt =
    step.image?.role === 'question' && step.prompt.startsWith('Select the correct option');
  const feedback = attempt
    ? [
        ...attempt.result.misses.map((miss) => ({
          id: miss.id,
          label: miss.label,
          detail: miss.feedback,
        })),
        ...attempt.result.suggestions
          .filter((suggestion) => Boolean(suggestion) && suggestion !== step.solution)
          .map((suggestion, index) => ({
            id: `suggestion-${index}`,
            label: language === 'zh' ? '建议回顾' : 'Review focus',
            detail: suggestion,
          })),
      ]
    : [];

  return (
    <section className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.025]">
      <header className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-nebula">
            {setLabel} · {language === 'zh' ? `第 ${questionNumber} 题` : `Question ${questionNumber}`} / {total}
          </div>
          <h4 className="mt-1.5 text-lg font-semibold leading-6 text-white">{step.title}</h4>
          {!!step.tags?.length && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {step.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-slate-500">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {attempt ? (
          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                attempt.isCorrect
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
              }`}
            >
              {attempt.isCorrect ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleAlert className="h-3.5 w-3.5" />}
              {attempt.isCorrect
                ? language === 'zh' ? '正确' : 'Correct'
                : language === 'zh' ? '错误' : 'Incorrect'}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300">
              {attempt.score}/{attempt.maxScore}
            </span>
          </div>
        ) : (
          <span className="w-fit shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-500">
            {language === 'zh' ? '未作答' : 'Not answered'}
          </span>
        )}
      </header>

      <div className="grid xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
        <div className="border-b border-white/10 p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            {language === 'zh' ? '原题' : 'Original question'}
          </div>

          {!hideDuplicatePrompt && step.prompt && (
            <div className="text-[15px] leading-7 text-starlight">
              <MathText>{step.prompt}</MathText>
            </div>
          )}

          {!!step.equations?.length && (
            <div className="mt-3 space-y-2 rounded-lg border border-white/10 bg-white/[0.025] p-3">
              {step.equations.map((equation) => (
                <div key={equation} className="text-sm text-slate-200">
                  <MathText>{equation}</MathText>
                </div>
              ))}
            </div>
          )}

          {step.image && (
            <figure className="practice-media practice-media--question mt-4">
              <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500">
                <ImageIcon className="h-3.5 w-3.5" />
                {language === 'zh' ? '题目图片' : 'Question image'}
              </div>
              <div className="practice-question-image-scroll">
                <img
                  src={step.image.src}
                  alt={step.image.alt}
                  className={`practice-media-image practice-question-image ${step.image.responsive ? 'practice-question-image--responsive' : ''}`}
                />
              </div>
              {step.image.caption && <figcaption>{step.image.caption}</figcaption>}
            </figure>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {language === 'zh' ? '答案回看' : 'Answer review'}
            </div>
            {attempt && (
              <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-500">
                <Clock3 className="h-3.5 w-3.5" />
                {formatSubmitted(attempt.updatedAt, language)}
              </div>
            )}
          </div>

          {multipleChoice ? (
            <div className="space-y-2">
              {step.choices?.map((choice) => {
                const studentSelected = selectedAnswers.has(choice.label);
                const correctChoice = correctAnswers.has(choice.label);
                return (
                  <div
                    key={choice.label}
                    className={`grid grid-cols-[34px_minmax(0,1fr)] gap-2.5 rounded-lg border p-2.5 ${
                      correctChoice
                        ? 'border-emerald-500/45 bg-emerald-500/10'
                        : studentSelected
                          ? 'border-rose-500/45 bg-rose-500/10'
                          : 'border-white/8 bg-black/15'
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-md text-xs font-bold ${
                        correctChoice
                          ? 'bg-emerald-400 text-black'
                          : studentSelected
                            ? 'bg-rose-400 text-black'
                            : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {studentSelected ? <Check className="h-4 w-4" /> : choice.label}
                    </span>
                    <div className="min-w-0 self-center">
                      <div className="text-sm leading-6 text-slate-200">
                        {choice.image ? (
                          <>
                            <img src={choice.image.src} alt={choice.image.alt} className="practice-choice-image" />
                            <span className="sr-only">{choice.text}</span>
                          </>
                        ) : choice.text ? <MathText>{choice.text}</MathText> : `${language === 'zh' ? '选项' : 'Option'} ${choice.label}`}
                      </div>
                      {(studentSelected || correctChoice) && (
                        <div className={`mt-1 text-[10px] font-semibold ${correctChoice ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {studentSelected && correctChoice
                            ? language === 'zh' ? '学生选择 · 正确答案' : 'Student selected · Correct answer'
                            : correctChoice
                              ? language === 'zh' ? '正确答案' : 'Correct answer'
                              : language === 'zh' ? '学生选择' : 'Student selected'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="text-[10px] uppercase tracking-widest text-slate-500">
                {language === 'zh' ? '学生答案' : 'Student answer'}
              </div>
              <div className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-200">
                {attempt?.answer || (language === 'zh' ? '未保存文字答案' : 'No written answer saved')}
              </div>
            </div>
          )}

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-white/8 bg-white/[0.025] p-2.5">
              <div className="text-[9px] uppercase tracking-widest text-slate-600">{language === 'zh' ? '学生答案' : 'Student'}</div>
              <div className="mt-1 break-words text-sm font-semibold text-slate-200">{attempt?.answer || '—'}</div>
            </div>
            <div className="rounded-lg border border-white/8 bg-white/[0.025] p-2.5">
              <div className="text-[9px] uppercase tracking-widest text-slate-600">{language === 'zh' ? '正确答案' : 'Correct'}</div>
              <div className="mt-1 break-words text-sm font-semibold text-emerald-300">{step.correctAnswer || '—'}</div>
            </div>
            <div className="rounded-lg border border-white/8 bg-white/[0.025] p-2.5">
              <div className="text-[9px] uppercase tracking-widest text-slate-600">{language === 'zh' ? '得分' : 'Score'}</div>
              <div className="mt-1 text-sm font-semibold text-slate-200">
                {attempt ? `${attempt.score}/${attempt.maxScore}` : '—'}
              </div>
            </div>
          </div>

          {attempt && !attempt.isCorrect && feedback.length > 0 && (
            <div className="mt-3 rounded-lg border border-amber-400/20 bg-amber-400/[0.06] p-3">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-amber-300/80">
                <CircleAlert className="h-3.5 w-3.5" />
                {language === 'zh' ? '错误点与讲解重点' : 'Error and teaching focus'}
              </div>
              <div className="mt-2 space-y-2">
                {feedback.map((item) => (
                  <div key={item.id} className="text-xs leading-5 text-slate-300">
                    <span className="font-semibold text-amber-200">{item.label}</span>
                    {item.detail && <span className="text-slate-400"> — <MathText>{item.detail}</MathText></span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(step.sampleAnswer || step.solution) && (
            <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                <FileText className="h-3.5 w-3.5" />
                {language === 'zh' ? '答案与解析' : 'Answer and explanation'}
              </div>
              {step.sampleAnswer && (
                <div className="mt-2 text-sm leading-6 text-slate-200">
                  <MathText>{step.sampleAnswer}</MathText>
                </div>
              )}
              {step.solution && (
                <div className={`${step.sampleAnswer ? 'mt-2 border-t border-white/5 pt-2' : 'mt-2'} text-sm leading-6 text-slate-400`}>
                  <MathText>{step.solution}</MathText>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

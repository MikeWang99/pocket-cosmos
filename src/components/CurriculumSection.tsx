import React, { useMemo, useState } from 'react';
import katex from 'katex';
import { BookOpenCheck, ChevronDown, ExternalLink, FunctionSquare, Image as ImageIcon, Layers3, ListChecks, NotebookText } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { learningSystems, type LearningSystemId } from '../data/physicsLearningSystems';
import type { CurriculumClassroomQuestion, CurriculumDiagram, CurriculumVideo } from '../data/apPhysicsCurriculum';

const renderMath = (value: string, displayMode = true) =>
  katex.renderToString(value, {
    throwOnError: false,
    strict: false,
    displayMode,
  });

const MathBlock: React.FC<{ value: string }> = ({ value }) => (
  <div
    className="curriculum-formula"
    dangerouslySetInnerHTML={{ __html: renderMath(value) }}
  />
);

const InlineMathText: React.FC<{ children: string }> = ({ children }) => {
  const parts = children.split(/(\$[^$]+\$|\\\([^)]+\\\))/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        const isDollarMath = part.startsWith('$') && part.endsWith('$');
        const isParenMath = part.startsWith('\\(') && part.endsWith('\\)');

        if (!isDollarMath && !isParenMath) {
          return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
        }

        const expression = isDollarMath ? part.slice(1, -1) : part.slice(2, -2);
        return (
          <span
            key={`${part}-${index}`}
            className="math-inline"
            dangerouslySetInnerHTML={{ __html: renderMath(expression, false) }}
          />
        );
      })}
    </>
  );
};

const LessonVideo: React.FC<{ video: CurriculumVideo; language: 'en' | 'zh' }> = ({ video, language }) => (
  <figure className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
    <div className="aspect-video w-full bg-slate-100">
      <iframe
        className="h-full w-full"
        src={video.embedUrl}
        title={video.title[language]}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
    <figcaption className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-xs text-slate-500">
      <span className="font-medium text-slate-700">{video.title[language]}</span>
      <a
        href={video.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 font-semibold text-nebula hover:text-nebula-dark"
      >
        {video.sourceLabel[language]}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </figcaption>
  </figure>
);

const ClassroomQuestionCard: React.FC<{ question: CurriculumClassroomQuestion; language: 'en' | 'zh' }> = ({ question, language }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checkedAnswer, setCheckedAnswer] = useState('');
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const isWrittenQuestion = question.mode === 'written';
  const hasChecked = Boolean(checkedAnswer);
  const isCorrect = Boolean(question.correctAnswer) && checkedAnswer === question.correctAnswer;

  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
      <div className="mb-3 flex items-center gap-2 text-nebula">
        <ListChecks className="h-4 w-4" />
        <h6 className="text-sm font-semibold text-slate-900">{question.title[language]}</h6>
      </div>

      <p className="text-sm leading-7 text-slate-700">
        <InlineMathText>{question.prompt[language]}</InlineMathText>
      </p>

      {question.image && (
        <figure className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-[#ffffff]">
          <img src={question.image.src} alt={question.image.alt} className="w-full object-contain" />
          {question.image.caption && (
            <figcaption className="border-t border-slate-200 px-3 py-2 text-xs text-slate-500">
              {question.image.caption[language]}
            </figcaption>
          )}
        </figure>
      )}

      {isWrittenQuestion ? (
        <>
          <textarea
            value={writtenAnswer}
            onChange={(event) => setWrittenAnswer(event.target.value)}
            className="mt-4 min-h-32 w-full rounded-lg border border-slate-200 bg-[#ffffff] p-3 text-sm leading-6 text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-nebula/60"
            placeholder={language === 'zh' ? '在这里写下你的实验设计思路。' : 'Write your experimental design here.'}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowSampleAnswer((current) => !current)}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-nebula/30 bg-[#ffffff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-nebula transition-colors hover:border-nebula/60 hover:bg-nebula/5"
            >
              {showSampleAnswer
                ? language === 'zh' ? '收起答案' : 'Hide answer'
                : language === 'zh' ? '露出答案' : 'Reveal answer'}
            </button>
            <button
              type="button"
              onClick={() => setShowExplanation((current) => !current)}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-300 bg-[#ffffff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors hover:border-nebula/60 hover:text-nebula"
            >
              {showExplanation
                ? language === 'zh' ? '收起解析' : 'Hide explanation'
                : language === 'zh' ? '解析' : 'Explanation'}
            </button>
          </div>

          {showSampleAnswer && question.sampleAnswer && (
            <div className="mt-4 rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3 text-sm leading-6 text-slate-700">
              <div className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-800">
                {language === 'zh' ? '参考答案' : 'Sample answer'}
              </div>
              <InlineMathText>{question.sampleAnswer[language]}</InlineMathText>
            </div>
          )}

          {showExplanation && question.explanation && (
            <div className="mt-4 rounded-lg border border-nebula/20 bg-nebula/5 p-3 text-sm leading-6 text-slate-700">
              <div className="mb-1 text-xs font-bold uppercase tracking-widest text-nebula">
                {language === 'zh' ? '解析' : 'Explanation'}
              </div>
              <InlineMathText>{question.explanation[language]}</InlineMathText>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mt-4 grid gap-2" role="radiogroup" aria-label={question.title[language]}>
            {question.choices?.map((choice) => {
              const isSelected = selectedAnswer === choice.label;
              const isCorrectChoice = hasChecked && choice.label === question.correctAnswer;
              const isWrongChoice = hasChecked && isSelected && choice.label !== question.correctAnswer;

              return (
                <button
                  key={choice.label}
                  type="button"
                  onClick={() => {
                    if (!hasChecked) setSelectedAnswer(choice.label);
                  }}
                  aria-pressed={isSelected}
                  className={`grid grid-cols-[32px_minmax(0,1fr)] gap-3 rounded-lg border p-3 text-left transition-colors ${
                    isCorrectChoice
                      ? 'border-emerald-500/45 bg-emerald-500/10'
                      : isWrongChoice
                        ? 'border-rose-500/45 bg-rose-500/10'
                        : isSelected
                          ? 'border-nebula/60 bg-nebula/10'
                          : 'border-slate-200 bg-[#ffffff] hover:border-nebula/50'
                  }`}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {choice.label}
                  </span>
                  <span className="self-center text-sm leading-6 text-slate-700">
                    <InlineMathText>{choice.text[language]}</InlineMathText>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setCheckedAnswer(selectedAnswer)}
              disabled={!selectedAnswer || hasChecked}
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-nebula disabled:opacity-35"
            >
              {language === 'zh' ? '检查答案' : 'Check answer'}
            </button>
            {hasChecked && (
              <button
                type="button"
                onClick={() => {
                  setSelectedAnswer('');
                  setCheckedAnswer('');
                }}
                className="text-left text-xs font-semibold text-slate-500 transition-colors hover:text-nebula sm:text-right"
              >
                {language === 'zh' ? '重做本题' : 'Try again'}
              </button>
            )}
          </div>

          {hasChecked && question.feedback && (
            <div className={`mt-4 rounded-lg border p-3 text-sm leading-6 ${
              isCorrect
                ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-800'
                : 'border-amber-500/25 bg-amber-500/10 text-slate-700'
            }`}>
              <div className="mb-1 text-xs font-bold uppercase tracking-widest">
                {isCorrect
                  ? language === 'zh' ? '正确' : 'Correct'
                  : language === 'zh' ? `再想一下，正确答案是 ${question.correctAnswer}` : `Not quite. The correct answer is ${question.correctAnswer}`}
              </div>
              <InlineMathText>{question.feedback[language]}</InlineMathText>
            </div>
          )}
        </>
      )}
    </article>
  );
};

const ConceptDiagram: React.FC<{ diagram: CurriculumDiagram; language: 'en' | 'zh' }> = ({ diagram, language }) => {
  const stroke = '#4f46e5';
  const muted = '#94a3b8';
  const fill = '#eef2ff';
  const accent = '#0891b2';

  const content = (() => {
    switch (diagram.kind) {
      case 'motion-graph':
        return (
          <>
            <polyline points="42,132 90,116 136,78 190,44 236,36" fill="none" stroke={stroke} strokeWidth="4" />
            <line x1="38" y1="142" x2="244" y2="142" stroke={muted} strokeWidth="2" />
            <line x1="42" y1="146" x2="42" y2="28" stroke={muted} strokeWidth="2" />
            <text x="230" y="160">t</text>
            <text x="24" y="38">v</text>
          </>
        );
      case 'free-body':
        return (
          <>
            <rect x="108" y="70" width="64" height="46" rx="6" fill={fill} stroke={stroke} strokeWidth="3" />
            <line x1="140" y1="70" x2="140" y2="28" stroke={stroke} strokeWidth="3" markerEnd="url(#arrow)" />
            <line x1="140" y1="116" x2="140" y2="158" stroke={stroke} strokeWidth="3" markerEnd="url(#arrow)" />
            <line x1="108" y1="93" x2="58" y2="93" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
            <line x1="172" y1="93" x2="222" y2="93" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="148" y="44">N</text><text x="148" y="156">mg</text><text x="214" y="84">F</text>
          </>
        );
      case 'energy-bar':
        return (
          <>
            {[0, 1, 2].map((index) => (
              <rect key={index} x={62 + index * 58} y={52 + index * 18} width="34" height={90 - index * 18} fill={index === 1 ? accent : stroke} opacity="0.85" rx="5" />
            ))}
            <line x1="42" y1="142" x2="236" y2="142" stroke={muted} strokeWidth="2" />
            <text x="65" y="164">K</text><text x="124" y="164">U</text><text x="179" y="164">W</text>
          </>
        );
      case 'collision':
        return (
          <>
            <circle cx="82" cy="92" r="26" fill={fill} stroke={stroke} strokeWidth="3" />
            <circle cx="184" cy="92" r="34" fill="#ecfeff" stroke={accent} strokeWidth="3" />
            <line x1="24" y1="92" x2="52" y2="92" stroke={stroke} strokeWidth="3" markerEnd="url(#arrow)" />
            <line x1="150" y1="92" x2="116" y2="92" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="66" y="98">m</text><text x="174" y="98">M</text>
          </>
        );
      case 'rotation':
        return (
          <>
            <circle cx="138" cy="94" r="50" fill="none" stroke={muted} strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="138" cy="94" r="6" fill={stroke} />
            <line x1="138" y1="94" x2="202" y2="58" stroke={stroke} strokeWidth="4" />
            <line x1="202" y1="58" x2="230" y2="24" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="168" y="86">r</text><text x="226" y="44">F</text>
          </>
        );
      case 'oscillation':
        return (
          <>
            <path d="M32 96 C58 36 84 36 110 96 S162 156 188 96 S240 36 260 96" fill="none" stroke={stroke} strokeWidth="4" />
            <line x1="28" y1="96" x2="260" y2="96" stroke={muted} strokeWidth="2" />
            <text x="128" y="36">A</text><text x="238" y="116">t</text>
          </>
        );
      case 'fluid-flow':
        return (
          <>
            <path d="M30 70 H104 C126 70 126 116 104 116 H30 Z" fill={fill} stroke={stroke} strokeWidth="3" />
            <path d="M104 82 H176 C192 82 192 104 176 104 H104 Z" fill="#ecfeff" stroke={accent} strokeWidth="3" />
            <path d="M176 70 H250 V116 H176 C198 116 198 70 176 70 Z" fill={fill} stroke={stroke} strokeWidth="3" />
            <line x1="48" y1="93" x2="230" y2="93" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
          </>
        );
      case 'gas-cycle':
        return (
          <>
            <path d="M84 126 L84 58 L184 58 L214 126 Z" fill="none" stroke={stroke} strokeWidth="4" />
            <line x1="48" y1="142" x2="238" y2="142" stroke={muted} strokeWidth="2" />
            <line x1="58" y1="148" x2="58" y2="32" stroke={muted} strokeWidth="2" />
            <text x="226" y="160">V</text><text x="38" y="42">P</text>
          </>
        );
      case 'electric-field':
      case 'gauss-surface':
        return (
          <>
            <circle cx="82" cy="92" r="18" fill={fill} stroke={stroke} strokeWidth="3" />
            <text x="76" y="99">+</text>
            {[38, 62, 92, 122, 146].map((y) => (
              <line key={y} x1="112" y1={y} x2="230" y2={y} stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
            ))}
            {diagram.kind === 'gauss-surface' && <ellipse cx="82" cy="92" rx="54" ry="70" fill="none" stroke={muted} strokeWidth="2" strokeDasharray="6 6" />}
          </>
        );
      case 'circuit':
        return (
          <>
            <path d="M58 60 H206 V130 H58 Z" fill="none" stroke={stroke} strokeWidth="4" />
            <line x1="82" y1="60" x2="82" y2="38" stroke={stroke} strokeWidth="4" />
            <line x1="96" y1="60" x2="96" y2="30" stroke={stroke} strokeWidth="4" />
            <path d="M132 130 l8 -12 l8 24 l8 -24 l8 24 l8 -24 l8 12" fill="none" stroke={accent} strokeWidth="3" />
            <text x="182" y="93">R</text>
          </>
        );
      case 'magnetic-force':
        return (
          <>
            {[60, 96, 132, 168, 204].map((x) => <text key={x} x={x} y="62" fill={muted}>×</text>)}
            {[60, 96, 132, 168, 204].map((x) => <text key={x} x={x} y="124" fill={muted}>×</text>)}
            <line x1="70" y1="94" x2="170" y2="94" stroke={stroke} strokeWidth="4" markerEnd="url(#arrow)" />
            <line x1="170" y1="94" x2="170" y2="42" stroke={accent} strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="112" y="86">v</text><text x="178" y="58">F</text>
          </>
        );
      case 'ray-optics':
        return (
          <>
            <line x1="138" y1="28" x2="138" y2="154" stroke={stroke} strokeWidth="4" />
            <line x1="42" y1="92" x2="238" y2="92" stroke={muted} strokeWidth="2" />
            <line x1="58" y1="56" x2="138" y2="92" stroke={accent} strokeWidth="3" />
            <line x1="138" y1="92" x2="224" y2="122" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
            <line x1="58" y1="128" x2="138" y2="92" stroke={accent} strokeWidth="3" />
            <line x1="138" y1="92" x2="224" y2="62" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
          </>
        );
      case 'energy-levels':
        return (
          <>
            {[132, 102, 76, 48].map((y, index) => <line key={y} x1="64" y1={y} x2="206" y2={y} stroke={index === 0 ? muted : stroke} strokeWidth="3" />)}
            <line x1="132" y1="102" x2="132" y2="54" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
            <path d="M150 84 q20 -18 42 0 q18 16 38 0" fill="none" stroke={accent} strokeWidth="3" />
            <text x="116" y="76">hf</text>
          </>
        );
      case 'spacetime':
        return (
          <>
            <line x1="54" y1="142" x2="230" y2="142" stroke={muted} strokeWidth="2" />
            <line x1="72" y1="154" x2="72" y2="28" stroke={muted} strokeWidth="2" />
            <line x1="72" y1="142" x2="190" y2="44" stroke={stroke} strokeWidth="3" />
            <line x1="72" y1="142" x2="142" y2="34" stroke={accent} strokeWidth="3" strokeDasharray="6 6" />
            <circle cx="154" cy="74" r="6" fill={stroke} />
          </>
        );
      case 'orbit-star':
        return (
          <>
            <circle cx="140" cy="92" r="18" fill="#fde68a" stroke="#b45309" strokeWidth="3" />
            <ellipse cx="140" cy="92" rx="88" ry="48" fill="none" stroke={stroke} strokeWidth="3" />
            <circle cx="214" cy="118" r="8" fill={accent} />
            <line x1="214" y1="118" x2="182" y2="108" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
          </>
        );
      case 'greenhouse':
        return (
          <>
            <path d="M54 126 Q140 56 226 126" fill="none" stroke={stroke} strokeWidth="4" />
            <line x1="76" y1="42" x2="112" y2="98" stroke="#f59e0b" strokeWidth="4" markerEnd="url(#arrow)" />
            <path d="M142 120 C154 88 180 86 192 62" fill="none" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
            <path d="M190 62 C174 80 154 80 140 108" fill="none" stroke={accent} strokeWidth="3" markerEnd="url(#arrow)" />
          </>
        );
      case 'material-graph':
        return (
          <>
            <path d="M54 136 C96 112 120 68 154 58 C188 50 210 70 230 102" fill="none" stroke={stroke} strokeWidth="4" />
            <line x1="44" y1="142" x2="244" y2="142" stroke={muted} strokeWidth="2" />
            <line x1="54" y1="148" x2="54" y2="32" stroke={muted} strokeWidth="2" />
            <text x="226" y="160">x</text><text x="34" y="42">F</text>
          </>
        );
      default:
        return (
          <>
            <path d="M50 126 C92 42 182 42 224 126" fill="none" stroke={stroke} strokeWidth="4" />
            <circle cx="138" cy="88" r="24" fill={fill} stroke={accent} strokeWidth="3" />
          </>
        );
    }
  })();

  return (
    <figure className="rounded-lg border border-slate-200 bg-[#ffffff] p-3 sm:p-4">
      <svg viewBox="0 0 280 180" className="h-36 w-full text-[14px] font-semibold text-slate-700 sm:h-44" role="img" aria-label={diagram.title[language]}>
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 z" fill={accent} />
          </marker>
        </defs>
        {content}
      </svg>
      <figcaption>
        <span className="block text-sm font-semibold text-slate-800">{diagram.title[language]}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-500">{diagram.caption[language]}</span>
      </figcaption>
    </figure>
  );
};

export const CurriculumSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [systemId, setSystemId] = useState<LearningSystemId>('ap');
  const selectedSystem = learningSystems.find((item) => item.id === systemId) ?? learningSystems[0];
  const [courseId, setCourseId] = useState(selectedSystem.courses[0]?.id ?? '');
  const course = selectedSystem.courses.find((item) => item.id === courseId) ?? selectedSystem.courses[0];
  const [openUnits, setOpenUnits] = useState<Set<number>>(() => new Set([course?.units[0]?.number ?? 1]));

  const topicCount = useMemo(
    () => course?.units.reduce((total, unit) => total + unit.topics.length, 0) ?? 0,
    [course],
  );

  const selectSystem = (id: LearningSystemId) => {
    const nextSystem = learningSystems.find((item) => item.id === id) ?? learningSystems[0];
    const nextCourse = nextSystem.courses[0];
    setSystemId(id);
    setCourseId(nextCourse?.id ?? '');
    setOpenUnits(new Set(nextCourse?.units[0] ? [nextCourse.units[0].number] : []));
  };

  const selectCourse = (id: string) => {
    const nextCourse = selectedSystem.courses.find((item) => item.id === id);
    setCourseId(id);
    setOpenUnits(new Set(nextCourse?.units[0] ? [nextCourse.units[0].number] : []));
  };

  const toggleUnit = (number: number) => {
    setOpenUnits((current) => {
      const next = new Set(current);
      if (next.has(number)) next.delete(number);
      else next.add(number);
      return next;
    });
  };

  const allOpen = !!course && openUnits.size === course.units.length;
  const toggleAll = () => {
    if (!course) return;
    setOpenUnits(allOpen ? new Set() : new Set(course.units.map((unit) => unit.number)));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 sm:space-y-8"
    >
      <div className="max-w-3xl">
        <div className="mb-4 flex items-center gap-2 text-nebula">
          <BookOpenCheck className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">{t.curriculum.sectionLabel}</span>
        </div>
        <h2 className="text-balance text-3xl font-light md:text-4xl">{t.curriculum.title}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">{t.curriculum.description}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" role="tablist" aria-label={t.curriculum.systemSelector}>
        {learningSystems.map((system) => {
          const active = system.id === systemId;
          return (
            <button
              key={system.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectSystem(system.id)}
              className={`min-h-24 rounded-lg border px-4 py-4 text-left transition-colors sm:min-h-28 ${
                active
                  ? 'border-nebula bg-white/10 text-nebula'
                  : 'border-white/10 bg-white/5 text-slate-600 hover:border-white/30 hover:text-starlight'
              }`}
            >
              <span className="block text-sm font-semibold leading-5">{system.label[language]}</span>
              <span className="mt-2 block text-xs leading-5 opacity-70">{system.description[language]}</span>
              <span className="mt-3 inline-flex rounded-full border border-nebula/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-nebula">
                {system.status[language]}
              </span>
            </button>
          );
        })}
      </div>

      {!course ? (
        <div className="rounded-lg border border-slate-200 bg-[#ffffff] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-nebula">{selectedSystem.status[language]}</p>
          <h3 className="mt-3 text-xl font-semibold">{selectedSystem.label[language]}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{selectedSystem.sourceNote[language]}</p>
        </div>
      ) : (
        <>
          {selectedSystem.courses.length > 1 && (
            <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label={t.curriculum.courseSelector}>
              {selectedSystem.courses.map((item) => {
                const active = item.id === course.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectCourse(item.id)}
                    className={`min-h-14 rounded-lg border px-3 py-3 text-left transition-colors sm:min-h-16 ${
                      active
                        ? 'border-nebula bg-white/10 text-nebula'
                        : 'border-white/10 bg-white/5 text-slate-600 hover:border-white/30 hover:text-starlight'
                    }`}
                  >
                    <span className="block text-sm font-semibold leading-5">{item.name[language]}</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-wider opacity-60">{item.level[language]}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-widest text-nebula">{course.level[language]}</p>
              <h3 className="mt-2 text-balance text-2xl font-semibold">{course.name[language]}</h3>
              <p className="mt-2 text-sm text-slate-500">
                {course.units.length} {t.curriculum.units} · {topicCount} {t.curriculum.topics}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
              <button
                type="button"
                onClick={toggleAll}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-600 transition-colors hover:border-white/30 hover:text-nebula"
              >
                <Layers3 className="h-4 w-4" />
                {allOpen ? t.curriculum.collapseAll : t.curriculum.expandAll}
              </button>
              <a
                href={course.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-600 transition-colors hover:border-white/30 hover:text-nebula"
              >
                {course.sourceLabel?.[language] ?? t.curriculum.officialSource}
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
                    className="group flex w-full items-center gap-3 py-4 text-left sm:gap-4 sm:py-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-nebula sm:h-10 sm:w-10">
                      {unit.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {t.curriculum.unit} {unit.number}
                      </span>
                      <span className="mt-1 block text-base font-semibold leading-6 transition-colors group-hover:text-nebula md:text-lg">
                        {unit.title[language]}
                      </span>
                    </span>
                    <span className="hidden text-xs text-slate-500 md:block">
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
                      <div className="pb-6 sm:pb-7 md:pl-14">
                        {unit.summary && <p className="mb-5 max-w-3xl text-sm leading-7 text-slate-600">{unit.summary[language]}</p>}

                        <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                          <section className="rounded-lg border border-slate-200 bg-[#ffffff] p-4">
                            <div className="mb-3 flex items-center gap-2 text-nebula">
                              <ListChecks className="h-4 w-4" />
                              <h4 className="text-sm font-semibold">{t.curriculum.focusTitle}</h4>
                            </div>
                            <ul className="space-y-2">
                              {(unit.focus ?? []).map((item) => (
                                <li key={item.en} className="flex gap-2 text-sm leading-6 text-slate-600">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nebula" />
                                  <span>{item[language]}</span>
                                </li>
                              ))}
                            </ul>
                          </section>

                          <section className="rounded-lg border border-slate-200 bg-[#ffffff] p-4">
                            <div className="mb-3 flex items-center gap-2 text-nebula">
                              <ListChecks className="h-4 w-4" />
                              <h4 className="text-sm font-semibold">{t.curriculum.checklistTitle}</h4>
                            </div>
                            <div className="grid gap-2 min-[520px]:grid-cols-2">
                              {unit.topics.map((item) => (
                                <div key={item.id} className="flex min-h-12 items-start gap-3 rounded-md bg-slate-50 px-3 py-2">
                                  <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-nebula">{item.id}</span>
                                  <span className="text-sm leading-5 text-slate-600">{item.title[language]}</span>
                                </div>
                              ))}
                            </div>
                          </section>
                        </div>

                        {!!unit.lessons?.length && (
                          <section className="mt-4 rounded-lg border border-slate-200 bg-[#ffffff] p-3 sm:p-4">
                            <div className="mb-3 flex items-center gap-2 text-nebula">
                              <NotebookText className="h-4 w-4" />
                              <h4 className="text-sm font-semibold">{t.curriculum.lessonsTitle}</h4>
                            </div>
                            <div className="space-y-4">
                              {unit.lessons.map((lesson) => (
                                <article key={lesson.title.en} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                  <h5 className="text-base font-semibold text-slate-900">{lesson.title[language]}</h5>
                                  <p className="mt-2 text-sm leading-6 text-slate-600">{lesson.description[language]}</p>

                                  <div className="mt-4 space-y-2">
                                    {lesson.sections.map((section, index) => (
                                      <details
                                        key={section.heading.en}
                                        open={index === 0}
                                        className="group rounded-lg border border-slate-200 bg-[#ffffff] px-3 py-2"
                                      >
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-sm font-semibold text-slate-800">
                                          <span>{section.heading[language]}</span>
                                          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                                        </summary>
                                        <div className="space-y-3 pb-2 pt-3">
                                          {section.videos?.map((video) => (
                                            <LessonVideo key={video.sourceUrl} video={video} language={language} />
                                          ))}
                                          {section.paragraphs?.map((paragraph) => (
                                            <p key={paragraph.en} className="text-sm leading-7 text-slate-600">
                                              <InlineMathText>{paragraph[language]}</InlineMathText>
                                            </p>
                                          ))}
                                          {section.classroomQuestions?.map((question) => (
                                            <ClassroomQuestionCard key={question.id} question={question} language={language} />
                                          ))}
                                          {!!section.bullets?.length && (
                                            <ul className="space-y-2">
                                              {section.bullets.map((item) => (
                                                <li key={item.en} className="flex gap-2 text-sm leading-6 text-slate-600">
                                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nebula" />
                                                  <span><InlineMathText>{item[language]}</InlineMathText></span>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                          {!!section.formulas?.length && (
                                            <div className="grid gap-3 lg:grid-cols-2">
                                              {section.formulas.map((item) => (
                                                <div key={`${item.label.en}-${item.expression}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                                                  <p className="text-xs font-semibold text-slate-600">{item.label[language]}</p>
                                                  <MathBlock value={item.expression} />
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                          {section.takeaway && (
                                            <div className="rounded-lg border border-nebula/15 bg-nebula/5 p-3 text-sm leading-6 text-slate-700">
                                              <InlineMathText>{section.takeaway[language]}</InlineMathText>
                                            </div>
                                          )}
                                        </div>
                                      </details>
                                    ))}
                                  </div>
                                </article>
                              ))}
                            </div>
                          </section>
                        )}

                        {!!unit.formulas?.length && (
                          <section className="mt-4 rounded-lg border border-slate-200 bg-[#ffffff] p-3 sm:p-4">
                            <div className="mb-3 flex items-center gap-2 text-nebula">
                              <FunctionSquare className="h-4 w-4" />
                              <h4 className="text-sm font-semibold">{t.curriculum.formulasTitle}</h4>
                            </div>
                            <div className="grid gap-3 lg:grid-cols-2">
                              {unit.formulas.map((item) => (
                                <div key={`${item.label.en}-${item.expression}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                                  <p className="text-xs font-semibold text-slate-600">{item.label[language]}</p>
                                  <MathBlock value={item.expression} />
                                  {item.note && <p className="mt-2 text-xs leading-5 text-slate-500">{item.note[language]}</p>}
                                </div>
                              ))}
                            </div>
                          </section>
                        )}

                        {!!unit.diagrams?.length && (
                          <section className="mt-4 rounded-lg border border-slate-200 bg-[#ffffff] p-3 sm:p-4">
                            <div className="mb-3 flex items-center gap-2 text-nebula">
                              <ImageIcon className="h-4 w-4" />
                              <h4 className="text-sm font-semibold">{t.curriculum.diagramsTitle}</h4>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                              {unit.diagrams.map((item) => (
                                <ConceptDiagram key={`${item.kind}-${item.title.en}`} diagram={item} language={language} />
                              ))}
                            </div>
                          </section>
                        )}
                      </div>
                    </motion.div>
                  )}
                </article>
              );
            })}
          </div>

          <p className="text-xs leading-5 text-slate-500">{selectedSystem.sourceNote[language]}</p>
        </>
      )}
    </motion.section>
  );
};

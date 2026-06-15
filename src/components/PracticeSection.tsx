import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Mic,
  RotateCcw,
  Sparkles,
  Square,
  Target,
} from 'lucide-react';
import { practiceSets } from '../data/practiceSets';
import type { EvaluationResult, PracticeStep } from '../types/practice';
import { evaluateLocally } from '../utils/rubricScoring';
import { useLanguage } from '../LanguageContext';

type SpeechRecognitionConstructor = new () => SpeechRecognition;

interface SpeechRecognitionEventResult {
  transcript: string;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<ArrayLike<SpeechRecognitionEventResult>>;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
    MathJax?: {
      typesetPromise?: (elements?: Element[]) => Promise<void>;
    };
  }
}

const superscripts: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '+': '⁺',
  '-': '⁻',
  '=': '⁼',
  '(': '⁽',
  ')': '⁾',
  n: 'ⁿ',
};

const subscripts: Record<string, string> = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
  '+': '₊',
  '-': '₋',
  '=': '₌',
  '(': '₍',
  ')': '₎',
};

const translateRun = (value: string, map: Record<string, string>) =>
  value
    .split('')
    .map((character) => map[character] ?? character)
    .join('');

const prettifyMath = (value: string) =>
  value
    .replace(/<=/g, '≤')
    .replace(/>=/g, '≥')
    .replace(/->/g, '→')
    .replace(/\bDelta\b/g, 'Δ')
    .replace(/\blambda0\b/g, 'λ₀')
    .replace(/\blambda\b/g, 'λ')
    .replace(/\btheta\b/g, 'θ')
    .replace(/\bomega\b/g, 'ω')
    .replace(/\balpha\b/g, 'α')
    .replace(/\bmu\b/g, 'μ')
    .replace(/\bintegral\b/g, '∫')
    .replace(/sqrt\(k\/m\)/g, '√(k/m)')
    .replace(/\bF_net\b/g, 'Fₙₑₜ')
    .replace(/\bFmax\b/g, 'Fₘₐₓ')
    .replace(/\bx_cm\b/g, 'x₍cm₎')
    .replace(/\bv_f\b/g, 'v₍f₎')
    .replace(/\bv0\b/g, 'v₀')
    .replace(/\bv1\b/g, 'v₁')
    .replace(/\bx0\b/g, 'x₀')
    .replace(/\bx1\b/g, 'x₁')
    .replace(/\ba0\b/g, 'a₀')
    .replace(/\bF0\b/g, 'F₀')
    .replace(/\^([0-9()+\-=n]+)/g, (_, run: string) => translateRun(run, superscripts))
    .replace(/_([0-9]+)/g, (_, run: string) => translateRun(run, subscripts));

const splitPromptParts = (prompt: string) => {
  const parts = prompt.split(/\s(?=[a-d]\.\s)/).filter(Boolean);
  return parts.length > 1 ? parts : [prompt];
};

const RichText: React.FC<{ children: string; className?: string }> = ({ children, className }) => (
  <span className={className}>{prettifyMath(children)}</span>
);

const MathText: React.FC<{ children: string; className?: string }> = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const isMultipleChoiceStep = (step: PracticeStep) =>
  step.mode === 'multiple_choice' && Boolean(step.choices?.length && step.correctAnswer);

const QuestionMedia: React.FC<{ step: PracticeStep; label: string }> = ({ step, label }) => {
  if (!step.image) return null;

  return (
    <figure className="practice-media">
      <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">{label}</div>
      <img src={step.image.src} alt={step.image.alt} className="practice-media-image" />
      {step.image.caption && <figcaption>{step.image.caption}</figcaption>}
    </figure>
  );
};

const EquationBlock: React.FC<{ equations?: string[]; label: string }> = ({ equations, label }) => {
  if (!equations?.length) return null;

  return (
    <div className="practice-equations">
      <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">{label}</div>
      <div className="space-y-2">
        {equations.map((equation) => (
          <div key={equation} className="practice-equation">
            {prettifyMath(equation)}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PracticeSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeSetId, setActiveSetId] = useState('kinematics-multiple-choice');
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, EvaluationResult>>({});
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const activeSet = practiceSets.find((set) => set.id === activeSetId) ?? practiceSets[0];
  const practiceSetMeta = activeSet;
  const getSetCopy = (setId: string) => {
    if (setId === 'calculus-for-physics') return t.practice.sets.calculusForPhysics;
    if (setId === 'frq-2025-mechanics') return t.practice.sets.frq2025;
    return t.practice.sets.kinematicsMultipleChoice;
  };
  const setCopy = getSetCopy(activeSet.id);
  const practiceSteps = activeSet.steps;
  const activeStep = practiceSteps[activeIndex];
  const isActiveMultipleChoice = isMultipleChoiceStep(activeStep);
  const currentAnswer = answers[activeStep.id] ?? '';
  const currentResult = results[activeStep.id];
  const completedCount = Object.keys(results).length;
  const resultList: EvaluationResult[] = Object.keys(results).map((key) => results[key]);

  const totalScore = useMemo(
    () => resultList.reduce((sum, result) => sum + result.score, 0),
    [resultList],
  );

  const totalPossible = useMemo(
    () => resultList.reduce((sum, result) => sum + result.maxScore, 0),
    [resultList],
  );

  const weakSpots = useMemo(() => {
    const missed = resultList.flatMap((result) => result.misses.map((item) => item.label));
    return missed.slice(0, 5);
  }, [resultList]);

  const speechSupported = typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  useEffect(() => {
    window.MathJax?.typesetPromise?.();
  }, [activeStep.id, currentAnswer, currentResult]);

  const updateAnswer = (value: string) => {
    setAnswers((previous) => ({ ...previous, [activeStep.id]: value }));
  };

  const submitAnswer = () => {
    if (isMultipleChoiceStep(activeStep)) {
      if (!currentAnswer) return;

      const isCorrect = currentAnswer === activeStep.correctAnswer;
      const selectedChoice = activeStep.choices?.find((choice) => choice.label === currentAnswer);
      const correctChoice = activeStep.choices?.find((choice) => choice.label === activeStep.correctAnswer);
      const hit = {
        id: `${activeStep.id}-correct`,
        label: `${t.practice.correctAnswer}: ${activeStep.correctAnswer}`,
        point: 'Selected the correct option.',
        keywords: [],
        feedback: activeStep.solution ?? '',
      };
      const miss = {
        id: `${activeStep.id}-miss`,
        label: `${t.practice.yourAnswer}: ${selectedChoice?.label ?? currentAnswer}. ${t.practice.correctAnswer}: ${correctChoice?.label ?? activeStep.correctAnswer}`,
        point: 'Review the solution and try the next item.',
        keywords: [],
        feedback: activeStep.solution ?? '',
      };

      setResults((previous) => ({
        ...previous,
        [activeStep.id]: {
          score: isCorrect ? 1 : 0,
          maxScore: 1,
          hits: isCorrect ? [hit] : [],
          misses: isCorrect ? [] : [miss],
          suggestions: isCorrect ? [] : [activeStep.solution || activeStep.answerNudge],
        },
      }));
      return;
    }

    const result = evaluateLocally(activeStep, currentAnswer);
    setResults((previous) => ({ ...previous, [activeStep.id]: result }));
  };

  const goToStep = (index: number) => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setActiveIndex(Math.min(Math.max(index, 0), practiceSteps.length - 1));
  };

  const selectPracticeSet = (setId: string) => {
    if (setId === activeSetId) return;
    recognitionRef.current?.stop();
    setIsListening(false);
    setActiveSetId(setId);
    setAnswers({});
    setResults({});
    setActiveIndex(0);
  };

  const resetPractice = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setAnswers({});
    setResults({});
    setActiveIndex(0);
  };

  const toggleSpeech = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? '')
        .join(' ');
      updateAnswer(`${currentAnswer} ${transcript}`.trim());
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 text-nebula text-xs font-semibold tracking-widest uppercase mb-4">
            <ClipboardCheck className="w-4 h-4" />
            {setCopy.eyebrow}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight">
            {setCopy.title}
          </h1>
          <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">
            {setCopy.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {practiceSets.map((set) => {
              const isActive = set.id === activeSetId;
              return (
                <button
                  key={set.id}
                  onClick={() => selectPracticeSet(set.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'border-nebula/70 bg-nebula/15 text-white'
                      : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {getSetCopy(set.id).label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 min-w-[280px]">
          <div className="glass-panel rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.practice.progress}</div>
            <div className="text-2xl font-semibold mt-1">{completedCount}/{practiceSteps.length}</div>
          </div>
          <div className="glass-panel rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.practice.score}</div>
            <div className="text-2xl font-semibold mt-1">{totalScore}/{totalPossible || 0}</div>
          </div>
          <button
            onClick={resetPractice}
            className="glass-panel rounded-lg p-4 text-left hover:border-nebula/60 transition-colors"
            title={t.practice.resetTitle}
          >
            <RotateCcw className="w-5 h-5 text-slate-300 mb-2" />
            <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.practice.reset}</div>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-6">
        <aside className="glass-panel rounded-lg p-3 h-fit">
          <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-slate-500">{t.practice.questionPath}</div>
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-1">
            {practiceSteps.map((step, index) => {
              const result = results[step.id];
              const isActive = index === activeIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`min-w-[170px] lg:min-w-0 text-left rounded-md px-3 py-3 border transition-colors ${
                    isActive
                      ? 'border-nebula/70 bg-white/8 text-white'
                      : 'border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold">{step.title}</span>
                    {result && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                  <div className="text-[10px] mt-1 opacity-60">{result ? `${result.score}/${result.maxScore} ${t.practice.points}` : `${step.maxScore} ${t.practice.points}`}</div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.2 }}
              className="glass-panel rounded-lg overflow-hidden"
            >
              <div className="border-b border-white/10 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-nebula mb-3">{activeStep.source}</div>
                    <h2 className="text-2xl md:text-3xl font-serif text-white">{activeStep.title}</h2>
                  </div>
                  <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 w-fit">
                    {activeIndex + 1} / {practiceSteps.length}
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-[1fr_1.2fr] gap-4">
                  <div className="rounded-lg bg-black/20 border border-white/5 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">{t.practice.setup}</div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {isActiveMultipleChoice ? (
                        <MathText>{activeStep.context}</MathText>
                      ) : (
                        <RichText>{activeStep.context}</RichText>
                      )}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/[0.04] border border-white/10 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">{t.practice.task}</div>
                    <div className="space-y-2 text-base text-white leading-relaxed">
                      {splitPromptParts(activeStep.prompt).map((part) => (
                        <p key={part}>
                          {isActiveMultipleChoice ? <MathText>{part}</MathText> : <RichText>{part}</RichText>}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4">
                  <EquationBlock equations={activeStep.equations} label={t.practice.equations} />
                  <QuestionMedia step={activeStep} label={t.practice.diagram} />
                </div>
              </div>

              <div className="p-6 md:p-8">
                {isActiveMultipleChoice ? (
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 mb-3">{t.practice.chooseAnswer}</div>
                    <div className="grid gap-3" role="radiogroup" aria-label={t.practice.chooseAnswer}>
                      {activeStep.choices?.map((choice) => {
                        const isSelected = currentAnswer === choice.label;
                        const isChecked = Boolean(currentResult);
                        const isCorrectChoice = currentResult && choice.label === activeStep.correctAnswer;
                        const isWrongChoice = currentResult && isSelected && choice.label !== activeStep.correctAnswer;

                        return (
                          <button
                            key={choice.label}
                            type="button"
                            data-choice={choice.label}
                            onClick={() => {
                              if (!currentResult) updateAnswer(choice.label);
                            }}
                            aria-pressed={isSelected}
                            className={`grid grid-cols-[40px_minmax(0,1fr)] gap-3 rounded-lg border p-4 text-left transition-colors ${
                              isCorrectChoice
                                ? 'border-emerald-500/50 bg-emerald-500/10'
                                : isWrongChoice
                                  ? 'border-rose-500/50 bg-rose-500/10'
                                  : isSelected
                                    ? 'border-nebula/70 bg-nebula/10'
                                    : 'border-white/10 bg-white/[0.03] hover:border-nebula/50'
                            }`}
                          >
                            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-xs font-bold text-black">
                              {choice.label}
                            </span>
                            <span className="self-center text-sm md:text-base text-slate-200 leading-relaxed">
                              <MathText>{choice.text}</MathText>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {currentResult && (
                      <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4">
                        <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                          {currentResult.score === 1 ? t.practice.correct : t.practice.notQuite}
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          <MathText>{activeStep.solution ?? ''}</MathText>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <label htmlFor="practice-answer" className="text-xs uppercase tracking-widest text-slate-500">
                        {t.practice.response}
                      </label>
                      <button
                        onClick={toggleSpeech}
                        disabled={!speechSupported}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                          isListening
                            ? 'border-rose-400 text-rose-300 bg-rose-400/10'
                            : 'border-white/10 text-slate-300 hover:border-nebula hover:text-nebula disabled:opacity-30'
                        }`}
                        title={speechSupported ? t.practice.dictate : t.practice.speechUnavailable}
                      >
                        {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    </div>

                    <textarea
                      id="practice-answer"
                      value={currentAnswer}
                      onChange={(event) => updateAnswer(event.target.value)}
                      className="min-h-[180px] w-full rounded-lg border border-white/10 bg-black/30 p-4 text-sm leading-relaxed text-white outline-none transition-colors placeholder:text-slate-600 focus:border-nebula/70"
                      placeholder={t.practice.answerPlaceholder}
                    />
                  </>
                )}

                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <button
                      onClick={() => goToStep(activeIndex - 1)}
                      disabled={activeIndex === 0}
                      className="h-11 w-11 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 disabled:opacity-30"
                      title={t.practice.previous}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => goToStep(activeIndex + 1)}
                      disabled={activeIndex === practiceSteps.length - 1}
                      className="h-11 w-11 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 disabled:opacity-30"
                      title={t.practice.next}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={submitAnswer}
                    disabled={isActiveMultipleChoice ? !currentAnswer || Boolean(currentResult) : currentAnswer.trim().length < 8}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-nebula hover:text-white disabled:opacity-30"
                  >
                    <Sparkles className="w-4 h-4" />
                    {isActiveMultipleChoice ? t.practice.checkAnswer : t.practice.scoreResponse}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {currentResult && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-[220px_minmax(0,1fr)] gap-6"
            >
              <div className="glass-panel rounded-lg p-6">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">{t.practice.rubricScore}</div>
                <div className="text-5xl font-serif text-white">{currentResult.score}/{currentResult.maxScore}</div>
                <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-nebula"
                    style={{ width: `${(currentResult.score / currentResult.maxScore) * 100}%` }}
                  />
                </div>
              </div>

              <div className="glass-panel rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-300 text-xs uppercase tracking-widest mb-3">
                      <Target className="w-4 h-4" />
                      {t.practice.hitPoints}
                    </div>
                    <div className="space-y-2">
                      {currentResult.hits.length ? (
                        currentResult.hits.map((hit) => (
                          <div key={hit.id} className="rounded-md border border-emerald-400/20 bg-emerald-400/5 p-3 text-sm text-slate-200">
                            {hit.label}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-slate-500">{t.practice.noRubricPoints}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest mb-3">
                      <FileText className="w-4 h-4" />
                      {t.practice.missingPoints}
                    </div>
                    <div className="space-y-2">
                      {currentResult.misses.length ? (
                        currentResult.misses.map((miss) => (
                          <div key={miss.id} className="rounded-md border border-amber-400/20 bg-amber-400/5 p-3 text-sm text-slate-200">
                            {miss.label}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-emerald-300">{t.practice.allRubricPoints}</div>
                      )}
                    </div>
                  </div>
                </div>

                {currentResult.suggestions.length > 0 && (
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">{t.practice.revisionAdvice}</div>
                    <ul className="space-y-2">
                      {currentResult.suggestions.map((suggestion) => (
                        <li key={suggestion} className="text-sm text-slate-300 leading-relaxed">
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <div className="glass-panel rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">{t.practice.sessionReport}</div>
                <h3 className="text-2xl font-serif text-white">{t.practice.score} {totalScore}/{totalPossible || 0}</h3>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  {t.practice.reportText}
                </p>
              </div>
              {practiceSetMeta.sources.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {practiceSetMeta.sources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 hover:border-nebula hover:text-nebula transition-colors"
                    >
                      {source.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {weakSpots.length > 0 && (
              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">{t.practice.patterns}</div>
                <div className="flex flex-wrap gap-2">
                  {weakSpots.map((spot) => (
                    <span key={spot} className="rounded-full bg-white/5 border border-white/10 px-3 py-2 text-xs text-slate-300">
                      {spot}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

import type { EvaluationResult, PracticeStep, RubricCriterion } from '../types/practice';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[−–—]/g, '-')
    .replace(/μ/g, 'mu')
    .replace(/θ/g, 'theta')
    .trim();

const compact = (value: string) => normalize(value).replace(/\s+/g, '');

const includesCue = (answer: string, cue: string) => {
  const normalizedCue = normalize(cue);
  return answer.includes(normalizedCue) || compact(answer).includes(compact(normalizedCue));
};

const criterionIsHit = (answer: string, criterion: RubricCriterion) => {
  const hasMainCue = criterion.keywords.some((keyword) => includesCue(answer, keyword));
  const hasOptionalCue =
    !criterion.anyKeywords || criterion.anyKeywords.some((keyword) => includesCue(answer, keyword));

  return hasMainCue && hasOptionalCue;
};

export const evaluateLocally = (step: PracticeStep, rawAnswer: string): EvaluationResult => {
  const answer = normalize(rawAnswer);
  const hits = step.criteria.filter((criterion) => criterionIsHit(answer, criterion));
  const misses = step.criteria.filter((criterion) => !criterionIsHit(answer, criterion));

  return {
    score: hits.length,
    maxScore: step.maxScore,
    hits,
    misses,
    suggestions: misses.slice(0, 3).map((criterion) => criterion.feedback),
  };
};

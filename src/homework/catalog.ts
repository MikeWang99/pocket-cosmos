import { practiceSets } from '../data/practiceSets';
import type { HomeworkItem, ResolvedHomeworkItem } from './types';

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const isSupabaseUuid = (value: string) => UUID_PATTERN.test(value);

export const resolveHomeworkItem = (item: HomeworkItem): ResolvedHomeworkItem | null => {
  const set = practiceSets.find((candidate) => candidate.id === item.practiceSetId);
  const step = set?.steps.find((candidate) => candidate.id === item.questionId);
  if (!set || !step) return null;

  return {
    ...item,
    step,
    setTitle: set.title,
    setLabel: set.label,
  };
};

export const resolveHomeworkItems = (items: HomeworkItem[]) =>
  items
    .sort((a, b) => a.position - b.position)
    .map(resolveHomeworkItem)
    .filter((item): item is ResolvedHomeworkItem => Boolean(item));

const expandRange = (start: number, end: number) => {
  const low = Math.min(start, end);
  const high = Math.max(start, end);
  return Array.from({ length: high - low + 1 }, (_, index) => low + index);
};

export const parseQuestionNumbers = (value: string) => {
  const values = value
    .split(/[\s,，、;；]+/)
    .flatMap((token) => {
      const range = token.match(/^(\d+)\s*[-–—]\s*(\d+)$/);
      if (range) return expandRange(Number(range[1]), Number(range[2]));
      return /^\d+$/.test(token) ? [Number(token)] : [];
    });

  return Array.from(new Set(values.filter((number) => number > 0)));
};

export const questionsFromNumbers = (practiceSetId: string, value: string) => {
  const set = practiceSets.find((candidate) => candidate.id === practiceSetId);
  if (!set) return { items: [], missing: parseQuestionNumbers(value) };

  const numbers = parseQuestionNumbers(value);
  const items = numbers
    .map((number) => set.steps[number - 1])
    .filter(Boolean)
    .map((step) => ({ practiceSetId: set.id, questionId: step.id }));
  const missing = numbers.filter((number) => !set.steps[number - 1]);
  return { items, missing };
};

export const findPracticeSet = (practiceSetId: string) =>
  practiceSets.find((set) => set.id === practiceSetId);

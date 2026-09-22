import type { AdminPracticeSetSummary } from '../practice/adminTypes';

const expandRange = (start: number, end: number) => {
  const low = Math.min(start, end);
  const high = Math.max(start, end);
  return Array.from({ length: high - low + 1 }, (_, index) => low + index);
};

export const parseQuestionNumbers = (value: string) =>
  Array.from(
    new Set(
      value
        .split(/[\s,，、;；]+/)
        .flatMap((token) => {
          const range = token.match(/^(\d+)\s*[-–—]\s*(\d+)$/);
          if (range) return expandRange(Number(range[1]), Number(range[2]));
          return /^\d+$/.test(token) ? [Number(token)] : [];
        })
        .filter((number) => number > 0),
    ),
  );

export const questionsFromAdminCatalog = (
  sets: AdminPracticeSetSummary[],
  practiceSetId: string,
  value: string,
) => {
  const set = sets.find((candidate) => candidate.id === practiceSetId);
  const numbers = parseQuestionNumbers(value);
  if (!set) return { items: [], missing: numbers };

  const items = numbers
    .map((number) => set.questions[number - 1])
    .filter(Boolean)
    .map((question) => ({ practiceSetId: set.id, questionId: question.id }));
  const missing = numbers.filter((number) => !set.questions[number - 1]);
  return { items, missing };
};

export const getAdminAiSuggestion = (
  sets: AdminPracticeSetSummary[],
  instruction: string,
  fallbackSetId: string,
) => {
  const normalized = instruction.toLowerCase();
  const topicMap: Array<[RegExp, string]> = [
    [/运动|motion|speed|acceleration|kinematics/, 'igcse-cie-topic-1-2'],
    [/力|force|dynamics|equilibrium|hooke/, 'igcse-cie-topic-1-5'],
    [/动量|momentum|collision|impulse/, 'igcse-cie-topic-1-6'],
    [/能量|energy|work|power/, 'igcse-cie-topic-1-7'],
    [/电路|circuit|resistance|电阻/, 'igcse-cie-topic-4-3'],
    [/放射|radioactivity|half.?life|半衰期/, 'igcse-cie-topic-5-2'],
  ];
  const setId = topicMap.find(([pattern]) => pattern.test(normalized))?.[1] ?? fallbackSetId;
  const set = sets.find((candidate) => candidate.id === setId) ?? sets[0];
  if (!set) return null;

  const requestedCount = Number(instruction.match(/(\d+)\s*(?:道|题|questions?)/i)?.[1] ?? 8);
  const count = Math.min(Math.max(requestedCount, 3), 20);
  const difficulty = /挑战|进阶|challenge|hard/i.test(instruction)
    ? 'hard'
    : /基础|简单|foundation|easy/i.test(instruction)
      ? 'easy'
      : 'mixed';

  const candidates = set.questions.filter((question) => {
    if (difficulty === 'hard') return (question.difficulty ?? 3) >= 4;
    if (difficulty === 'easy') return (question.difficulty ?? 3) <= 2;
    return true;
  });
  const selected = (candidates.length >= count ? candidates : set.questions).slice(0, count);

  return {
    set,
    items: selected.map((question) => ({ practiceSetId: set.id, questionId: question.id })),
  };
};

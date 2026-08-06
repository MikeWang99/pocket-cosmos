import type { HomeworkAssignment, HomeworkAttempt } from './types';

export const DEMO_ASSIGNMENTS_KEY = 'pocket-cosmos:homework-demo-assignments';
export const DEMO_ATTEMPTS_KEY = 'pocket-cosmos:homework-demo-attempts';
export const SHARED_PRACTICE_ATTEMPTS_KEY = 'pocket-cosmos:practice-attempts:demo';
export const PRACTICE_PROGRESS_EVENT = 'pocket-cosmos:practice-progress-updated';

export const readStored = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const writeStored = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(PRACTICE_PROGRESS_EVENT));
};

export const mirrorAttemptToPracticeStore = (attempt: HomeworkAttempt) => {
  const current = readStored<Record<string, HomeworkAttempt>>(SHARED_PRACTICE_ATTEMPTS_KEY, {});
  current[`${attempt.practiceSetId}:${attempt.questionId}`] = attempt;
  writeStored(SHARED_PRACTICE_ATTEMPTS_KEY, current);
};

export const persistDemoAssignments = (assignments: HomeworkAssignment[]) =>
  writeStored(DEMO_ASSIGNMENTS_KEY, assignments);

export const persistDemoAttempts = (attempts: HomeworkAttempt[]) =>
  writeStored(DEMO_ATTEMPTS_KEY, attempts);


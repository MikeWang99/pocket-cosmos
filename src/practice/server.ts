import 'server-only';

import { practiceSets } from '../data/practiceSets';
import type { PracticeSetMeta, PracticeSetPayload } from './types';

export const getPracticeCatalog = (): PracticeSetMeta[] =>
  practiceSets.map(({ steps, ...set }) => ({
    ...set,
    questionCount: steps.length,
  }));

export const getPracticeSetById = (setId: string): PracticeSetPayload | null =>
  practiceSets.find((set) => set.id === setId) ?? null;

#!/usr/bin/env tsx

import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { practiceSets } from '../src/data/practiceSetsCore';
import type { PracticeStep } from '../src/types/practice';

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const setFlagIndex = args.indexOf('--set');
const onlySet = setFlagIndex >= 0 ? args[setFlagIndex + 1] : null;

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (apply && (!supabaseUrl || !serviceRoleKey)) {
  console.error('SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY are required with --apply.');
  process.exit(1);
}

const stableStringify = (value: unknown): string => {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;

  const entries = Object.entries(value as Record<string, unknown>)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`);

  return `{${entries.join(',')}}`;
};

const contentHash = (step: PracticeStep) =>
  createHash('sha256').update(stableStringify(step)).digest('hex');

const questionIdFor = (practiceSetId: string, legacyQuestionId: string) =>
  `${practiceSetId}::${legacyQuestionId}`;

const selectedSets = onlySet
  ? practiceSets.filter((set) => set.id === onlySet)
  : practiceSets;

if (onlySet && selectedSets.length === 0) {
  console.error(`Unknown practice set: ${onlySet}`);
  process.exit(1);
}

const candidates = selectedSets.flatMap((set) =>
  set.steps.map((step) => {
    const questionId = questionIdFor(set.id, step.id);
    const hash = contentHash(step);

    return {
      question: {
        id: questionId,
        practice_set_id: set.id,
        legacy_question_id: step.id,
        status: 'active',
      },
      version: {
        question_id: questionId,
        content_hash: hash,
        stem: step.prompt,
        choices: step.choices ?? [],
        answer: {
          correctAnswer: step.correctAnswer ?? null,
          sampleAnswer: step.sampleAnswer ?? null,
          solution: step.solution ?? null,
          answerNudge: step.answerNudge,
          criteria: step.criteria,
        },
        explanation: step.solution ?? step.sampleAnswer ?? null,
        metadata: {
          formatVersion: 1,
          practiceSet: {
            id: set.id,
            label: set.label,
            title: set.title,
            system: set.system,
            practiceKind: set.practiceKind ?? null,
            chapter: set.chapter ?? null,
            chapterTitle: set.chapterTitle ?? null,
          },
          practiceStep: step,
        },
        source_year: step.sourceYear ?? null,
        source_ref: step.source,
      },
    };
  }),
);

const summary = {
  mode: apply ? 'apply' : 'dry-run',
  practiceSets: selectedSets.length,
  questions: candidates.length,
  newVersions: 0,
  unchangedVersions: 0,
  backfilledAssignmentItems: 0,
};

if (!apply) {
  console.log(JSON.stringify(summary, null, 2));
  console.log('Dry run only. Add --apply with Supabase service-role credentials to synchronize.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl!, serviceRoleKey!, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const chunks = <T>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );

for (const batch of chunks(candidates.map(({ question }) => question), 400)) {
  const { error } = await supabase
    .from('questions')
    .upsert(batch, { onConflict: 'id' });

  if (error) throw new Error(`Unable to upsert questions: ${error.message}`);
}

const existingByQuestion = new Map<string, Array<{ version: number; content_hash: string | null }>>();

for (const idBatch of chunks(candidates.map(({ question }) => question.id), 80)) {
  const { data, error } = await supabase
    .from('question_versions')
    .select('question_id, version, content_hash')
    .in('question_id', idBatch)
    .order('version', { ascending: false });

  if (error) throw new Error(`Unable to read question versions: ${error.message}`);

  for (const row of data ?? []) {
    const list = existingByQuestion.get(row.question_id) ?? [];
    list.push({ version: row.version, content_hash: row.content_hash });
    existingByQuestion.set(row.question_id, list);
  }
}

const inserts = candidates.flatMap(({ version }) => {
  const existing = existingByQuestion.get(version.question_id) ?? [];
  if (existing.some((row) => row.content_hash === version.content_hash)) {
    summary.unchangedVersions += 1;
    return [];
  }

  const nextVersion = existing.reduce((max, row) => Math.max(max, row.version), 0) + 1;
  summary.newVersions += 1;
  return [{ ...version, version: nextVersion }];
});

for (const batch of chunks(inserts, 200)) {
  if (batch.length === 0) continue;
  const { error } = await supabase.from('question_versions').insert(batch);
  if (error) throw new Error(`Unable to insert question versions: ${error.message}`);
}

const { data: backfilled, error: backfillError } = await supabase.rpc(
  'backfill_assignment_question_versions',
);

if (backfillError) {
  throw new Error(`Question sync succeeded but homework backfill failed: ${backfillError.message}`);
}

summary.backfilledAssignmentItems = Number(backfilled ?? 0);
console.log(JSON.stringify(summary, null, 2));

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

const parseStorageRef = (src: string) => {
  const match = src.match(/^storage:\/\/([^/]+)\/(.+)$/);
  return match ? { bucket: match[1], path: match[2] } : null;
};

const collectPrivateAssets = (step: PracticeStep, questionVersionId: string) => {
  const rows: Array<{
    question_version_id: string;
    role: 'stem' | 'figure' | 'choice' | 'answer' | 'source';
    storage_bucket: string;
    storage_path: string;
    choice_key: string | null;
    sort_order: number;
    metadata: Record<string, unknown>;
  }> = [];

  const add = (
    src: string,
    role: 'stem' | 'figure' | 'choice' | 'answer' | 'source',
    sortOrder: number,
    choiceKey: string | null = null,
    metadata: Record<string, unknown> = {},
  ) => {
    const ref = parseStorageRef(src);
    if (!ref) return;
    rows.push({
      question_version_id: questionVersionId,
      role,
      storage_bucket: ref.bucket,
      storage_path: ref.path,
      choice_key: choiceKey,
      sort_order: sortOrder,
      metadata,
    });
  };

  if (step.image) {
    add(step.image.src, step.image.role === 'question' ? 'stem' : 'figure', 0, null, {
      alt: step.image.alt,
    });
  }

  step.supportingImages?.forEach((image, index) => {
    add(image.src, 'figure', index + 1, null, { alt: image.alt });
  });

  step.assets?.forEach((asset, index) => {
    add(
      asset.src,
      asset.kind === 'choice' ? 'choice' : asset.kind === 'source' ? 'source' : 'stem',
      index,
      null,
      { assetId: asset.id, alt: asset.alt },
    );
  });

  step.choices?.forEach((choice, choiceIndex) => {
    if (choice.image) {
      add(choice.image.src, 'choice', choiceIndex * 10, choice.label, { alt: choice.image.alt });
    }
    choice.images?.forEach((image, imageIndex) => {
      add(
        image.src,
        'choice',
        choiceIndex * 10 + imageIndex,
        choice.label,
        { alt: image.alt },
      );
    });
  });

  if (step.solutionImage) {
    add(step.solutionImage.src, 'answer', 0, null, { alt: step.solutionImage.alt });
  }

  return rows;
};

const selectedSets = onlySet
  ? practiceSets.filter((set) => set.id === onlySet)
  : practiceSets;

if (onlySet && selectedSets.length === 0) {
  console.error(`Unknown practice set: ${onlySet}`);
  process.exit(1);
}

const candidates = selectedSets.flatMap((set) =>
  set.steps.map((step, position) => {
    const questionId = questionIdFor(set.id, step.id);
    const hash = contentHash(step);

    return {
      question: {
        id: questionId,
        practice_set_id: set.id,
        legacy_question_id: step.id,
        position,
        status: 'active',
      },
      step,
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
  privateAssetRefs: 0,
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

const versionIdByQuestionHash = new Map<string, string>();
for (const idBatch of chunks(candidates.map(({ question }) => question.id), 80)) {
  const { data: versions, error } = await supabase
    .from('question_versions')
    .select('id, question_id, content_hash')
    .in('question_id', idBatch);

  if (error) throw new Error(`Unable to resolve synchronized version ids: ${error.message}`);

  for (const version of versions ?? []) {
    if (!version.content_hash) continue;
    versionIdByQuestionHash.set(
      `${version.question_id}::${version.content_hash}`,
      version.id,
    );
  }
}

const assetRows = candidates.flatMap(({ question, step, version }) => {
  const versionId = versionIdByQuestionHash.get(
    `${question.id}::${version.content_hash}`,
  );
  return versionId ? collectPrivateAssets(step, versionId) : [];
});
summary.privateAssetRefs = assetRows.length;

for (const batch of chunks(assetRows, 200)) {
  if (batch.length === 0) continue;
  const { error } = await supabase
    .from('question_assets')
    .upsert(batch, {
      onConflict: 'question_version_id,role,storage_bucket,storage_path',
    });
  if (error) throw new Error(`Unable to synchronize question assets: ${error.message}`);
}

const { data: backfilled, error: backfillError } = await supabase.rpc(
  'backfill_assignment_question_versions',
);

if (backfillError) {
  throw new Error(`Question sync succeeded but homework backfill failed: ${backfillError.message}`);
}

summary.backfilledAssignmentItems = Number(backfilled ?? 0);
console.log(JSON.stringify(summary, null, 2));

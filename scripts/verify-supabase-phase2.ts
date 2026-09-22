#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY are required.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const failures: string[] = [];
const warnings: string[] = [];
const counts: Record<string, number> = {};

const countTable = async (table: string) => {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });

  if (error) {
    failures.push(`${table}: ${error.message}`);
    return;
  }

  counts[table] = count ?? 0;
};

const countFiltered = async (
  table: string,
  label: string,
  configure: (query: any) => any,
) => {
  const base = supabase.from(table).select('*', { count: 'exact', head: true });
  const { count, error } = await configure(base);
  if (error) {
    failures.push(`${label}: ${error.message}`);
    return 0;
  }
  return count ?? 0;
};

for (const table of [
  'questions',
  'question_versions',
  'question_assets',
  'practice_attempts',
  'practice_attempt_events',
  'practice_progress_resets',
  'assignments',
  'assignment_items',
  'assignment_students',
  'app_admins',
]) {
  await countTable(table);
}

const unpinnedAssignmentItems = await countFiltered(
  'assignment_items',
  'assignment_items.question_version_id',
  (query) => query.is('question_version_id', null),
);

const nullVersionHashes = await countFiltered(
  'question_versions',
  'question_versions.content_hash',
  (query) => query.is('content_hash', null),
);

const unpinnedPracticeAttempts = await countFiltered(
  'practice_attempts',
  'practice_attempts.question_version_id',
  (query) => query.is('question_version_id', null),
);

const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
if (bucketError) failures.push(`storage buckets: ${bucketError.message}`);

const bucketMap = new Map((buckets ?? []).map((bucket) => [bucket.id, bucket]));
const requiredBuckets = [
  ['student-work', false],
  ['question-assets', false],
  ['source-documents', false],
] as const;

for (const [id, expectedPublic] of requiredBuckets) {
  const bucket = bucketMap.get(id);
  if (!bucket) {
    failures.push(`missing storage bucket: ${id}`);
    continue;
  }
  if (Boolean(bucket.public) !== expectedPublic) {
    failures.push(
      `bucket ${id} public=${String(bucket.public)}; expected ${String(expectedPublic)}`,
    );
  }
}

if ((counts.questions ?? 0) === 0) failures.push('questions table is empty');
if ((counts.question_versions ?? 0) < (counts.questions ?? 0)) {
  failures.push('question_versions count is lower than questions count');
}
if (nullVersionHashes > 0) {
  failures.push(`${nullVersionHashes} question_versions rows have null content_hash`);
}
if (unpinnedAssignmentItems > 0) {
  failures.push(`${unpinnedAssignmentItems} assignment_items rows are not pinned to a question version`);
}
if (unpinnedPracticeAttempts > 0) {
  warnings.push(
    `${unpinnedPracticeAttempts} legacy practice_attempts rows are not pinned to a question version; retain them when the source question no longer exists in the normalized bank.`,
  );
}
if ((counts.question_assets ?? 0) === 0) {
  warnings.push(
    'question_assets is empty. Historical question media still uses version-controlled local paths until the planned object-storage cutover.',
  );
}

const summary = {
  ok: failures.length === 0,
  counts,
  integrity: {
    unpinnedAssignmentItems,
    unpinnedPracticeAttempts,
    nullVersionHashes,
  },
  buckets: requiredBuckets.map(([id]) => ({
    id,
    public: bucketMap.get(id)?.public ?? null,
  })),
  warnings,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);

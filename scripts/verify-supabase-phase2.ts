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

for (const table of [
  'questions',
  'question_versions',
  'question_assets',
  'practice_attempts',
  'practice_attempt_events',
  'practice_progress_resets',
  'assignments',
  'assignment_items',
  'app_admins',
]) {
  await countTable(table);
}

let unpinnedAssignmentItems = 0;
const { count: unpinnedCount, error: unpinnedError } = await supabase
  .from('assignment_items')
  .select('*', { count: 'exact', head: true })
  .is('question_version_id', null);

if (unpinnedError) {
  failures.push(`assignment_items.question_version_id: ${unpinnedError.message}`);
} else {
  unpinnedAssignmentItems = unpinnedCount ?? 0;
}

const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
if (bucketError) {
  failures.push(`storage buckets: ${bucketError.message}`);
}

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

if ((counts.questions ?? 0) > 0 && (counts.question_versions ?? 0) < (counts.questions ?? 0)) {
  failures.push('question_versions count is lower than questions count');
}

const summary = {
  ok: failures.length === 0,
  counts,
  unpinnedAssignmentItems,
  buckets: requiredBuckets.map(([id]) => ({
    id,
    public: bucketMap.get(id)?.public ?? null,
  })),
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);

import 'server-only';

import { createClient } from '@supabase/supabase-js';
import type { PracticeStep } from '../types/practice';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
const normalizedPracticeReadsEnabled = process.env.QUESTION_DB_READS_ENABLED === 'true';
const SIGNED_ASSET_TTL_SECONDS = 60 * 60;

const createServiceClient = () => {
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

const chunks = <T,>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );

const storageRef = (src: string) => {
  const match = src.match(/^storage:\/\/([^/]+)\/(.+)$/);
  return match ? { bucket: match[1], path: match[2] } : null;
};

const signSrc = async (
  client: NonNullable<ReturnType<typeof createServiceClient>>,
  src: string,
) => {
  const ref = storageRef(src);
  if (!ref || ref.bucket !== 'question-assets') return src;

  const { data, error } = await client.storage
    .from(ref.bucket)
    .createSignedUrl(ref.path, SIGNED_ASSET_TTL_SECONDS);

  if (error || !data?.signedUrl) {
    throw new Error(`Unable to sign question asset ${ref.path}: ${error?.message ?? 'unknown error'}`);
  }

  return data.signedUrl;
};

const signPracticeStepAssets = async (
  client: NonNullable<ReturnType<typeof createServiceClient>>,
  step: PracticeStep,
): Promise<PracticeStep> => ({
  ...step,
  image: step.image
    ? { ...step.image, src: await signSrc(client, step.image.src) }
    : undefined,
  supportingImages: step.supportingImages
    ? await Promise.all(
        step.supportingImages.map(async (image) => ({
          ...image,
          src: await signSrc(client, image.src),
        })),
      )
    : undefined,
  assets: step.assets
    ? await Promise.all(
        step.assets.map(async (asset) => ({
          ...asset,
          src: await signSrc(client, asset.src),
        })),
      )
    : undefined,
  choices: step.choices
    ? await Promise.all(
        step.choices.map(async (choice) => ({
          ...choice,
          image: choice.image
            ? { ...choice.image, src: await signSrc(client, choice.image.src) }
            : undefined,
          images: choice.images
            ? await Promise.all(
                choice.images.map(async (image) => ({
                  ...image,
                  src: await signSrc(client, image.src),
                })),
              )
            : undefined,
        })),
      )
    : undefined,
  solutionImage: step.solutionImage
    ? { ...step.solutionImage, src: await signSrc(client, step.solutionImage.src) }
    : undefined,
});

export const practiceStepFromMetadata = (metadata: unknown): PracticeStep | null => {
  if (!metadata || typeof metadata !== 'object') return null;
  const step = (metadata as { practiceStep?: unknown }).practiceStep;
  if (!step || typeof step !== 'object') return null;

  const candidate = step as Partial<PracticeStep>;
  if (
    typeof candidate.id !== 'string' ||
    typeof candidate.title !== 'string' ||
    typeof candidate.prompt !== 'string' ||
    !Array.isArray(candidate.criteria)
  ) {
    return null;
  }

  return candidate as PracticeStep;
};

export const hasQuestionDatabaseConfig = () => Boolean(supabaseUrl && serviceRoleKey);
export const isNormalizedQuestionReadEnabled = () => normalizedPracticeReadsEnabled;

export async function getSyncedPracticeSteps(
  practiceSetId: string,
  expectedQuestionCount?: number,
): Promise<PracticeStep[] | null> {
  if (!normalizedPracticeReadsEnabled) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { data: questions, error: questionError } = await client
    .from('questions')
    .select('id, legacy_question_id, position')
    .eq('practice_set_id', practiceSetId)
    .eq('status', 'active')
    .order('position', { ascending: true });

  if (questionError) {
    if (questionError.code === '42P01' || questionError.code === '42703') return null;
    throw new Error(`Unable to load normalized questions: ${questionError.message}`);
  }

  if (!questions?.length) return null;
  if (
    expectedQuestionCount !== undefined &&
    questions.length !== expectedQuestionCount
  ) {
    return null;
  }

  const latestByQuestion = new Map<string, { id: string; metadata: unknown }>();
  const ids = questions.map((question) => question.id);

  for (const idBatch of chunks(ids, 80)) {
    const { data: versions, error: versionError } = await client
      .from('question_versions')
      .select('id, question_id, version, metadata')
      .in('question_id', idBatch)
      .order('version', { ascending: false });

    if (versionError) {
      if (versionError.code === '42P01' || versionError.code === '42703') return null;
      throw new Error(`Unable to load normalized question versions: ${versionError.message}`);
    }

    for (const version of versions ?? []) {
      if (!latestByQuestion.has(version.question_id)) {
        latestByQuestion.set(version.question_id, { id: version.id, metadata: version.metadata });
      }
    }
  }

  const steps: PracticeStep[] = [];
  for (const question of questions) {
    const row = latestByQuestion.get(question.id);
    const step = row ? practiceStepFromMetadata(row.metadata) : null;
    if (!step) return null;
    steps.push(
      await signPracticeStepAssets(client, { ...step, questionVersionId: row.id }),
    );
  }

  return steps;
}

export async function getPinnedPracticeSteps(
  versionIds: string[],
): Promise<Map<string, PracticeStep> | null> {
  const client = createServiceClient();
  if (!client) return null;

  const uniqueIds = Array.from(new Set(versionIds.filter(Boolean)));
  const result = new Map<string, PracticeStep>();
  if (!uniqueIds.length) return result;

  for (const idBatch of chunks(uniqueIds, 80)) {
    const { data: versions, error } = await client
      .from('question_versions')
      .select('id, metadata')
      .in('id', idBatch);

    if (error) {
      if (error.code === '42P01' || error.code === '42703') return null;
      throw new Error(`Unable to load pinned question versions: ${error.message}`);
    }

    for (const version of versions ?? []) {
      const step = practiceStepFromMetadata(version.metadata);
      if (!step) continue;
      result.set(
        version.id,
        await signPracticeStepAssets(client, { ...step, questionVersionId: version.id }),
      );
    }
  }

  return result;
}

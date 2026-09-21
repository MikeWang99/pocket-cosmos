import 'server-only';

import { createClient } from '@supabase/supabase-js';
import type { PracticeStep } from '../types/practice';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
const normalizedPracticeReadsEnabled =
  process.env.QUESTION_DB_READS_ENABLED === 'true' ||
  (
    process.env.VERCEL_ENV === 'preview' &&
    process.env.QUESTION_DB_READS_ENABLED !== 'false'
  );
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

export const hasQuestionDatabaseConfig = () => Boolean(supabaseUrl);
const hasStorageBackedAsset = (step: PracticeStep) => {
  const refs = [
    step.image?.src,
    ...(step.supportingImages?.map((image) => image.src) ?? []),
    ...(step.assets?.map((asset) => asset.src) ?? []),
    ...(step.choices?.flatMap((choice) => [
      choice.image?.src,
      ...(choice.images?.map((image) => image.src) ?? []),
    ]) ?? []),
    step.solutionImage?.src,
  ].filter((src): src is string => Boolean(src));

  return refs.some((src) => storageRef(src)?.bucket === 'question-assets');
};

export async function resolvePracticeStepAssets(
  step: PracticeStep,
): Promise<PracticeStep> {
  if (!hasStorageBackedAsset(step)) return step;

  const client = createServiceClient();
  if (!client) {
    throw new Error(
      'Private question assets require a server-side Supabase secret for signed URLs.',
    );
  }

  return signPracticeStepAssets(client, step);
}
export const isNormalizedQuestionReadEnabled = () => normalizedPracticeReadsEnabled;


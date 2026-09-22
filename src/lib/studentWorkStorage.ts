import type { SupabaseClient } from '@supabase/supabase-js';

export const STUDENT_WORK_BUCKET = 'student-work';
export const STUDENT_WORK_SIGNED_URL_TTL_SECONDS = 60 * 60;

const LEGACY_PUBLIC_PATH_MARKER = '/storage/v1/object/public/student-work/';

export const getStudentWorkPathFromLegacyUrl = (value?: string | null) => {
  if (!value) return null;
  const markerIndex = value.indexOf(LEGACY_PUBLIC_PATH_MARKER);
  if (markerIndex < 0) return null;

  const encodedPath = value.slice(markerIndex + LEGACY_PUBLIC_PATH_MARKER.length);
  try {
    return decodeURIComponent(encodedPath);
  } catch {
    return encodedPath;
  }
};

export const resolveStudentWorkPath = (
  path?: string | null,
  legacyPublicUrl?: string | null,
) => path || getStudentWorkPathFromLegacyUrl(legacyPublicUrl);

export const createStudentWorkSignedUrl = async (
  client: SupabaseClient,
  path?: string | null,
  expiresIn = STUDENT_WORK_SIGNED_URL_TTL_SECONDS,
) => {
  if (!path) return null;

  const { data, error } = await client.storage
    .from(STUDENT_WORK_BUCKET)
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.error('Unable to create student-work signed URL:', error);
    return null;
  }

  return data.signedUrl;
};

import type { SupabaseClient } from '@supabase/supabase-js';

export const STUDENT_WORK_BUCKET = 'student-work';

const STUDENT_WORK_URL_MARKERS = [
  '/storage/v1/object/public/student-work/',
  '/storage/v1/object/sign/student-work/',
  '/storage/v1/object/authenticated/student-work/',
];

export const normalizeStudentWorkPath = (value?: string | null) => {
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) return value.replace(/^\/+/, '');

  try {
    const url = new URL(value);
    const marker = STUDENT_WORK_URL_MARKERS.find((candidate) => url.pathname.includes(candidate));
    if (!marker) return null;
    return decodeURIComponent(url.pathname.split(marker)[1] ?? '').replace(/^\/+/, '') || null;
  } catch {
    return null;
  }
};

export const createStudentWorkSignedUrl = async (
  supabase: SupabaseClient,
  value: string,
  expiresInSeconds = 60 * 60,
) => {
  const path = normalizeStudentWorkPath(value);
  if (!path) return { path: null, signedUrl: null, error: 'Invalid student-work reference.' };

  const { data, error } = await supabase.storage
    .from(STUDENT_WORK_BUCKET)
    .createSignedUrl(path, expiresInSeconds);

  return {
    path,
    signedUrl: data?.signedUrl ?? null,
    error: error?.message ?? null,
  };
};

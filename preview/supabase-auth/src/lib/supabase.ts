import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const authEnabled = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = authEnabled
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export interface ProfileRow {
  user_id: string;
  email: string | null;
  display_name: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PracticeSubmissionRow {
  id: string;
  student_id: string;
  student_email: string | null;
  display_name: string | null;
  practice_set_id: string;
  practice_set_title: string;
  question_id: string;
  question_title: string;
  answer: string;
  score: number;
  max_score: number;
  is_correct: boolean;
  tags: string[];
  result: Record<string, unknown>;
  created_at: string;
}

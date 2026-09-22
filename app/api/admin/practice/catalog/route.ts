import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { getPracticeCatalog, getPracticeSetById } from '@/src/practice/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1] ?? null;
  if (!supabaseUrl || !supabaseAnonKey || !token) {
    return NextResponse.json({ error: 'Administrator sign-in required.' }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Session is invalid or expired.' }, { status: 401 });
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_practice_admin');
  if (adminError || isAdmin !== true) {
    return NextResponse.json({ error: 'Administrator access required.' }, { status: 403 });
  }

  const sets = getPracticeCatalog().map((meta) => {
    const set = getPracticeSetById(meta.id);
    return {
      ...meta,
      questions: (set?.steps ?? []).map((step) => ({
        id: step.id,
        title: step.title,
        difficulty: step.difficulty,
        tags: step.tags,
        specialtyTags: step.specialtyTags,
        mode: step.mode,
        hasChoices: Boolean(step.choices?.length),
        hasAnswerKey: Boolean(step.correctAnswer),
      })),
    };
  });

  return NextResponse.json({ sets });
}

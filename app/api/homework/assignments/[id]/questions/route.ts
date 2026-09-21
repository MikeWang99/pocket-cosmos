import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { getPracticeSetById } from '@/src/practice/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id: assignmentId } = await context.params;
  const authorization = request.headers.get('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1] ?? null;

  if (!supabaseUrl || !supabaseAnonKey || !token) {
    return NextResponse.json({ error: 'Sign in to load assignment questions.' }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Session is invalid or expired.' }, { status: 401 });
  }

  // assignment_items RLS inherits the parent assignment's visibility. Admins
  // can review any assignment; students only see items assigned to them.
  const { data: rows, error } = await supabase
    .from('assignment_items')
    .select('id, assignment_id, position, practice_set_id, question_id, practice_set_title, question_title')
    .eq('assignment_id', assignmentId)
    .order('position', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }

  const items = (rows ?? []).flatMap((row) => {
    const set = getPracticeSetById(row.practice_set_id);
    const step = set?.steps.find((candidate) => candidate.id === row.question_id);
    if (!set || !step) return [];

    return [{
      id: row.id,
      assignmentId: row.assignment_id,
      position: row.position,
      practiceSetId: row.practice_set_id,
      questionId: row.question_id,
      practiceSetTitle: row.practice_set_title ?? set.title,
      questionTitle: row.question_title ?? step.title,
      setTitle: set.title,
      setLabel: set.label,
      step,
    }];
  });

  return NextResponse.json({ items });
}

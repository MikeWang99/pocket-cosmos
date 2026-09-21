import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { getPracticeSetById } from '@/src/practice/server';
import {
  getPinnedPracticeSteps,
  practiceStepFromMetadata,
} from '@/src/practice/database';

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
    .select(
      'id, assignment_id, position, practice_set_id, question_id, question_version_id, practice_set_title, question_title',
    )
    .eq('assignment_id', assignmentId)
    .order('position', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }

  const pinnedIds = (rows ?? [])
    .map((row) => row.question_version_id as string | null)
    .filter((id): id is string => Boolean(id));

  let pinnedSteps = pinnedIds.length ? await getPinnedPracticeSteps(pinnedIds) : new Map();

  // If the deployment has no server-side Supabase secret, use the authorized
  // SECURITY DEFINER RPC. It independently verifies the learner can see the
  // assignment before returning immutable question metadata.
  if (pinnedIds.length && !pinnedSteps) {
    const { data: pinnedRows, error: pinnedError } = await supabase.rpc(
      'get_authorized_assignment_question_steps',
      { p_assignment_id: assignmentId },
    );

    if (pinnedError) {
      return NextResponse.json(
        { error: pinnedError.message },
        { status: pinnedError.code === '42501' ? 403 : 503 },
      );
    }

    pinnedSteps = new Map();
    for (const row of (pinnedRows ?? []) as Array<{
      item_id: string;
      sort_position: number;
      question_version_id: string | null;
      metadata: unknown;
    }>) {
      if (!row.question_version_id) continue;
      const step = practiceStepFromMetadata(row.metadata);
      if (!step) continue;
      pinnedSteps.set(row.question_version_id, {
        ...step,
        questionVersionId: row.question_version_id,
      });
    }
  }

  if (pinnedIds.length && !pinnedSteps) {
    return NextResponse.json(
      { error: 'Immutable homework versions are not available in this deployment.' },
      { status: 503 },
    );
  }

  const items = [];
  for (const row of rows ?? []) {
    const legacySet = getPracticeSetById(row.practice_set_id);
    const pinnedStep = row.question_version_id
      ? pinnedSteps?.get(row.question_version_id)
      : null;
    const legacyStep = legacySet?.steps.find((candidate) => candidate.id === row.question_id);
    const step = pinnedStep ?? legacyStep;

    if (row.question_version_id && !pinnedStep) {
      return NextResponse.json(
        { error: `Pinned question version is missing for assignment item ${row.id}.` },
        { status: 500 },
      );
    }

    if (!step) continue;

    items.push({
      id: row.id,
      assignmentId: row.assignment_id,
      position: row.position,
      practiceSetId: row.practice_set_id,
      questionId: row.question_id,
      questionVersionId: row.question_version_id ?? undefined,
      practiceSetTitle: row.practice_set_title ?? legacySet?.title ?? row.practice_set_id,
      questionTitle: row.question_title ?? step.title,
      setTitle: legacySet?.title ?? row.practice_set_title ?? row.practice_set_id,
      setLabel: legacySet?.label ?? row.practice_set_title ?? row.practice_set_id,
      step,
    });
  }

  return NextResponse.json({ items });
}

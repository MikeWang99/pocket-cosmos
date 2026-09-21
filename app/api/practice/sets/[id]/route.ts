import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { getPracticeSetById } from '@/src/practice/server';
import {
  getSyncedPracticeSteps,
  isNormalizedQuestionReadEnabled,
  practiceStepFromMetadata,
} from '@/src/practice/database';
import { PUBLIC_SAMPLE_LIMIT, PUBLIC_SAMPLE_SET_ID } from '@/src/practice/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true';
const localDevBypass = process.env.NODE_ENV === 'development' && !authEnabled;

const unauthorized = (message = 'Practice set is locked.') =>
  NextResponse.json({ error: message }, { status: 403 });

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const legacySet = getPracticeSetById(id);
  if (!legacySet) {
    return NextResponse.json({ error: 'Practice set not found.' }, { status: 404 });
  }

  const loadServiceResolvedSet = async () => {
    const syncedSteps = await getSyncedPracticeSteps(id, legacySet.steps.length);
    return syncedSteps ? { ...legacySet, steps: syncedSteps } : legacySet;
  };

  // Only local development may bypass authorization. Preview and Production
  // must fail closed when auth or Supabase configuration is missing.
  if (localDevBypass) {
    return NextResponse.json({ set: await loadServiceResolvedSet(), access: 'full' });
  }

  if (!authEnabled || !supabaseUrl || !supabaseAnonKey) {
    if (id === PUBLIC_SAMPLE_SET_ID) {
      const resolvedSet = await loadServiceResolvedSet();
      return NextResponse.json({
        set: { ...resolvedSet, steps: resolvedSet.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
        access: 'sample',
      });
    }

    return NextResponse.json(
      { error: 'Practice authorization is not configured for this deployment.' },
      { status: 503 },
    );
  }

  const authorization = request.headers.get('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1] ?? null;

  if (!token) {
    if (id !== PUBLIC_SAMPLE_SET_ID) return unauthorized();
    const resolvedSet = await loadServiceResolvedSet();
    return NextResponse.json({
      set: { ...resolvedSet, steps: resolvedSet.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
      access: 'sample',
    });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) {
    if (id !== PUBLIC_SAMPLE_SET_ID) return unauthorized('Session is invalid or expired.');
    const resolvedSet = await loadServiceResolvedSet();
    return NextResponse.json({
      set: { ...resolvedSet, steps: resolvedSet.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
      access: 'sample',
    });
  }

  const [{ data: admin }, { data: permissions, error: permissionError }] = await Promise.all([
    supabase.rpc('is_practice_admin'),
    supabase
      .from('practice_permissions')
      .select('system')
      .eq('user_id', userData.user.id)
      .eq('system', legacySet.system),
  ]);

  const loadAuthorizedResolvedSet = async () => {
    const serviceSteps = await getSyncedPracticeSteps(id, legacySet.steps.length);
    if (serviceSteps) return { ...legacySet, steps: serviceSteps };

    if (!isNormalizedQuestionReadEnabled()) return legacySet;

    const { data, error } = await supabase.rpc('get_authorized_practice_steps', {
      p_practice_set_id: id,
    });

    if (error) {
      throw new Error(`Unable to load normalized practice set: ${error.message}`);
    }

    const rows = (data ?? []) as Array<{
      sort_position: number;
      question_id: string;
      question_version_id: string;
      metadata: unknown;
    }>;

    if (rows.length !== legacySet.steps.length) {
      throw new Error(
        `Normalized practice set count mismatch: expected ${legacySet.steps.length}, received ${rows.length}.`,
      );
    }

    const steps = rows.map((row) => {
      const step = practiceStepFromMetadata(row.metadata);
      if (!step) {
        throw new Error(`Invalid normalized question payload: ${row.question_id}`);
      }
      return { ...step, questionVersionId: row.question_version_id };
    });

    return { ...legacySet, steps };
  };

  if (admin === true || (!permissionError && (permissions?.length ?? 0) > 0)) {
    try {
      return NextResponse.json({ set: await loadAuthorizedResolvedSet(), access: 'full' });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Normalized question bank is unavailable for this deployment.' },
        { status: 503 },
      );
    }
  }

  if (id === PUBLIC_SAMPLE_SET_ID) {
    const resolvedSet = await loadServiceResolvedSet();
    return NextResponse.json({
      set: { ...resolvedSet, steps: resolvedSet.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
      access: 'sample',
    });
  }

  return unauthorized();
}

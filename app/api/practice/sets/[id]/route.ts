import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { getPracticeSetById } from '@/src/practice/server';
import { getSyncedPracticeSteps } from '@/src/practice/database';
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

  // Only local development may bypass authorization. Preview and Production
  // must fail closed when auth or Supabase configuration is missing.
  if (localDevBypass) {
    const syncedSteps = await getSyncedPracticeSteps(id, legacySet.steps.length);
    const set = syncedSteps ? { ...legacySet, steps: syncedSteps } : legacySet;
    return NextResponse.json({ set: resolvedSet, access: 'full' });
  }

  if (!authEnabled || !supabaseUrl || !supabaseAnonKey) {
    if (id === PUBLIC_SAMPLE_SET_ID) {
      return NextResponse.json({
        set: { ...set, steps: resolvedSet.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
        access: 'sample',
      });
    }
    return NextResponse.json(
      { error: 'Practice authorization is not configured for this deployment.' },
      { status: 503 },
    );
  }

  const syncedSteps = await getSyncedPracticeSteps(id, legacySet.steps.length);
  const resolvedSet = syncedSteps ? { ...legacySet, steps: syncedSteps } : legacySet;

    const authorization = request.headers.get('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1] ?? null;

  if (!token) {
    if (id !== PUBLIC_SAMPLE_SET_ID) return unauthorized();
    return NextResponse.json({
      set: { ...set, steps: resolvedSet.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
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
    return NextResponse.json({
      set: { ...set, steps: resolvedSet.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
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

  if (admin === true || (!permissionError && (permissions?.length ?? 0) > 0)) {
    return NextResponse.json({ set: resolvedSet, access: 'full' });
  }

  if (id === PUBLIC_SAMPLE_SET_ID) {
    return NextResponse.json({
      set: { ...set, steps: resolvedSet.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
      access: 'sample',
    });
  }

  return unauthorized();
}

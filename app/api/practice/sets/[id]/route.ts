import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { getPracticeSetById } from '@/src/practice/server';
import { PUBLIC_SAMPLE_LIMIT, PUBLIC_SAMPLE_SET_ID } from '@/src/practice/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true';

const unauthorized = (message = 'Practice set is locked.') =>
  NextResponse.json({ error: message }, { status: 403 });

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const set = getPracticeSetById(id);
  if (!set) {
    return NextResponse.json({ error: 'Practice set not found.' }, { status: 404 });
  }

  // Preserve local/dev behavior when auth is explicitly disabled or Supabase
  // is not configured. Production deployments should keep auth enabled.
  if (!authEnabled || !supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ set, access: 'full' });
  }

  const authorization = request.headers.get('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1] ?? null;

  if (!token) {
    if (id !== PUBLIC_SAMPLE_SET_ID) return unauthorized();
    return NextResponse.json({
      set: { ...set, steps: set.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
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
      set: { ...set, steps: set.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
      access: 'sample',
    });
  }

  const [{ data: admin }, { data: permissions, error: permissionError }] = await Promise.all([
    supabase.rpc('is_practice_admin'),
    supabase
      .from('practice_permissions')
      .select('system')
      .eq('user_id', userData.user.id)
      .eq('system', set.system),
  ]);

  if (admin === true || (!permissionError && (permissions?.length ?? 0) > 0)) {
    return NextResponse.json({ set, access: 'full' });
  }

  if (id === PUBLIC_SAMPLE_SET_ID) {
    return NextResponse.json({
      set: { ...set, steps: set.steps.slice(0, PUBLIC_SAMPLE_LIMIT) },
      access: 'sample',
    });
  }

  return unauthorized();
}

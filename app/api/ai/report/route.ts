import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  return NextResponse.json(
    {
      error: 'ai_reports_not_configured',
      message:
        'The overseas server-side AI report endpoint is reserved. Connect a model provider here before enabling student-facing AI reports.',
    },
    { status: 501 },
  );
}

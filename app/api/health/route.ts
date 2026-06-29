import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export function GET() {
  return NextResponse.json({
    app: 'pocket-cosmos',
    edition: 'overseas',
    status: 'ok',
    runtime: 'nextjs',
    timestamp: new Date().toISOString(),
  });
}

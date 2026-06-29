import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export function GET() {
  return NextResponse.json({
    status: 'not_configured',
    message: 'Appointment availability will be served from the overseas backend here.',
  });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  return NextResponse.json(
    {
      error: 'appointments_not_configured',
      message: 'Appointment booking is reserved for the overseas product backend.',
    },
    { status: 501 },
  );
}

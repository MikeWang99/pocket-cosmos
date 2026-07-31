import { NextResponse } from 'next/server';
import {
  authorizeHomeworkApi,
  createHomeworkAssignment,
  getHomeworkServiceClient,
  validateHomeworkPayload,
} from '@/src/server/homeworkAssignments';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const client = getHomeworkServiceClient();
  if (!client) {
    return NextResponse.json(
      { error: 'homework_api_not_configured', message: 'Supabase service credentials are missing.' },
      { status: 503 },
    );
  }

  const authorization = await authorizeHomeworkApi(request, client);
  if (!authorization.actor) {
    return NextResponse.json(
      { error: 'unauthorized', message: authorization.error },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const validation = validateHomeworkPayload(body);
  if (!validation.input) {
    return NextResponse.json(
      { error: 'invalid_assignment', message: validation.error },
      { status: 400 },
    );
  }

  try {
    const assignment = await createHomeworkAssignment(client, validation.input, authorization.actor);
    return NextResponse.json({ assignment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'assignment_create_failed',
        message: error instanceof Error ? error.message : 'Unable to create assignment.',
      },
      { status: 500 },
    );
  }
}


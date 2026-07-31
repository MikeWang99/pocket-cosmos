import { NextResponse } from 'next/server';
import {
  authorizeHomeworkApi,
  createHomeworkAssignment,
  getHomeworkServiceClient,
  validateHomeworkPayload,
} from '@/src/server/homeworkAssignments';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    endpoint: 'POST /api/admin/assignments/ai',
    purpose: 'Create and optionally publish a homework assignment after an AI agent resolves source question IDs.',
    authentication: [
      'Authorization: Bearer <Supabase admin access token>',
      'x-homework-api-key: <HOMEWORK_AUTOMATION_SECRET>',
    ],
    required: {
      title: 'string',
      instruction: 'string',
      resolvedItems: [{ practiceSetId: 'string', questionId: 'string' }],
    },
    optional: {
      description: 'string',
      dueAt: 'ISO date-time or null',
      status: 'draft | published',
      assignedToAll: 'boolean',
      studentIds: ['Supabase user UUID'],
    },
    guarantees: [
      'Every source question ID is validated against the deployed catalog.',
      'Duplicate question references are removed.',
      'Created items retain the original practiceSetId and questionId for shared progress.',
    ],
  });
}

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

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || !Array.isArray(body.resolvedItems)) {
    return NextResponse.json(
      {
        error: 'ai_selection_required',
        message:
          'Resolve the AI-selected questions first, then send them as resolvedItems. The API never invents question IDs.',
      },
      { status: 422 },
    );
  }

  const validation = validateHomeworkPayload({
    ...body,
    sourceType: 'ai',
    aiInstruction: body.instruction,
    items: body.resolvedItems,
  });
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


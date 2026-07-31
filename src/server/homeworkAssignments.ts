import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { practiceSets } from '../data/practiceSets';
import { isSupabaseUuid } from '../homework/catalog';
import type { CreateHomeworkInput } from '../homework/types';

const ADMIN_EMAILS = new Set(['mike.wang.de@gmail.com']);

export interface HomeworkApiPayload extends CreateHomeworkInput {
  sourceType: 'manual' | 'ai';
}

export interface HomeworkApiActor {
  userId: string | null;
  mode: 'admin-session' | 'automation-key';
}

const getApiClient = (request: Request) => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const key = serviceRoleKey || anonKey;
  if (!url || !key) return null;

  const authorization = request.headers.get('authorization');
  return {
    client: createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: authorization ? { headers: { Authorization: authorization } } : undefined,
    }),
    serviceRoleConfigured: Boolean(serviceRoleKey),
  };
};

const secureEqual = (left: string, right: string) => {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
};

export const authorizeHomeworkApi = async (
  request: Request,
  client: SupabaseClient,
  serviceRoleConfigured: boolean,
): Promise<{ actor: HomeworkApiActor | null; error?: string }> => {
  const expectedAutomationKey = process.env.HOMEWORK_AUTOMATION_SECRET;
  const providedAutomationKey = request.headers.get('x-homework-api-key') ?? '';
  if (
    serviceRoleConfigured &&
    expectedAutomationKey &&
    providedAutomationKey &&
    secureEqual(providedAutomationKey, expectedAutomationKey)
  ) {
    return { actor: { userId: null, mode: 'automation-key' } };
  }

  const authorization = request.headers.get('authorization') ?? '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) return { actor: null, error: 'Administrator authentication is required.' };

  const { data, error } = await client.auth.getUser(token);
  const email = (data.user?.email ?? '').toLowerCase();
  if (error || !data.user || !ADMIN_EMAILS.has(email)) {
    return { actor: null, error: 'This account cannot create assignments.' };
  }

  return { actor: { userId: data.user.id, mode: 'admin-session' } };
};

const cleanText = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value.trim() : fallback;

export const validateHomeworkPayload = (
  payload: unknown,
): { input: HomeworkApiPayload | null; error?: string } => {
  if (!payload || typeof payload !== 'object') return { input: null, error: 'Invalid JSON body.' };
  const raw = payload as Partial<HomeworkApiPayload>;
  const title = cleanText(raw.title);
  if (!title) return { input: null, error: 'title is required.' };
  if (!Array.isArray(raw.items) || raw.items.length === 0) {
    return { input: null, error: 'At least one resolved question is required.' };
  }

  const uniqueItems: HomeworkApiPayload['items'] = [];
  const seen = new Set<string>();
  for (const candidate of raw.items) {
    const practiceSetId = cleanText(candidate?.practiceSetId);
    const questionId = cleanText(candidate?.questionId);
    const set = practiceSets.find((entry) => entry.id === practiceSetId);
    const step = set?.steps.find((entry) => entry.id === questionId);
    if (!set || !step) {
      return {
        input: null,
        error: `Unknown source question: ${practiceSetId || '(missing set)'}/${questionId || '(missing question)'}.`,
      };
    }
    const key = `${practiceSetId}:${questionId}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueItems.push({ practiceSetId, questionId });
    }
  }

  const status = raw.status === 'published' ? 'published' : 'draft';
  const sourceType = raw.sourceType === 'ai' ? 'ai' : 'manual';
  const dueAt = raw.dueAt ? cleanText(raw.dueAt) : null;
  if (dueAt && Number.isNaN(Date.parse(dueAt))) {
    return { input: null, error: 'dueAt must be a valid ISO date-time.' };
  }
  const assignedToAll = raw.assignedToAll !== false;
  const studentIds = Array.isArray(raw.studentIds)
    ? Array.from(
        new Set(
          raw.studentIds
            .map((id) => cleanText(id))
            .filter((id) => id && isSupabaseUuid(id)),
        ),
      )
    : [];
  if (!assignedToAll && studentIds.length === 0) {
    return {
      input: null,
      error: 'At least one valid student UUID is required when assignedToAll is false.',
    };
  }

  return {
    input: {
      title,
      description: cleanText(raw.description),
      dueAt,
      status,
      sourceType,
      assignedToAll,
      studentIds,
      aiInstruction: cleanText(raw.aiInstruction) || undefined,
      items: uniqueItems,
    },
  };
};

export const createHomeworkAssignment = async (
  client: SupabaseClient,
  input: HomeworkApiPayload,
  actor: HomeworkApiActor,
) => {
  const timestamp = new Date().toISOString();
  const { data, error } = await client
    .from('assignments')
    .insert({
      title: input.title,
      description: input.description,
      status: input.status,
      source_type: input.sourceType,
      due_at: input.dueAt,
      published_at: input.status === 'published' ? timestamp : null,
      assigned_to_all: input.assignedToAll,
      ai_instruction: input.aiInstruction ?? null,
      created_by: actor.userId,
    })
    .select('id, title, status, source_type, created_at')
    .single();
  if (error || !data) throw new Error(error?.message ?? 'Unable to create assignment.');

  const itemRows = input.items.map((item, position) => {
    const set = practiceSets.find((entry) => entry.id === item.practiceSetId);
    const step = set?.steps.find((entry) => entry.id === item.questionId);
    return {
      assignment_id: data.id,
      position,
      practice_set_id: item.practiceSetId,
      question_id: item.questionId,
      practice_set_title: set?.title ?? item.practiceSetId,
      question_title: step?.title ?? item.questionId,
    };
  });

  const { error: itemError } = await client.from('assignment_items').insert(itemRows);
  if (itemError) {
    await client.from('assignments').delete().eq('id', data.id);
    throw new Error(itemError.message);
  }

  if (!input.assignedToAll && input.studentIds.length) {
    const { error: studentError } = await client.from('assignment_students').insert(
      input.studentIds.map((studentId) => ({
        assignment_id: data.id,
        student_id: studentId,
      })),
    );
    if (studentError) {
      await client.from('assignments').delete().eq('id', data.id);
      throw new Error(studentError.message);
    }
  }

  return {
    ...data,
    itemCount: itemRows.length,
    audience: input.assignedToAll ? 'all-students' : input.studentIds,
    authorizationMode: actor.mode,
  };
};

export const getHomeworkApiClient = getApiClient;

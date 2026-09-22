import { NextResponse } from 'next/server';
import { getPracticeCatalog } from '@/src/practice/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ sets: getPracticeCatalog() });
}

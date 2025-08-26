// app/api/analyze/route.ts
export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(request: Request) {
  let body: { content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const content = body.content?.trim() ?? '';
  if (!content) {
    return NextResponse.json({ error: 'Missing content' }, { status: 400 });
  }

  try {
    const mod = await openai.moderations.create({ input: content });
    const { flagged, categories } = mod.results[0];
    
    const isAlarming = categories['self-harm'] || flagged;
    
    return NextResponse.json({ isAlarming, categories });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to analyze content', detail: (err as Error).message },
      { status: 500 }
    );
  }
}

import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const month = url.searchParams.get('month');
  if (!month) {
    return NextResponse.json(
      { error: 'Missing `month` query param' },
      { status: 400 }
    );
  }

  try {
    const entries = await prisma.journalEntry.findMany({
      where: { date: { startsWith: month } },
      select: { date: true, isAlarming: true },
    });
    return NextResponse.json(entries);
  } catch (err) {
    console.error('Prisma fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  let data: { date?: string; content?: string; isAlarming?: boolean };
  try {
    data = await request.json();
  } catch (parseError) {
    console.error('Invalid JSON payload:', parseError);
    return NextResponse.json(
      { error: 'Invalid JSON format' },
      { status: 400 }
    );
  }

  const { date, content, isAlarming = false } = data;
  if (!date || !content || content.length > 2000) {
    return NextResponse.json(
      { error: 'Invalid input' },
      { status: 400 }
    );
  }

  try {
    const entry = await prisma.journalEntry.upsert({
      where: { date },
      create: { date, content, isAlarming },
      update: { content, isAlarming },
    });
    return NextResponse.json(entry);
  } catch (err) {
    console.error('Prisma upsert error:', err);
    return NextResponse.json(
      { error: 'Failed to save entry' },
      { status: 500 }
    );
  }
}



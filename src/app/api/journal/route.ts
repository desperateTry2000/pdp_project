import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    console.log('🔥 Received POST request to /api/journal');
  let data;
  try {
    data = await req.json(); // this can throw!
  } catch (parseError) {
    console.error('Invalid JSON payload:', parseError);
    return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
  }

  const { date, content } = data;

  if (!date || !content || content.length > 2000) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const entry = await prisma.journalEntry.upsert({
      where: { date },
      update: { content },
      create: { date, content },
    });

    return NextResponse.json(entry);
  } catch (err) {
    console.error('Prisma upsert error:', err);
    return NextResponse.json({ error: 'Failed to save entry' }, { status: 500 });
  }
}


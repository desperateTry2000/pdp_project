import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Ensure we don't exceed token limits
    const maxMessages = 10;
    const limitedMessages = messages.slice(-maxMessages);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: limitedMessages,
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const response = completion.choices[0].message;

    return NextResponse.json({
      content: response.content,
      usage: completion.usage,
      model: completion.model
    });

  } catch (error) {
    // Don't expose internal errors to users
    return NextResponse.json(
      { 
        error: 'I\'m having trouble connecting right now. Please try again in a moment.',
        detail: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});


export async function POST(request: Request) {
  try {
    const { message }: { message?: string } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Api key is missing !" },
        { status: 500 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
    });

    const reply = response.choices[0]?.message?.content || 'No response';
    return NextResponse.json({ reply });
  } catch (error: any) {


    let errorMessage = 'Failed to fetch AI response';
    let statusCode = 500;

    if (error.code === 'invalid_api_key') {
      errorMessage = 'Invalid API key. Please check your configuration.';
      statusCode = 401;
    } else if (error.code === 'insufficient_quota') {
      errorMessage = 'Sorry, the AI is currently unavailable due to quota limits.';
      statusCode = 429;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

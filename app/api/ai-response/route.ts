import { NextResponse } from "next/server";
import OpenAI from "openai";

export const initialMessage = {
  role: "system" as const,
  content: `
  Please format your responses using Markdown. Use **bold**, *italics*, \`code\`, lists, and other markdown elements.`
};



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(request: Request) {
  try {
    const { message }: { message?: string } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "Message are required" }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key is missing!" }, { status: 500 });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        initialMessage,
        { role: "user", content: message }
      ],
      max_tokens: 200,
    });

    const reply = response.choices[0]?.message?.content || "No response generated.";
    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("Unhandled error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred.", details: error.message },
      { status: 500 }
    );
  }
}

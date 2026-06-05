import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: `You are Justin Baughn's design leadership assistant. 
Help visitors understand Justin's approach to design, leadership, and building AI-native experiences.`,
    messages,
  });

  return result.toDataStreamResponse();
}

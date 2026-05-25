import { buildSummaryPrompt } from "@/lib/prompts/summaryPrompt";

const ANTHROPIC_MESSAGES_URL = "https://api.anthropic.com/v1/messages";

export async function generateAnthropicSummary(auditResult) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const response = await fetch(ANTHROPIC_MESSAGES_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
      max_tokens: 220,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: buildSummaryPrompt(auditResult),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic summary request failed: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content
    ?.filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  if (!text) {
    throw new Error("Anthropic returned an empty summary");
  }

  return {
    text,
    source: "anthropic",
    model: data.model,
  };
}

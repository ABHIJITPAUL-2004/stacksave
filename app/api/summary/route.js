import { NextResponse } from "next/server";
import { generateAnthropicSummary } from "@/lib/ai/anthropic";
import { buildFallbackSummary } from "@/lib/summaries/fallbackSummary";

export async function POST(request) {
  let auditResult;

  try {
    const body = await request.json();
    auditResult = body.auditResult;

    if (!auditResult) {
      return NextResponse.json(
        { error: "auditResult is required" },
        { status: 400 }
      );
    }

    const summary = await generateAnthropicSummary(auditResult);

    return NextResponse.json({
      summary: summary.text,
      source: summary.source,
      model: summary.model,
    });
  } catch (error) {
    if (!auditResult) {
      return NextResponse.json(
        { error: "Unable to generate summary" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      summary: buildFallbackSummary(auditResult),
      source: "fallback",
      model: null,
      error: error.message,
    });
  }
}

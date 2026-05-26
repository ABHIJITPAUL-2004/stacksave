import { describe, expect, it } from "vitest";
import {
  createRecommendation,
  sortRecommendations,
} from "@/lib/auditEngine/recommendationEngine";

describe("recommendationEngine", () => {
  it("creates recommendations with monthly and annual savings", () => {
    const recommendation = createRecommendation({
      id: "cursor-seat-count",
      type: "seat-inefficiency",
      tool: { name: "Cursor" },
      currentPlan: { name: "Business" },
      recommendedPlan: { name: "Business" },
      currentMonthlySpend: 400,
      optimizedMonthlySpend: 240,
      action: "Reduce unused seats.",
      reason: "Seat count is higher than team size.",
    });

    expect(recommendation).toMatchObject({
      id: "cursor-seat-count",
      tool: "Cursor",
      monthlySavings: 160,
      annualSavings: 1920,
    });
  });

  it("sorts recommendations by savings, then tool name", () => {
    const sorted = sortRecommendations([
      { tool: "Gemini", monthlySavings: 50 },
      { tool: "Claude", monthlySavings: 200 },
      { tool: "ChatGPT", monthlySavings: 200 },
    ]);

    expect(sorted.map((recommendation) => recommendation.tool)).toEqual([
      "ChatGPT",
      "Claude",
      "Gemini",
    ]);
  });
});

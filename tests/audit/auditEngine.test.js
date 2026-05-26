import { describe, expect, it } from "vitest";
import { runAudit } from "@/lib/auditEngine";

describe("runAudit", () => {
  it("returns a stable audit result with totals, tools, and recommendations", () => {
    const result = runAudit({
      teamSize: 5,
      primaryUseCase: "writing",
      tools: [
        {
          toolId: "github-copilot",
          planId: "enterprise",
          monthlySpend: 390,
          seats: 10,
        },
        {
          toolId: "chatgpt",
          planId: "team",
          monthlySpend: 150,
          seats: 5,
        },
      ],
    });

    expect(result.totalMonthlySpend).toBe(540);
    expect(result.totalMonthlySavings).toBeGreaterThan(0);
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
    expect(result.tools).toHaveLength(2);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it("handles empty input without crashing", () => {
    const result = runAudit(null);

    expect(result.totalMonthlySpend).toBe(0);
    expect(result.status).toBe("optimized");
    expect(result.tools).toEqual([]);
  });
});

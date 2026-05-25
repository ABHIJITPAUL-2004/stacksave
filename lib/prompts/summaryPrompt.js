import { formatCurrency } from "@/utils/format";

export function buildSummaryPrompt(auditResult) {
  const topRecommendations = auditResult.recommendations
    .filter((recommendation) => recommendation.monthlySavings > 0)
    .slice(0, 4)
    .map(
      (recommendation) =>
        `- ${recommendation.tool}: ${recommendation.action} Savings: ${formatCurrency(
          recommendation.monthlySavings
        )}/mo. Reason: ${recommendation.reason}`
    )
    .join("\n");

  return `You are writing a concise SaaS spend audit summary for a startup founder.

Rules:
- Around 100 words.
- Sound financially aware, calm, and actionable.
- Do not invent calculations.
- Do not mention that you are an AI.
- Use the exact savings numbers provided.
- Focus on why the savings exist and what the founder should do next.

Audit facts:
- Current monthly spend: ${formatCurrency(auditResult.totalMonthlySpend)}
- Optimized monthly spend: ${formatCurrency(auditResult.optimizedMonthlySpend)}
- Monthly savings: ${formatCurrency(auditResult.totalMonthlySavings)}
- Annual savings: ${formatCurrency(auditResult.totalAnnualSavings)}
- Status: ${auditResult.status}

Top recommendations:
${topRecommendations || "- Current setup is already reasonably optimized."}

Write the summary now.`;
}

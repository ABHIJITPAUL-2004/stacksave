import { createRecommendation } from "@/lib/auditEngine/recommendationEngine";
import { sumBy } from "@/lib/auditEngine/savingsCalculator";

const GROUP_LABELS = {
  "general-assistant": "general AI assistants",
  "coding-assistant": "coding assistants",
  "api-inference": "LLM API vendors",
};

export function evaluateVendorConsolidation(tools, context) {
  const groups = tools.reduce((acc, entry) => {
    const group = entry.tool?.overlapGroup;
    if (!group || entry.monthlySpend <= 0) return acc;

    return {
      ...acc,
      [group]: [...(acc[group] || []), entry],
    };
  }, {});

  return Object.entries(groups)
    .filter(([, entries]) => entries.length > 1)
    .map(([group, entries]) => {
      const currentMonthlySpend = sumBy(entries, (entry) => entry.monthlySpend);
      const smallestSpend = Math.min(
        ...entries.map((entry) => entry.monthlySpend)
      );
      const optimizedMonthlySpend = currentMonthlySpend - Math.round(smallestSpend * 0.6);
      const toolNames = entries.map((entry) => entry.tool.name).join(", ");

      return createRecommendation({
        id: `${group}-consolidation`,
        type: "vendor-consolidation",
        severity: currentMonthlySpend >= 300 ? "high" : "medium",
        tool: { name: "Stack consolidation" },
        currentPlan: { name: GROUP_LABELS[group] || "Overlapping tools" },
        recommendedPlan: { name: "Primary vendor plus limited backup" },
        currentMonthlySpend,
        optimizedMonthlySpend,
        action: `Consolidate overlapping spend across ${toolNames}.`,
        reason: `The stack has multiple ${GROUP_LABELS[group] || "overlapping tools"}. For a ${context.primaryUseCase} team, keeping one primary tool and limiting secondary licenses is usually cheaper than fully licensing every option.`,
      });
    });
}

export function evaluateLowSavingsState(recommendations, totals) {
  if (recommendations.length > 0 || totals.totalMonthlySpend <= 0) {
    return [];
  }

  return [
    {
      id: "already-optimized",
      type: "optimized-state",
      severity: "info",
      tool: "Stack",
      currentPlan: "Current setup",
      recommendedPlan: "No immediate change",
      currentMonthlySpend: totals.totalMonthlySpend,
      optimizedMonthlySpend: totals.totalMonthlySpend,
      monthlySavings: 0,
      annualSavings: 0,
      action: "Keep monitoring renewals and seat assignment monthly.",
      reason:
        "Your current setup is already reasonably optimized based on the available plan and seat data.",
    },
  ];
}

import { calculateSavings } from "@/lib/auditEngine/savingsCalculator";

export function createRecommendation({
  id,
  type,
  severity = "medium",
  tool,
  currentPlan,
  recommendedPlan,
  currentMonthlySpend,
  optimizedMonthlySpend,
  action,
  reason,
}) {
  const { monthlySavings, annualSavings } = calculateSavings(
    currentMonthlySpend,
    optimizedMonthlySpend
  );

  return {
    id,
    type,
    severity,
    tool: tool?.name || "Stack",
    currentPlan: currentPlan?.name || "Current setup",
    recommendedPlan: recommendedPlan?.name || "Optimized setup",
    currentMonthlySpend,
    optimizedMonthlySpend,
    monthlySavings,
    annualSavings,
    action,
    reason,
  };
}

export function sortRecommendations(recommendations) {
  return [...recommendations].sort((a, b) => {
    if (b.monthlySavings !== a.monthlySavings) {
      return b.monthlySavings - a.monthlySavings;
    }

    return a.tool.localeCompare(b.tool);
  });
}

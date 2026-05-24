import { createRecommendation } from "@/lib/auditEngine/recommendationEngine";
import { calculateMonthlySpend } from "@/lib/auditEngine/savingsCalculator";

export function evaluateSeatInefficiency(toolEntry, context) {
  const { tool, currentPlan, seats, monthlySpend } = toolEntry;
  if (!tool || !currentPlan || !currentPlan.monthlyPrice) return null;

  if (seats <= context.teamSize) return null;

  const optimizedSeats = Math.max(context.teamSize, 1);
  const optimizedSpend = calculateMonthlySpend(currentPlan, optimizedSeats);

  return createRecommendation({
    id: `${tool.id}-seat-count`,
    type: "seat-inefficiency",
    severity: "high",
    tool,
    currentPlan,
    recommendedPlan: currentPlan,
    currentMonthlySpend: monthlySpend,
    optimizedMonthlySpend: optimizedSpend,
    action: `Reduce ${tool.name} seats from ${seats} to ${optimizedSeats}.`,
    reason: `Seat count is higher than the declared team size. Finance teams usually treat this as the first cleanup pass because it preserves the plan while removing unassigned licenses.`,
  });
}

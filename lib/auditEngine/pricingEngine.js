import { getPricingPlan, getPricingTool } from "@/data/pricing";
import { calculateMonthlySpend, toNumber } from "@/lib/auditEngine/savingsCalculator";

export function getCurrentPlan(toolEntry) {
  return getPricingPlan(toolEntry.toolId, toolEntry.planId);
}

export function enrichToolEntry(toolEntry) {
  const tool = getPricingTool(toolEntry.toolId);
  const currentPlan = getCurrentPlan(toolEntry);
  const seats = Math.max(toNumber(toolEntry.seats), 0);
  const calculatedSpend = calculateMonthlySpend(currentPlan, seats);
  const monthlySpend =
    calculatedSpend > 0 ? calculatedSpend : toNumber(toolEntry.monthlySpend);

  return {
    ...toolEntry,
    seats,
    monthlySpend,
    tool,
    currentPlan,
  };
}

export function findBestFitPlan(tool, seats) {
  if (!tool) return null;

  const paidPlans = tool.plans.filter((plan) => plan.monthlyPrice > 0);
  const candidates = paidPlans.filter((plan) => {
    const aboveMinimum = seats >= toNumber(plan.minSeats, 1);
    const belowMaximum =
      plan.maxPracticalSeats === null || seats <= plan.maxPracticalSeats;

    return aboveMinimum && belowMaximum && !plan.isEnterprise;
  });

  return candidates[0] || paidPlans[0] || tool.plans[0];
}

export function getPlanRank(tool, planId) {
  return Math.max(tool?.planOrder?.indexOf(planId) ?? -1, 0);
}

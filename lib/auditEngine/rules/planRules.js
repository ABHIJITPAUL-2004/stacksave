import {
  findBestFitPlan,
  getPlanRank,
} from "@/lib/auditEngine/pricingEngine";
import { createRecommendation } from "@/lib/auditEngine/recommendationEngine";
import { calculateMonthlySpend } from "@/lib/auditEngine/savingsCalculator";

export function evaluatePlanDowngrade(toolEntry, context) {
  const { tool, currentPlan, seats, monthlySpend } = toolEntry;
  if (!tool || !currentPlan || currentPlan.isUsageBased) return null;

  const recommendedPlan = findBestFitPlan(tool, seats);
  if (!recommendedPlan) return null;

  const currentRank = getPlanRank(tool, currentPlan.id);
  const recommendedRank = getPlanRank(tool, recommendedPlan.id);

  if (recommendedRank >= currentRank) return null;

  const optimizedSpend = calculateMonthlySpend(recommendedPlan, seats);

  return createRecommendation({
    id: `${tool.id}-plan-fit`,
    type: "plan-downgrade",
    severity: monthlySpend - optimizedSpend >= 100 ? "high" : "medium",
    tool,
    currentPlan,
    recommendedPlan,
    currentMonthlySpend: monthlySpend,
    optimizedMonthlySpend: optimizedSpend,
    action: `Move ${tool.name} from ${currentPlan.name} to ${recommendedPlan.name}.`,
    reason: `${currentPlan.name} is oversized for ${seats} seat${
      seats === 1 ? "" : "s"
    }. For a ${context.teamSize}-person team, ${recommendedPlan.name} is the more financially rational plan.`,
  });
}

export function evaluateEnterpriseOverkill(toolEntry, context) {
  const { tool, currentPlan, seats, monthlySpend } = toolEntry;
  if (!tool || !currentPlan?.isEnterprise) return null;

  const recommendedPlan = findBestFitPlan(tool, seats);
  if (!recommendedPlan || recommendedPlan.id === currentPlan.id) return null;

  const optimizedSpend = calculateMonthlySpend(recommendedPlan, seats);

  return createRecommendation({
    id: `${tool.id}-enterprise-fit`,
    type: "enterprise-overprovisioning",
    severity: "high",
    tool,
    currentPlan,
    recommendedPlan,
    currentMonthlySpend: monthlySpend,
    optimizedMonthlySpend: optimizedSpend,
    action: `Replace ${tool.name} Enterprise with ${recommendedPlan.name} until scale justifies enterprise controls.`,
    reason: `Enterprise plans usually make sense when procurement, SSO, audit logs, or large seat management are must-haves. With ${context.teamSize} team members and ${seats} seats, this looks overprovisioned.`,
  });
}

export function evaluateUseCaseMismatch(toolEntry, context) {
  const { tool, currentPlan, monthlySpend } = toolEntry;
  if (!tool || !currentPlan || monthlySpend === 0) return null;

  const codingToolOutsideCoding =
    tool.category === "coding" &&
    !["coding", "mixed"].includes(context.primaryUseCase);

  if (!codingToolOutsideCoding) return null;

  const optimizedSpend = Math.round(monthlySpend * 0.75);

  return createRecommendation({
    id: `${tool.id}-use-case-fit`,
    type: "use-case-mismatch",
    severity: "low",
    tool,
    currentPlan,
    recommendedPlan: currentPlan,
    currentMonthlySpend: monthlySpend,
    optimizedMonthlySpend: optimizedSpend,
    action: `Review whether ${tool.name} is assigned to the right users for ${context.primaryUseCase} work.`,
    reason: `The primary use case does not fully match this tool category. A targeted rollout could trim roughly 25% of this spend without cutting core workflows.`,
  });
}

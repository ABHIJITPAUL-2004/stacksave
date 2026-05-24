import { enrichToolEntry } from "@/lib/auditEngine/pricingEngine";
import { sortRecommendations } from "@/lib/auditEngine/recommendationEngine";
import {
  calculateSavings,
  sumBy,
  toNumber,
} from "@/lib/auditEngine/savingsCalculator";
import {
  evaluateEnterpriseOverkill,
  evaluatePlanDowngrade,
  evaluateUseCaseMismatch,
} from "@/lib/auditEngine/rules/planRules";
import { evaluateSeatInefficiency } from "@/lib/auditEngine/rules/seatRules";
import {
  evaluateLowSavingsState,
  evaluateVendorConsolidation,
} from "@/lib/auditEngine/rules/stackRules";

function createContext(input) {
  return {
    teamSize: Math.max(toNumber(input?.teamSize, 1), 1),
    primaryUseCase: input?.primaryUseCase || "mixed",
  };
}

export function runAudit(input) {
  const context = createContext(input);
  const tools = (input?.tools || [])
    .map(enrichToolEntry)
    .filter((entry) => entry.tool && entry.currentPlan);

  const perToolRecommendations = tools.flatMap((entry) =>
    [
      evaluateSeatInefficiency(entry, context),
      evaluateEnterpriseOverkill(entry, context),
      evaluatePlanDowngrade(entry, context),
      evaluateUseCaseMismatch(entry, context),
    ].filter(Boolean)
  );

  const stackRecommendations = evaluateVendorConsolidation(tools, context);
  const recommendations = sortRecommendations([
    ...perToolRecommendations,
    ...stackRecommendations,
  ]);

  const totalMonthlySpend = sumBy(tools, (entry) => entry.monthlySpend);
  const recommendationSavings = sumBy(
    recommendations,
    (recommendation) => recommendation.monthlySavings
  );
  const optimizedMonthlySpend = Math.max(
    totalMonthlySpend - recommendationSavings,
    0
  );
  const totals = {
    totalMonthlySpend,
    optimizedMonthlySpend,
    ...calculateSavings(totalMonthlySpend, optimizedMonthlySpend),
  };

  const finalRecommendations = [
    ...recommendations,
    ...evaluateLowSavingsState(recommendations, totals),
  ];

  return {
    ...totals,
    totalMonthlySavings: totals.monthlySavings,
    totalAnnualSavings: totals.annualSavings,
    recommendationCount: recommendations.length,
    status:
      recommendations.length === 0
        ? "optimized"
        : totals.monthlySavings >= 300
          ? "high-opportunity"
          : "moderate-opportunity",
    tools: tools.map((entry) => ({
      toolId: entry.toolId,
      toolName: entry.tool.name,
      planName: entry.currentPlan.name,
      seats: entry.seats,
      monthlySpend: entry.monthlySpend,
      category: entry.tool.category,
    })),
    recommendations: finalRecommendations,
  };
}

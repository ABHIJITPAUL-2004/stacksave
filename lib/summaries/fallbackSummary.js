import { formatCurrency } from "@/utils/format";

export function buildFallbackSummary(auditResult) {
  const hasEnterpriseSignal = auditResult.recommendations.some(
    (recommendation) => recommendation.type === "enterprise-overprovisioning"
  );
  const hasHighSavings = auditResult.totalMonthlySavings > 500;
  const isOptimized = auditResult.status === "optimized";
  const topRecommendation = auditResult.recommendations.find(
    (recommendation) => recommendation.monthlySavings > 0
  );

  if (isOptimized) {
    return "Your current AI stack is already reasonably optimized based on the available plan, seat, and overlap data. The best next move is operational discipline: review assigned seats monthly, keep renewal dates visible, and revisit tool overlap as the team grows.";
  }

  if (hasEnterpriseSignal) {
    return `Your stack has meaningful savings potential, mainly from enterprise-grade plans that appear ahead of the team's current scale. StackSave found ${formatCurrency(
      auditResult.totalMonthlySavings
    )}/month, or ${formatCurrency(
      auditResult.totalAnnualSavings
    )}/year, in optimization opportunities. Start by rightsizing enterprise plans before cutting tools your team actively uses.`;
  }

  if (hasHighSavings) {
    return `StackSave found ${formatCurrency(
      auditResult.totalMonthlySavings
    )}/month in likely AI spend waste, equal to ${formatCurrency(
      auditResult.totalAnnualSavings
    )}/year. The biggest opportunity is ${
      topRecommendation?.tool || "your largest overlapping subscription"
    }. Prioritize plan rightsizing and vendor consolidation before adding new AI tools.`;
  }

  return `Your AI stack has moderate optimization room. StackSave found ${formatCurrency(
    auditResult.totalMonthlySavings
  )}/month, or ${formatCurrency(
    auditResult.totalAnnualSavings
  )}/year, in savings opportunities. The best next step is to review the highest-priority recommendation, clean up unused seats, and keep one primary tool per workflow.`;
}

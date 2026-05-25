import { formatCurrency } from "@/utils/format";

export function OptimizationInsights({ auditResult }) {
  const topRecommendation = auditResult.recommendations.find(
    (recommendation) => recommendation.monthlySavings > 0
  );

  const insights = [
    {
      label: "Highest leverage action",
      value: topRecommendation?.action || "Maintain current setup",
    },
    {
      label: "Tools analyzed",
      value: `${auditResult.tools.length} tools across the AI stack`,
    },
    {
      label: "Annualized impact",
      value: `${formatCurrency(
        auditResult.totalAnnualSavings
      )} if recommendations are applied`,
    },
  ];

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {insights.map((insight) => (
        <article
          key={insight.label}
          className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
        >
          <p className="text-sm text-slate-400">{insight.label}</p>
          <p className="mt-3 text-lg font-semibold leading-7 text-white">
            {insight.value}
          </p>
        </article>
      ))}
    </section>
  );
}

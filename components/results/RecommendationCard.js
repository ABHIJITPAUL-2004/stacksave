import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/utils/format";

export function RecommendationCard({ recommendation }) {
  const hasSavings = recommendation.monthlySavings > 0;

  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-white">
              {recommendation.tool}
            </h3>
            <Badge tone={hasSavings ? "success" : "neutral"}>
              {recommendation.type.replaceAll("-", " ")}
            </Badge>
          </div>
          <p className="mt-3 text-base font-medium text-slate-100">
            {recommendation.action}
          </p>
          <p className="mt-3 leading-7 text-slate-400">
            {recommendation.reason}
          </p>
        </div>

        <div className="min-w-40 rounded-lg border border-white/10 bg-[#0b0d14] p-4 text-left sm:text-right">
          <p className="text-sm text-slate-400">Monthly savings</p>
          <p className="mt-1 text-2xl font-semibold text-teal-200">
            {formatCurrency(recommendation.monthlySavings)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {formatCurrency(recommendation.annualSavings)} / year
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-500">Current</p>
          <p className="mt-1 text-slate-200">{recommendation.currentPlan}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-500">Recommended</p>
          <p className="mt-1 text-slate-200">
            {recommendation.recommendedPlan}
          </p>
        </div>
      </div>
    </article>
  );
}

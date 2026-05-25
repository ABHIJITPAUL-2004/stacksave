"use client";

import { runAudit } from "@/lib/auditEngine";
import { useStoredAuditInput } from "@/hooks/useStoredAuditInput";
import { AISummaryCard } from "@/components/results/AISummaryCard";
import { MetricCard } from "@/components/results/MetricCard";
import { OptimizationInsights } from "@/components/results/OptimizationInsights";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { ResultsCTA } from "@/components/results/ResultsCTA";
import { SavingsHero } from "@/components/results/SavingsHero";
import { SpendBreakdown } from "@/components/results/SpendBreakdown";
import { Button } from "@/components/ui/Button";

export function ResultsView() {
  const auditInput = useStoredAuditInput();
  const auditResult = auditInput ? runAudit(auditInput) : null;

  if (!auditResult) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No audit data found
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">
          Complete the spend form first. StackSave stores the current audit
          locally in your browser.
        </p>
        <div className="mt-6">
          <Button href="/audit">Open audit form</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SavingsHero auditResult={auditResult} />

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Current monthly spend"
          value={auditResult.totalMonthlySpend}
        />
        <MetricCard
          label="Optimized monthly spend"
          value={auditResult.optimizedMonthlySpend}
          tone="warning"
        />
        <MetricCard
          label="Annual savings"
          value={auditResult.totalAnnualSavings}
          tone="positive"
        />
      </section>

      <AISummaryCard auditResult={auditResult} />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <SpendBreakdown auditResult={auditResult} />
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
            Report readiness
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Shareable audit snapshot
          </h2>
          <p className="mt-3 leading-7 text-slate-400">
            This page is structured for future public URLs and Open Graph
            previews. Day 4 keeps sharing local while the report layout becomes
            product-ready.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-[#0b0d14] p-4">
              <p className="text-sm text-slate-400">Recommendations</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {auditResult.recommendationCount}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0b0d14] p-4">
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-1 text-lg font-semibold capitalize text-white">
                {auditResult.status.replaceAll("-", " ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <OptimizationInsights auditResult={auditResult} />

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
            Recommendations
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            Finance-aware actions
          </h2>
        </div>

        {auditResult.recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </section>

      <ResultsCTA auditResult={auditResult} />
    </div>
  );
}

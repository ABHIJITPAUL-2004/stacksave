"use client";

import Link from "next/link";
import { runAudit } from "@/lib/auditEngine";
import { useStoredAuditInput } from "@/hooks/useStoredAuditInput";
import { MetricCard } from "@/components/results/MetricCard";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatNumber } from "@/utils/format";

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
          Complete the spend form first. StackSave stores the current Day 3
          audit locally in your browser.
        </p>
        <div className="mt-6">
          <Button href="/audit">Open audit form</Button>
        </div>
      </div>
    );
  }

  const optimizedMessage =
    auditResult.status === "optimized"
      ? "Your current setup is already reasonably optimized."
      : `StackSave found ${formatCurrency(
          auditResult.totalMonthlySavings
        )} in monthly optimization opportunities.`;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
              Audit results
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              {optimizedMessage}
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              These recommendations are generated from deterministic business
              rules using plan pricing, seat counts, team size, and tool overlap.
            </p>
          </div>
          <Link
            href="/audit"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.09]"
          >
            Edit inputs
          </Link>
        </div>
      </section>

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

      <section className="rounded-xl border border-white/10 bg-[#0b0d14] p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-slate-400">Tools analyzed</p>
            <p className="mt-1 text-2xl font-semibold">
              {formatNumber(auditResult.tools.length)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Recommendations</p>
            <p className="mt-1 text-2xl font-semibold">
              {formatNumber(auditResult.recommendationCount)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Monthly savings</p>
            <p className="mt-1 text-2xl font-semibold text-teal-200">
              {formatCurrency(auditResult.totalMonthlySavings)}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
            Recommendations
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Finance-aware actions</h2>
        </div>

        {auditResult.recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </section>
    </div>
  );
}

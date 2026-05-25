import Link from "next/link";
import { ShareButton } from "@/components/results/ShareButton";
import { formatCurrency } from "@/utils/format";

export function SavingsHero({ auditResult }) {
  const savingsPercent =
    auditResult.totalMonthlySpend > 0
      ? Math.round(
          (auditResult.totalMonthlySavings / auditResult.totalMonthlySpend) *
            100
        )
      : 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.18),transparent_30%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
            Audit results
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight text-white sm:text-6xl">
            {formatCurrency(auditResult.totalMonthlySavings)}
            <span className="block text-2xl font-medium text-slate-300 sm:text-3xl">
              per month optimized
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            StackSave found {formatCurrency(auditResult.totalAnnualSavings)} in
            annualized optimization opportunities using deterministic spend
            rules, not AI calculations.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#05060a]/70 p-5 backdrop-blur">
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-slate-400">Savings rate</p>
              <p className="mt-1 text-4xl font-semibold text-teal-200">
                {savingsPercent}%
              </p>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-teal-300"
                style={{ width: `${Math.min(savingsPercent, 100)}%` }}
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/audit"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
              >
                Edit inputs
              </Link>
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

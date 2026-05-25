import { formatCurrency } from "@/utils/format";

export function SpendBreakdown({ auditResult }) {
  const maxSpend = Math.max(
    auditResult.totalMonthlySpend,
    auditResult.optimizedMonthlySpend,
    1
  );

  const rows = [
    {
      label: "Current monthly spend",
      value: auditResult.totalMonthlySpend,
      tone: "bg-rose-300",
    },
    {
      label: "Optimized monthly spend",
      value: auditResult.optimizedMonthlySpend,
      tone: "bg-teal-300",
    },
  ];

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
        Spend comparison
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Current vs optimized stack
      </h2>
      <div className="mt-6 space-y-5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="text-slate-300">{row.label}</span>
              <span className="font-semibold text-white">
                {formatCurrency(row.value)}
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/10">
              <div
                className={`h-3 rounded-full ${row.tone}`}
                style={{ width: `${Math.max((row.value / maxSpend) * 100, 2)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

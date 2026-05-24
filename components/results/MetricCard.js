import { formatCurrency } from "@/utils/format";

export function MetricCard({ label, value, tone = "neutral" }) {
  const tones = {
    neutral: "border-white/10 bg-white/[0.04]",
    positive: "border-teal-300/30 bg-teal-300/10",
    warning: "border-amber-300/30 bg-amber-300/10",
  };

  return (
    <div className={`rounded-xl border p-5 ${tones[tone]}`}>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">
        {formatCurrency(value)}
      </p>
    </div>
  );
}

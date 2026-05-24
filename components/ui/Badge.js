export function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "border-white/10 bg-white/[0.06] text-slate-300",
    success: "border-teal-300/30 bg-teal-300/10 text-teal-200",
    warning: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

import { CalendarDays, Mail } from "lucide-react";

export function ResultsCTA({ auditResult }) {
  const isPremiumOpportunity = auditResult.totalMonthlySavings > 500;

  if (isPremiumOpportunity) {
    return (
      <section className="rounded-2xl border border-teal-300/30 bg-teal-300/10 p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
              High-savings opportunity
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Book a Credex consultation
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              Your stack has enough potential savings to justify a deeper vendor
              and procurement review.
            </p>
          </div>
          <a
            href="mailto:credex@example.com?subject=StackSave%20consultation"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
          >
            <CalendarDays size={18} />
            Book consultation
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
            Keep optimizing
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Stay updated on future optimizations
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Your savings opportunity is modest today. Re-run the audit as your
            team adds tools, seats, or API usage.
          </p>
        </div>
        <a
          href="mailto:updates@example.com?subject=StackSave%20updates"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
        >
          <Mail size={18} />
          Get updates
        </a>
      </div>
    </section>
  );
}

import { CalendarDays, Mail } from "lucide-react";
import { LeadCaptureForm } from "@/components/lead-capture/LeadCaptureForm";

export function ResultsCTA({ auditInput, auditResult, publicId }) {
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
        </div>
        <div className="mt-2 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border border-teal-300/20 bg-[#05060a]/50 p-4">
            <div className="flex items-center gap-2 text-teal-200">
              <CalendarDays size={18} />
              <span className="text-sm font-semibold">Post-value capture</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Share your details after seeing the savings estimate. Credex may
              reach out when the opportunity is large enough to justify a deeper
              review.
            </p>
          </div>
          <LeadCaptureForm
            auditInput={auditInput}
            auditResult={auditResult}
            publicId={publicId}
            mode="premium"
          />
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
      </div>
      <div className="mt-2 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-xl border border-white/10 bg-[#0b0d14] p-4">
          <div className="flex items-center gap-2 text-slate-200">
            <Mail size={18} />
            <span className="text-sm font-semibold">Optimization updates</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Leave your email after seeing the report. We will use it for
            follow-up and future optimization updates.
          </p>
        </div>
        <LeadCaptureForm
          auditInput={auditInput}
          auditResult={auditResult}
          publicId={publicId}
        />
      </div>
    </section>
  );
}

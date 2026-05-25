"use client";

import { runAudit } from "@/lib/auditEngine";
import { useStoredAuditInput } from "@/hooks/useStoredAuditInput";
import { ResultsDashboard } from "@/components/results/ResultsDashboard";
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
    <ResultsDashboard auditInput={auditInput} auditResult={auditResult} />
  );
}

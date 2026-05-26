"use client";

import { Loader2, Mail } from "lucide-react";
import { useState } from "react";

export function LeadCaptureForm({
  auditInput,
  auditResult,
  auditId: initialAuditId,
  mode = "soft",
}) {
  const [formState, setFormState] = useState({
    email: "",
    companyName: "",
    role: "",
    teamSize: "",
    website: "",
  });
  const [submitState, setSubmitState] = useState({
    isSubmitting: false,
    message: "",
    error: "",
  });

  function updateField(field, value) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitState({ isSubmitting: true, message: "", error: "" });

    try {
      let auditId = initialAuditId || "";

      if (!auditId && auditInput) {
        setSubmitState({
          isSubmitting: true,
          message: "Saving audit report before linking your details...",
          error: "",
        });

        const auditResponse = await fetch("/api/audits", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ auditInput }),
        });
        const auditData = await auditResponse.json();

        if (!auditResponse.ok) {
          throw new Error(auditData.error || "Could not save audit report");
        }

        auditId = auditData.id || auditData.audit?.id || "";
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          auditId,
          auditResult,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not save your details");
      }

      setSubmitState({
        isSubmitting: false,
        message: data.duplicate
          ? "You are already on the follow-up list for this report."
          : "Saved. We will follow up with relevant optimization updates.",
        error: "",
      });
    } catch (error) {
      setSubmitState({
        isSubmitting: false,
        message: "",
        error: error.message || "Something went wrong. Please try again.",
      });
    }
  }

  const isHighSavings = auditResult.totalMonthlySavings > 500;

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
      <input
        className="hidden"
        tabIndex="-1"
        autoComplete="off"
        value={formState.website}
        onChange={(event) => updateField("website", event.target.value)}
        aria-hidden="true"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Work email
          </span>
          <input
            required
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="founder@company.com"
            className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0d14] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Company name
          </span>
          <input
            value={formState.companyName}
            onChange={(event) => updateField("companyName", event.target.value)}
            placeholder="Acme AI"
            className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0d14] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Role
          </span>
          <input
            value={formState.role}
            onChange={(event) => updateField("role", event.target.value)}
            placeholder="Founder, Finance, Eng"
            className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0d14] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-300">
          Team size
        </span>
        <input
          type="number"
          min="1"
          value={formState.teamSize}
          onChange={(event) => updateField("teamSize", event.target.value)}
          placeholder="25"
          className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0d14] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60"
        />
      </label>

      <button
        type="submit"
        disabled={submitState.isSubmitting}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState.isSubmitting ? <Loader2 size={18} /> : <Mail size={18} />}
        {submitState.isSubmitting
          ? "Saving..."
          : isHighSavings || mode === "premium"
            ? "Request Credex follow-up"
            : "Stay updated"}
      </button>

      {submitState.message ? (
        <p className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-3 text-sm text-teal-100">
          {submitState.message}
        </p>
      ) : null}

      {submitState.error ? (
        <p className="rounded-lg border border-rose-300/20 bg-rose-300/10 p-3 text-sm text-rose-200">
          {submitState.error}
        </p>
      ) : null}
    </form>
  );
}

"use client";

import { Database, Loader2 } from "lucide-react";
import { useState } from "react";
import { ShareButton } from "@/components/results/ShareButton";

export function SaveReportPanel({ auditInput, auditResult }) {
  const [state, setState] = useState({
    isSaving: false,
    publicUrl: "",
    error: "",
  });

  async function handleSaveReport() {
    setState({ isSaving: true, publicUrl: "", error: "" });

    try {
      const response = await fetch("/api/audits", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ auditInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not save audit");
      }

      setState({
        isSaving: false,
        publicUrl: data.url,
        error: "",
      });
    } catch (error) {
      setState({
        isSaving: false,
        publicUrl: "",
        error:
          error.message ||
          "Could not save this report. Check Supabase environment variables.",
      });
    }
  }

  const absoluteUrl =
    typeof window !== "undefined" && state.publicUrl
      ? `${window.location.origin}${state.publicUrl}`
      : "";

  return (
    <section className="rounded-xl border border-white/10 bg-[#0b0d14] p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
            Persistent report
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Save report and generate a public URL
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            This writes the public-safe audit result to Supabase. Private lead
            details are not included in the shared report.
          </p>
        </div>

        {state.publicUrl ? (
          <ShareButton url={absoluteUrl} />
        ) : (
          <button
            type="button"
            onClick={handleSaveReport}
            disabled={state.isSaving || !auditResult}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state.isSaving ? <Loader2 size={18} /> : <Database size={18} />}
            {state.isSaving ? "Saving..." : "Save report"}
          </button>
        )}
      </div>

      {state.publicUrl ? (
        <div className="mt-5 rounded-lg border border-teal-300/20 bg-teal-300/10 p-4">
          <p className="text-sm font-medium text-teal-100">
            Shareable report ready:
          </p>
          <a
            href={state.publicUrl}
            className="mt-2 block break-all text-sm text-teal-200 hover:text-teal-100"
          >
            {absoluteUrl}
          </a>
        </div>
      ) : null}

      {state.error ? (
        <p className="mt-4 rounded-lg border border-rose-300/20 bg-rose-300/10 p-3 text-sm text-rose-200">
          {state.error}
        </p>
      ) : null}
    </section>
  );
}

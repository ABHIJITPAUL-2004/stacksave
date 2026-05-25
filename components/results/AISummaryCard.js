"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { buildFallbackSummary } from "@/lib/summaries/fallbackSummary";
import { Badge } from "@/components/ui/Badge";

export function AISummaryCard({ auditResult }) {
  const [summaryState, setSummaryState] = useState({
    summary: buildFallbackSummary(auditResult),
    source: "fallback",
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadSummary() {
      try {
        const response = await fetch("/api/summary", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ auditResult }),
        });

        const data = await response.json();

        if (!isMounted) return;

        setSummaryState({
          summary: data.summary || buildFallbackSummary(auditResult),
          source: data.source || "fallback",
          isLoading: false,
        });
      } catch {
        if (!isMounted) return;

        setSummaryState({
          summary: buildFallbackSummary(auditResult),
          source: "fallback",
          isLoading: false,
        });
      }
    }

    loadSummary();

    return () => {
      isMounted = false;
    };
  }, [auditResult]);

  return (
    <section className="rounded-xl border border-white/10 bg-[#0b0d14] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-teal-300/10 text-teal-200">
            <Sparkles size={19} />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
              Founder summary
            </p>
            <h2 className="text-xl font-semibold text-white">
              Personalized audit narrative
            </h2>
          </div>
        </div>
        <Badge tone={summaryState.source === "anthropic" ? "success" : "neutral"}>
          {summaryState.isLoading
            ? "Generating"
            : summaryState.source === "anthropic"
              ? "AI summary"
              : "Fallback summary"}
        </Badge>
      </div>
      <p className="mt-5 text-lg leading-8 text-slate-300">
        {summaryState.summary}
      </p>
    </section>
  );
}

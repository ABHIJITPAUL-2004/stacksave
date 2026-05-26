"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function ResultsError({ reset }) {
  return (
    <main id="main-content" className="min-h-screen bg-[#05060a] text-white">
      <Navbar />
      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-rose-300/20 bg-rose-300/10 p-8 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-lg bg-rose-300/10 text-rose-200">
            <AlertTriangle size={22} aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-3xl font-semibold">
            Results could not load
          </h1>
          <p className="mt-3 leading-7 text-slate-300">
            The saved report may be unavailable, or the request may have failed.
            Retry before creating a new audit.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
          >
            <RotateCcw size={18} aria-hidden="true" />
            Retry
          </button>
        </div>
      </section>
    </main>
  );
}

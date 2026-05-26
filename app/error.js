"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#05060a] text-white">
        <main className="grid min-h-screen place-items-center px-5">
          <section className="max-w-xl rounded-xl border border-rose-300/20 bg-rose-300/10 p-8 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-lg bg-rose-300/10 text-rose-200">
              <AlertTriangle size={22} aria-hidden="true" />
            </div>
            <h1 className="mt-5 text-3xl font-semibold">
              Something went wrong
            </h1>
            <p className="mt-3 leading-7 text-slate-300">
              StackSave hit an unexpected error. Your browser-stored audit input
              should still be available if you retry.
            </p>
            {error?.message ? (
              <p className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-slate-400">
                {error.message}
              </p>
            ) : null}
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
            >
              <RotateCcw size={18} aria-hidden="true" />
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}

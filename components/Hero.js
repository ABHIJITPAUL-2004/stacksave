import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-teal-100">
            <span className="size-2 rounded-full bg-teal-300" />
            Built for startup AI spend audits
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
            Find where your AI tool budget is leaking.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            StackSave helps teams prepare for smarter audits across ChatGPT,
            Claude, Cursor, Copilot, Gemini, and other tools without adding
            complexity on day one.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/audit" icon={<ArrowRight size={18} />}>
              Start audit preview
            </Button>
            <Button href="#how-it-works" variant="secondary">
              See how it works
            </Button>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            {["No backend yet", "No auth yet", "Landing only"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-300" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30">
          <div className="rounded-xl border border-white/10 bg-[#0b0d14] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Monthly AI spend</p>
                <p className="mt-1 text-3xl font-semibold">$8,420</p>
              </div>
              <span className="rounded-full bg-rose-400/10 px-3 py-1 text-sm text-rose-200">
                +18%
              </span>
            </div>

            <div className="space-y-3">
              {[
                ["ChatGPT Team", "$2,140", "High"],
                ["Cursor", "$1,860", "Review"],
                ["GitHub Copilot", "$1,260", "Stable"],
                ["Claude", "$940", "Review"],
              ].map(([tool, spend, status]) => (
                <div
                  key={tool}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-white">{tool}</p>
                    <p className="text-sm text-slate-400">{status} usage signal</p>
                  </div>
                  <p className="font-semibold text-slate-100">{spend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

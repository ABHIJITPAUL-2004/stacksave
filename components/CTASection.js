import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section id="cta" className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-12 text-center sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
          Day 1 milestone
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
          A clean SaaS foundation ready for the audit engine later.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
          This version keeps the scope tight: no backend, no database, no auth,
          and no fake automation. Just a strong product shell.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="mailto:founder@example.com">Request early access</Button>
        </div>
      </div>
    </section>
  );
}

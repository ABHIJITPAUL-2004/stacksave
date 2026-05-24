import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section id="cta" className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-12 text-center sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
          Day 1 milestone
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
          A clean SaaS foundation ready for structured spend inputs.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
          Start with a focused form flow today. Backend, authentication, and
          automated analysis can arrive when the data model is clear.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/audit">Open audit form</Button>
        </div>
      </div>
    </section>
  );
}

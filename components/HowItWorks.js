import { howItWorks } from "@/data/landing";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="A simple workflow for Day 1"
          description="The first version focuses on clear positioning and a scalable surface for future audit modules."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {howItWorks.map((step) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="text-sm font-semibold text-teal-200">
                {step.step}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-400">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

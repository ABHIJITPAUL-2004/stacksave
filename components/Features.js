import { features } from "@/data/landing";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Features() {
  return (
    <section id="features" className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Features"
          title="Landing page promises that can become real modules"
          description="The copy stays honest for Day 1 while pointing toward the product this internship project can grow into."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-teal-300/40 hover:bg-white/[0.06]"
            >
              <div className="mb-5 grid size-11 place-items-center rounded-lg bg-teal-300/10 text-teal-200">
                <feature.icon size={21} />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

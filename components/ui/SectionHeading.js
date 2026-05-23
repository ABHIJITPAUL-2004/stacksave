export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-slate-400">{description}</p>
    </div>
  );
}

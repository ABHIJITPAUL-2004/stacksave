import { useCases } from "@/data/tools";
import { cn } from "@/utils/cn";

export function UseCaseSelector({ value, onChange, error }) {
  return (
    <div>
      <span className="mb-3 block text-sm font-medium text-slate-300">
        Primary use case
      </span>
      <div className="grid gap-2 sm:grid-cols-5">
        {useCases.map((useCase) => {
          const isSelected = value === useCase.id;

          return (
            <button
              key={useCase.id}
              type="button"
              onClick={() => onChange(useCase.id)}
              className={cn(
                "h-11 rounded-lg border px-3 text-sm font-medium transition",
                isSelected
                  ? "border-teal-300/60 bg-teal-300 text-slate-950"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
              )}
            >
              {useCase.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}

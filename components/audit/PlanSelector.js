import { getToolById } from "@/data/tools";

export function PlanSelector({ toolId, register, name, error }) {
  const plans = getToolById(toolId)?.plans || [];

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        Plan
      </span>
      <select
        {...register(name)}
        className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0d14] px-3 text-sm text-white outline-none transition focus:border-teal-300/60"
      >
        {plans.map((plan) => (
          <option key={plan.id} value={plan.id}>
            {plan.name}
            {plan.monthlyPrice !== null ? ` - $${plan.monthlyPrice}/mo` : ""}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </label>
  );
}

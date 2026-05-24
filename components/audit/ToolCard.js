import { Trash2 } from "lucide-react";
import { getDefaultPlanId, getToolById, supportedTools } from "@/data/tools";
import { PlanSelector } from "@/components/audit/PlanSelector";
import { SpendInput } from "@/components/audit/SpendInput";

export function ToolCard({
  index,
  register,
  watch,
  setValue,
  errors,
  onRemove,
  canRemove,
}) {
  const toolId = watch(`tools.${index}.toolId`);
  const selectedTool = getToolById(toolId);
  const toolErrors = errors?.tools?.[index] || {};

  function handleToolChange(event) {
    const nextToolId = event.target.value;
    setValue(`tools.${index}.toolId`, nextToolId, { shouldValidate: true });
    setValue(`tools.${index}.planId`, getDefaultPlanId(nextToolId), {
      shouldValidate: true,
    });
  }

  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-teal-200">
            Tool {index + 1}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">
            {selectedTool?.name || "AI tool"}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {selectedTool
              ? `${selectedTool.vendor} · ${selectedTool.category}`
              : "Choose a supported AI product"}
          </p>
        </div>

        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-rose-400/10 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Remove tool ${index + 1}`}
        >
          <Trash2 size={17} />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Tool name
          </span>
          <select
            value={toolId}
            onChange={handleToolChange}
            className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0d14] px-3 text-sm text-white outline-none transition focus:border-teal-300/60"
          >
            {supportedTools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
          <input type="hidden" {...register(`tools.${index}.toolId`)} />
          {toolErrors.toolId ? (
            <p className="mt-2 text-sm text-rose-300">
              {toolErrors.toolId.message}
            </p>
          ) : null}
        </label>

        <PlanSelector
          toolId={toolId}
          register={register}
          name={`tools.${index}.planId`}
          error={toolErrors.planId?.message}
        />

        <SpendInput
          label="Monthly spend"
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          placeholder="0"
          {...register(`tools.${index}.monthlySpend`)}
          error={toolErrors.monthlySpend?.message}
        />

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Number of seats
          </span>
          <input
            type="number"
            min="1"
            inputMode="numeric"
            {...register(`tools.${index}.seats`)}
            className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60 focus:bg-white/[0.07]"
          />
          {toolErrors.seats ? (
            <p className="mt-2 text-sm text-rose-300">
              {toolErrors.seats.message}
            </p>
          ) : null}
        </label>
      </div>
    </article>
  );
}

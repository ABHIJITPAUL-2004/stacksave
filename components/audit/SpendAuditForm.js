"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, RotateCcw, Save } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { ToolCard } from "@/components/audit/ToolCard";
import { TeamSizeInput } from "@/components/audit/TeamSizeInput";
import { UseCaseSelector } from "@/components/audit/UseCaseSelector";
import { getDefaultPlanId } from "@/data/tools";
import { auditSchema, defaultAuditValues } from "@/lib/auditSchema";

const STORAGE_KEY = "stacksave.auditForm.v1";

function createToolEntry(toolId = "chatgpt") {
  return {
    toolId,
    planId: getDefaultPlanId(toolId),
    monthlySpend: 0,
    seats: 1,
  };
}

export function SpendAuditForm() {
  const [lastSavedAt, setLastSavedAt] = useState("");
  const hasLoadedSavedForm = useRef(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(auditSchema),
    defaultValues: defaultAuditValues,
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tools",
  });

  const formValues = useWatch({ control });

  useEffect(() => {
    const savedForm = window.localStorage.getItem(STORAGE_KEY);

    if (savedForm) {
      try {
        reset(JSON.parse(savedForm));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    hasLoadedSavedForm.current = true;
  }, [reset]);

  useEffect(() => {
    if (!hasLoadedSavedForm.current) return;

    const timeoutId = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
      setLastSavedAt(new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [formValues]);

  const totals = useMemo(() => {
    const tools = formValues.tools || [];

    return tools.reduce(
      (summary, tool) => ({
        monthlySpend: summary.monthlySpend + Number(tool.monthlySpend || 0),
        seats: summary.seats + Number(tool.seats || 0),
      }),
      { monthlySpend: 0, seats: 0 }
    );
  }, [formValues.tools]);

  function onSubmit(values) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    setLastSavedAt("just now");
  }

  function handleReset() {
    reset(defaultAuditValues);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <section className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <div className="grid gap-5 md:grid-cols-[240px_1fr]">
            <TeamSizeInput
              register={register}
              error={errors.teamSize?.message}
            />

            <Controller
              control={control}
              name="primaryUseCase"
              render={({ field }) => (
                <UseCaseSelector
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.primaryUseCase?.message}
                />
              )}
            />
          </div>
        </section>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <ToolCard
              key={field.id}
              index={index}
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
              onRemove={() => remove(index)}
              canRemove={fields.length > 1}
            />
          ))}
        </div>

        {errors.tools?.message ? (
          <p className="text-sm text-rose-300">{errors.tools.message}</p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => append(createToolEntry("claude"))}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.09]"
          >
            <Plus size={18} />
            Add another tool
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-transparent px-5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
          >
            <RotateCcw size={17} />
            Reset form
          </button>
        </div>
      </div>

      <aside className="h-fit rounded-xl border border-white/10 bg-[#0b0d14] p-5 lg:sticky lg:top-24">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
          Input summary
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Spend data draft
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          This panel only summarizes the data being collected. Audit scoring and
          AI analysis are intentionally left for a later day.
        </p>

        <div className="mt-6 grid gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-slate-400">Monthly spend entered</p>
            <p className="mt-1 text-2xl font-semibold">
              ${totals.monthlySpend.toLocaleString()}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">Tools</p>
              <p className="mt-1 text-xl font-semibold">{fields.length}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">Seats</p>
              <p className="mt-1 text-xl font-semibold">{totals.seats}</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-950/30 transition hover:bg-teal-200"
        >
          <Save size={18} />
          Save spend inputs
        </button>

        {isSubmitted && !Object.keys(errors).length ? (
          <p className="mt-3 text-sm text-teal-200">
            Form is valid and saved locally.
          </p>
        ) : null}

        <p className="mt-4 text-xs text-slate-500">
          {lastSavedAt ? `Autosaved at ${lastSavedAt}` : "Autosave ready"}
        </p>
      </aside>
    </form>
  );
}

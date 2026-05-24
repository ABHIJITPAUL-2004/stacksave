export function TeamSizeInput({ register, error }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        Team size
      </span>
      <input
        type="number"
        min="1"
        inputMode="numeric"
        {...register("teamSize")}
        className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60 focus:bg-white/[0.07]"
      />
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </label>
  );
}

export function SpendInput({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
          $
        </span>
        <input
          {...props}
          className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-8 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60 focus:bg-white/[0.07]"
        />
      </div>
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </label>
  );
}

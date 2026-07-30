export default function FormField({ id, label, error, ...inputProps }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        {...inputProps}
        aria-invalid={Boolean(error)}
        className="h-12 rounded-xl border border-slate-300 px-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

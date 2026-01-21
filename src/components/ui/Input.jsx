const inputBase = "w-full rounded-xl bg-white px-4 py-3 text-slate-900 ring-1 ring-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-950/40 dark:text-slate-100 dark:ring-slate-800 dark:placeholder:text-slate-500";

export function TextInput({ className = "", ...props }) {
  const classes = `${inputBase} ${className}`.trim();
  return <input className={classes} {...props} />;
}

export function LabeledField({ label, hint, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{label}</span>
      {children}
      {hint ? <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{hint}</p> : null}
    </label>
  );
}

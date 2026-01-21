const base = "rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400";

const variants = {
  neutral: "bg-slate-100 text-slate-900 ring-1 ring-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-700",
  ghost: "bg-white text-slate-900 ring-1 ring-slate-300 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800 dark:hover:bg-slate-800",
  primary: "bg-indigo-500 text-white hover:bg-indigo-400 focus:ring-indigo-300",
};

export default function Button({
  type = "button",
  variant = "neutral",
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant] || variants.neutral} ${className}`.trim();
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

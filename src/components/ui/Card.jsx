const panelBase = "rounded-2xl bg-white ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/60 dark:ring-slate-800";
const statBase = "rounded-2xl bg-slate-50 ring-1 ring-slate-200 dark:bg-slate-950/40 dark:ring-slate-800";

export function Panel({ as: Tag = "section", className = "", children }) {
  const classes = `${panelBase} ${className}`.trim();
  return <Tag className={classes}>{children}</Tag>;
}

export function StatCard({ className = "", children }) {
  const classes = `${statBase} ${className}`.trim();
  return <div className={classes}>{children}</div>;
}

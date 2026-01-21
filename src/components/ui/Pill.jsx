export default function Pill({ className = "", children, ...props }) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1";
  const classes = `${base} ${className}`.trim();
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

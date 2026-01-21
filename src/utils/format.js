export const fmt = (value, digits = 2) => (Number.isFinite(value) ? value.toFixed(digits) : "—");

// Formatea cantidades con fracciones simples (½, ¼, ¾...)
export const fmt = (n) => {
  const r = Math.round(n * 100) / 100;
  const fr = { 0.25: "¼", 0.5: "½", 0.75: "¾", 0.33: "⅓", 0.67: "⅔" };
  const w = Math.floor(r);
  const d = Math.round((r - w) * 100) / 100;
  if (fr[d]) return (w ? w + " " : "") + fr[d];
  return String(r);
};

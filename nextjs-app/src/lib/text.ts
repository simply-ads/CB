/**
 * Split a multiline CMS string into paragraphs. Tolerates both literal YAML
 * blocks (blank-line separated → "\n\n") and folded blocks (single "\n").
 */
export function paras(s?: string | null): string[] {
  const t = (s ?? "").trim();
  if (!t) return [];
  const byBlank = t.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
  if (byBlank.length > 1) return byBlank;
  return t.split(/\n+/).map((x) => x.trim()).filter(Boolean);
}

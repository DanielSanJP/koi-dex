/** Free text -> prefix-matching tsquery ("kohaku bre" -> kohaku & bre:*).
    Everything except letters, digits, spaces and inner hyphens is stripped
    and every word must contain a letter or digit, so user input cannot break
    the query; the string is still passed to Postgres as a bound parameter. */
export function toTsQuery(input: string): string | null {
  const words = input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^-+|-+$/g, ""))
    .filter((w) => /[\p{L}\p{N}]/u.test(w))
    .slice(0, 6);
  if (words.length === 0) return null;
  return words.map((w, i) => (i === words.length - 1 ? `${w}:*` : w)).join(" & ");
}

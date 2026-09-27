export type Orientation = "portrait" | "landscape";

/**
 * Book pages visible for a page-flip index. With `showCover`, the first and
 * last pages sit alone; landscape spreads start on odd indices (1-2, 3-4…).
 */
export function visibleIndices(index: number, total: number, orientation: Orientation): number[] {
  const last = total - 1;
  const i = Math.min(Math.max(index, 0), last);
  if (orientation === "portrait" || i === 0 || i === last) return [i];
  const left = i % 2 === 1 ? i : i - 1;
  return left + 1 <= last - 1 ? [left, left + 1] : [left];
}

/** "1 / 24" for a single page, "2–3 / 24" for a spread. */
export function pageLabel(indices: number[], total: number): string {
  const first = indices[0] + 1;
  const last = indices[indices.length - 1] + 1;
  return first === last ? `${first} / ${total}` : `${first}–${last} / ${total}`;
}

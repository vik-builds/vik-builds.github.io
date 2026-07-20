/** Format a date for display, e.g. "20 July 2026". Locale fixed to en-AU. */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Format a date as an ISO date string for <time datetime="…">. */
export function isoDate(date: Date): string {
  return date.toISOString().split('T')[0]!;
}

/** Unique, sorted tag list across items carrying a tags array. */
export function collectTags(items: { data: { tags?: string[] } }[]): string[] {
  const set = new Set<string>();
  for (const item of items) for (const tag of item.data.tags ?? []) set.add(tag);
  return [...set].sort((a, b) => a.localeCompare(b));
}

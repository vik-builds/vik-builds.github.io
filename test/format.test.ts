import { describe, it, expect } from 'vitest';
import { formatDate, isoDate, collectTags } from '../src/lib/format';

describe('formatDate', () => {
  it('formats a UTC date in en-AU long form', () => {
    expect(formatDate(new Date('2026-07-20T00:00:00Z'))).toBe('20 July 2026');
  });

  it('does not shift across timezone boundaries', () => {
    expect(formatDate(new Date('2026-01-01T00:00:00Z'))).toBe('1 January 2026');
  });
});

describe('isoDate', () => {
  it('returns YYYY-MM-DD', () => {
    expect(isoDate(new Date('2026-07-20T13:45:00Z'))).toBe('2026-07-20');
  });
});

describe('collectTags', () => {
  it('returns unique sorted tags', () => {
    const items = [
      { data: { tags: ['networks', 'ai'] } },
      { data: { tags: ['ai', 'product'] } },
      { data: {} },
    ];
    expect(collectTags(items)).toEqual(['ai', 'networks', 'product']);
  });

  it('returns empty array when no tags exist', () => {
    expect(collectTags([{ data: {} }])).toEqual([]);
  });
});

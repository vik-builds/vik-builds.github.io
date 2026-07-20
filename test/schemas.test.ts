import { describe, it, expect } from 'vitest';
import { postSchema } from '../src/schemas/posts';
import { projectSchema } from '../src/schemas/projects';
import { researchSchema } from '../src/schemas/research';
import { nowSchema } from '../src/schemas/now';

describe('postSchema', () => {
  const valid = {
    title: 'A post',
    description: 'About something.',
    date: '2026-07-20',
  };

  it('applies defaults for draft and tags', () => {
    const parsed = postSchema.parse(valid);
    expect(parsed.draft).toBe(false);
    expect(parsed.tags).toEqual([]);
  });

  it('coerces date strings to Date', () => {
    expect(postSchema.parse(valid).date).toBeInstanceOf(Date);
  });

  it('rejects a missing title', () => {
    expect(() => postSchema.parse({ ...valid, title: undefined })).toThrow();
  });

  it('rejects an empty title', () => {
    expect(() => postSchema.parse({ ...valid, title: '' })).toThrow();
  });

  it('requires heroAlt when heroImage is present', () => {
    expect(() => postSchema.parse({ ...valid, heroImage: '/a.png' })).toThrow();
    expect(() =>
      postSchema.parse({ ...valid, heroImage: '/a.png', heroAlt: 'A picture' })
    ).not.toThrow();
  });
});

describe('projectSchema', () => {
  const valid = { title: 'Thing', blurb: 'Did a thing.', role: 'Builder', year: 2025 };

  it('defaults featured to false and stack to empty', () => {
    const parsed = projectSchema.parse(valid);
    expect(parsed.featured).toBe(false);
    expect(parsed.stack).toEqual([]);
  });

  it('accepts optional links', () => {
    const parsed = projectSchema.parse({ ...valid, links: { repo: 'https://x.dev' } });
    expect(parsed.links?.repo).toBe('https://x.dev');
  });

  it('rejects a non-URL repo link', () => {
    expect(() => projectSchema.parse({ ...valid, links: { repo: 'not-a-url' } })).toThrow();
  });

  it('rejects an implausible year', () => {
    expect(() => projectSchema.parse({ ...valid, year: 1800 })).toThrow();
  });
});

describe('researchSchema', () => {
  const valid = {
    title: 'A paper',
    authors: ['V. Subramanian'],
    venue: 'A journal',
    year: 2017,
    abstract: 'We did research.',
  };

  it('parses a valid entry', () => {
    expect(researchSchema.parse(valid).authors).toHaveLength(1);
  });

  it('rejects an empty authors array', () => {
    expect(() => researchSchema.parse({ ...valid, authors: [] })).toThrow();
  });
});

describe('nowSchema', () => {
  it('coerces updated to a Date', () => {
    expect(nowSchema.parse({ updated: '2026-07-20' }).updated).toBeInstanceOf(Date);
  });

  it('rejects a missing updated field', () => {
    expect(() => nowSchema.parse({})).toThrow();
  });
});

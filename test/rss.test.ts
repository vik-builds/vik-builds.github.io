import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

/** Every .html file emitted by the build. */
function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

describe('RSS affordance', () => {
  // These assertions describe the deployed artifact, so they need a build. Running
  // them against a missing dist/ would pass vacuously, which is worse than failing.
  if (!existsSync(DIST)) {
    it('requires a build', () => {
      throw new Error('dist/ not found: run `npm run build` before `npm test`.');
    });
    return;
  }

  const feed = readFileSync(join(DIST, 'rss.xml'), 'utf8');
  const itemCount = (feed.match(/<item>/g) ?? []).length;
  const pages = htmlFiles(DIST).map((f) => readFileSync(f, 'utf8'));

  const withFooterLink = pages.filter((html) => /href="\/rss\.xml"/.test(html));
  const withAutodiscovery = pages.filter((html) =>
    /rel="alternate"[^>]*application\/rss\+xml/.test(html)
  );

  // The invariant, stated once and checked in both directions: an empty feed must
  // not be advertised, and a non-empty one must be. This holds whatever the current
  // draft state is, so publishing a post does not require editing this test.
  it('advertises the feed in the footer only when it has items', () => {
    expect(withFooterLink.length > 0).toBe(itemCount > 0);
  });

  it('emits <link rel="alternate"> autodiscovery only when the feed has items', () => {
    expect(withAutodiscovery.length > 0).toBe(itemCount > 0);
  });

  it('keeps the feed itself reachable and well-formed either way', () => {
    // The route always builds; only the pointers to it are conditional. A reader
    // that already has the URL subscribed should never start 404ing.
    expect(feed).toMatch(/<rss version="2\.0">/);
    expect(feed).toContain('<language>en-au</language>');
  });
});

import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/** Published posts, newest first. Drafts are excluded in production builds only. */
export async function getPublishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Whether the feed has anything in it.
 *
 * The rss.xml route always builds, so an existing subscription never starts
 * 404ing. What is conditional is every pointer AT the feed (the footer link and
 * the <head> autodiscovery tag), because advertising an empty feed sends readers
 * and crawlers to a dead end. Both come back on their own once a post ships.
 */
export async function hasPublishedPosts(): Promise<boolean> {
  return (await getPublishedPosts()).length > 0;
}

/** All projects, featured first, then by year descending. */
export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    if (a.data.year !== b.data.year) return b.data.year - a.data.year;
    return (a.data.order ?? 0) - (b.data.order ?? 0);
  });
}

/** Research entries, newest first. */
export async function getResearch(): Promise<CollectionEntry<'research'>[]> {
  const entries = await getCollection('research');
  return entries.sort((a, b) => b.data.year - a.data.year);
}

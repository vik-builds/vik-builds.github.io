import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/** All roles in reverse-chronological order, most recent first. */
export async function getExperience(): Promise<CollectionEntry<'experience'>[]> {
  const roles = await getCollection('experience');
  return roles.sort((a, b) => b.data.start.valueOf() - a.data.start.valueOf());
}

/** Roles flagged as featured, most recent first. Used on the homepage. */
export async function getFeaturedExperience(): Promise<CollectionEntry<'experience'>[]> {
  return (await getExperience()).filter((r) => r.data.featured);
}

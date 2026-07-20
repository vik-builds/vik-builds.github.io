import { z } from 'astro/zod';

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  /** Display string, e.g. "December 2024 – June 2026". */
  period: z.string().min(1),
  /** Sort key: the start date. Newest first. */
  start: z.coerce.date(),
  location: z.string().min(1),
  /** One or two sentences on what the work actually was. */
  summary: z.string().min(1),
  /** Optional bullets. Every entry must be verifiable from the CV. */
  highlights: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
  /** Marks the arc movement this role belongs to. Used to group the timeline. */
  movement: z.enum(['signals', 'networks', 'infrastructure', 'zero-to-one', 'platforms', 'products']),
  featured: z.boolean().default(false),
});

export type ExperienceFrontmatter = z.infer<typeof experienceSchema>;

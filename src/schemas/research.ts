import { z } from 'astro/zod';

export const researchSchema = z.object({
  title: z.string().min(1),
  authors: z.array(z.string()).min(1),
  venue: z.string().min(1),
  year: z.number().int().min(1990).max(2100),
  abstract: z.string().min(1),
  pdf: z.string().url().optional(),
  doi: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export type ResearchFrontmatter = z.infer<typeof researchSchema>;

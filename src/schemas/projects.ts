import { z } from 'astro/zod';

export const projectSchema = z.object({
  title: z.string().min(1),
  blurb: z.string().min(1),
  role: z.string().min(1),
  year: z.number().int().min(2010).max(2100),
  stack: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().optional(),
  links: z
    .object({
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      writeup: z.string().url().optional(),
    })
    .optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;

import { z } from 'astro/zod';

export const postSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
  })
  .refine((d) => !d.heroImage || (d.heroAlt && d.heroAlt.length > 0), {
    message: 'heroAlt is required when heroImage is set',
    path: ['heroAlt'],
  });

export type PostFrontmatter = z.infer<typeof postSchema>;

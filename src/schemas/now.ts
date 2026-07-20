import { z } from 'astro/zod';

export const nowSchema = z.object({
  updated: z.coerce.date(),
});

export type NowFrontmatter = z.infer<typeof nowSchema>;

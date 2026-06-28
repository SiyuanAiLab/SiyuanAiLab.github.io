import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleCategories = ['qingxing-shike', 'luodizhi', 'tools'] as const;

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(articleCategories),
    seriesTitle: z.string().optional(),
    episode: z.string().optional(),
    tags: z.array(z.string()).default([]),
    public: z.boolean().default(false),
    draft: z.boolean().default(true),
    auditStatus: z.enum(['pending', 'approved', 'blocked']).default('pending'),
    sourcePath: z.string(),
    sourceType: z.enum(['wechat', 'markdown', 'html', 'manual']),
    canonicalUrl: z.string().url().optional(),
    readingTime: z.string().optional(),
    seoKeywords: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };

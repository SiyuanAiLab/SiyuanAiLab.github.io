import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleCategories = ['qingxing-shike', 'luodizhi', 'tools', 'siyuan-observation-diary'] as const;
const knowledgeCategories = ['start', 'concepts', 'workflows', 'toolkits', 'career', 'sources'] as const;

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(articleCategories),
    seriesTitle: z.string().optional(),
    author: z.string().optional(),
    featured: z.boolean().default(false),
    featuredReason: z.string().optional(),
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

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/knowledge' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(knowledgeCategories),
    subcategory: z.string().optional(),
    level: z.enum(['入门', '进阶', '深度']).default('入门'),
    tags: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
    related_cards: z.array(z.string()).default([]),
    scenario: z.string().optional(),
    audience: z.string().optional(),
    action: z.string().optional(),
    confidence: z.enum(['高', '中', '低']).default('中'),
    verifiedDate: z.coerce.date().optional(),
    source: z.string(),
    sourcePath: z.string().optional(),
    curated_by: z.string().default('杨思远 / 纸间拾光'),
    public: z.literal(true),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, knowledge };

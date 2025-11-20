import { z } from "zod";

// News Article Schema
export const newsArticleSchema = z.object({
  source: z.object({
    id: z.string().nullable(),
    name: z.string(),
  }),
  author: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string().url(),
  urlToImage: z.string().url().nullable(),
  publishedAt: z.string(),
  content: z.string().nullable(),
});

export type NewsArticle = z.infer<typeof newsArticleSchema>;

// NewsAPI Response Schema
export const newsApiResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(newsArticleSchema),
});

export type NewsApiResponse = z.infer<typeof newsApiResponseSchema>;

// Category type
export const categories = [
  "technology",
  "business",
  "sports",
  "entertainment",
  "health",
  "science",
] as const;

export type NewsCategory = typeof categories[number];

// Search params
export const searchParamsSchema = z.object({
  q: z.string().optional(),
  category: z.enum(categories).optional(),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(20),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

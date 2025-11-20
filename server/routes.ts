import type { Express } from "express";
import { createServer, type Server } from "http";
import { newsApiResponseSchema, searchParamsSchema, categories } from "@shared/schema";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

// Check if API key is configured
if (!NEWS_API_KEY) {
  console.error("❌ NEWS_API_KEY environment variable is not set!");
  console.error("Please get your free API key from https://newsapi.org/register");
}

async function fetchNewsAPI(endpoint: string, params: Record<string, string> = {}) {
  // Validate API key
  if (!NEWS_API_KEY) {
    throw new Error("NEWS_API_KEY is not configured. Please set your API key in Replit Secrets.");
  }

  const url = new URL(`${NEWS_API_BASE_URL}${endpoint}`);
  url.searchParams.append("apiKey", NEWS_API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to fetch news" }));
    throw new Error(error.message || `NewsAPI error: ${response.status}`);
  }

  const data = await response.json();
  return newsApiResponseSchema.parse(data);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get top headlines (homepage)
  app.get("/api/news/top-headlines", async (req, res) => {
    try {
      const data = await fetchNewsAPI("/top-headlines", {
        country: "us",
        pageSize: "20",
      });
      
      res.json(data);
    } catch (error) {
      console.error("Error fetching top headlines:", error);
      res.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : "Failed to fetch news",
      });
    }
  });

  // Get news by category
  app.get("/api/news/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      
      if (!categories.includes(category as any)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid category",
        });
      }

      const data = await fetchNewsAPI("/top-headlines", {
        country: "us",
        category: category,
        pageSize: "20",
      });
      
      res.json(data);
    } catch (error) {
      console.error(`Error fetching ${req.params.category} news:`, error);
      res.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : "Failed to fetch news",
      });
    }
  });

  // Search news
  app.get("/api/news/search", async (req, res) => {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== "string") {
        return res.status(400).json({
          status: "error",
          message: "Search query is required",
        });
      }

      const data = await fetchNewsAPI("/everything", {
        q: q,
        sortBy: "publishedAt",
        pageSize: "20",
        language: "en",
      });
      
      res.json(data);
    } catch (error) {
      console.error("Error searching news:", error);
      res.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search news",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

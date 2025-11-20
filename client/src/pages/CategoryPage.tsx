import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useEffect } from "react";
import type { NewsApiResponse, NewsCategory } from "@shared/schema";
import { NewsCard } from "@/components/NewsCard";
import { NewsLoader } from "@/components/NewsLoader";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { categories } from "@shared/schema";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const [, setLocation] = useLocation();
  const category = params?.category as NewsCategory;

  // Redirect to home if invalid category
  useEffect(() => {
    if (category && !categories.includes(category)) {
      setLocation("/");
    }
  }, [category, setLocation]);

  if (!category || !categories.includes(category)) {
    return null;
  }

  const { data, isLoading, error, refetch } = useQuery<NewsApiResponse>({
    queryKey: ["/api/news/category", category],
    queryFn: () => fetch(`/api/news/category/${category}`).then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="mb-8 pb-8 border-b border-border">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 capitalize">
              {category} News
            </h1>
            <p className="text-base text-muted-foreground">
              Latest {category} headlines and stories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <NewsLoader count={9} featured />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <ErrorState onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  if (!data || data.articles.length === 0) {
    return (
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <EmptyState message={`No ${category} articles found. Check back later for updates.`} />
        </div>
      </div>
    );
  }

  const featuredArticle = data.articles[0];
  const remainingArticles = data.articles.slice(1);

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Category Header */}
        <div className="mb-8 pb-8 border-b border-border" data-testid={`section-category-${category}`}>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 capitalize">
            {category} News
          </h1>
          <p className="text-base text-muted-foreground">
            Latest {category} headlines and stories
          </p>
        </div>

        {/* Featured Article + Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <NewsCard article={featuredArticle} featured category={category} />
          {remainingArticles.map((article, index) => (
            <NewsCard
              key={`${article.url}-${index}`}
              article={article}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

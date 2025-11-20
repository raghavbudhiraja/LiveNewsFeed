import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useEffect } from "react";
import type { NewsApiResponse } from "@shared/schema";
import { NewsCard } from "@/components/NewsCard";
import { NewsLoader } from "@/components/NewsLoader";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";

export default function SearchPage() {
  const [, params] = useRoute("/search/:query");
  const [, setLocation] = useLocation();
  const searchQuery = params?.query || "";

  const { data, isLoading, error, refetch } = useQuery<NewsApiResponse>({
    queryKey: ["/api/news/search", searchQuery],
    queryFn: () => fetch(`/api/news/search?q=${encodeURIComponent(searchQuery)}`).then(res => res.json()),
    enabled: !!searchQuery,
  });

  useEffect(() => {
    if (!searchQuery) {
      setLocation("/");
    }
  }, [searchQuery, setLocation]);

  if (!searchQuery) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="mb-8 pb-8 border-b border-border">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Search Results
            </h1>
            <p className="text-base text-muted-foreground">
              Searching for "{searchQuery}"
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <NewsLoader count={9} />
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
          <EmptyState 
            message={`No articles found for "${searchQuery}". Try different keywords or browse by category.`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Search Header */}
        <div className="mb-8 pb-8 border-b border-border" data-testid="section-search-results">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            Search Results
          </h1>
          <p className="text-base text-muted-foreground">
            Found {data.totalResults.toLocaleString()} results for "{searchQuery}"
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.articles.map((article, index) => (
            <NewsCard
              key={`${article.url}-${index}`}
              article={article}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

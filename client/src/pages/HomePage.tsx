import { useQuery } from "@tanstack/react-query";
import type { NewsApiResponse } from "@shared/schema";
import { NewsCard } from "@/components/NewsCard";
import { NewsLoader } from "@/components/NewsLoader";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";

export default function HomePage() {
  const { data, isLoading, error, refetch } = useQuery<NewsApiResponse>({
    queryKey: ["/api/news/top-headlines"],
  });

  if (isLoading) {
    return (
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Top Headlines</h1>
            <p className="text-base text-muted-foreground">
              Stay informed with the latest breaking news from around the world
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
          <EmptyState />
        </div>
      </div>
    );
  }

  const featuredArticle = data.articles[0];
  const remainingArticles = data.articles.slice(1);

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8" data-testid="section-header">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Top Headlines</h1>
          <p className="text-base text-muted-foreground">
            Stay informed with the latest breaking news from around the world
          </p>
        </div>

        {/* Featured Article + Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <NewsCard article={featuredArticle} featured />
          {remainingArticles.map((article, index) => (
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

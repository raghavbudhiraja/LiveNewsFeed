import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Calendar, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@shared/schema";

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
  category?: string;
}

export function NewsCard({ article, featured = false, category }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop";
  };

  return (
    <Card
      className={`overflow-hidden hover-elevate transition-all duration-300 ${
        featured ? "md:col-span-2 lg:row-span-2" : ""
      }`}
      data-testid={`card-news-${article.title.slice(0, 20)}`}
    >
      <div className={`relative ${featured ? "aspect-[21/9] md:aspect-video" : "aspect-video"}`}>
        <img
          src={article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop"}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
          data-testid="img-article"
        />
        {category && (
          <Badge className="absolute top-4 left-4 capitalize" data-testid={`badge-category-${category}`}>
            {category}
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <h3
          className={`font-semibold mb-3 line-clamp-2 ${
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          }`}
          data-testid="text-article-title"
        >
          {article.title}
        </h3>
        {article.description && (
          <p
            className={`font-serif text-foreground/80 mb-4 leading-relaxed ${
              featured ? "text-base line-clamp-3 lg:line-clamp-4" : "text-sm line-clamp-3"
            }`}
            data-testid="text-article-description"
          >
            {article.description}
          </p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span data-testid="text-source">{article.source.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span data-testid="text-date">{formatDate(article.publishedAt)}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full sm:w-auto"
          data-testid="button-read-more"
        >
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read Full Article
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

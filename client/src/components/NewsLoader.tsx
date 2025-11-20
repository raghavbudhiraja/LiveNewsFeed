import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsLoaderProps {
  count?: number;
  featured?: boolean;
}

export function NewsLoader({ count = 6, featured = false }: NewsLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className={`overflow-hidden ${
            featured && index === 0 ? "md:col-span-2 lg:row-span-2" : ""
          }`}
          data-testid={`skeleton-news-${index}`}
        >
          <Skeleton
            className={`w-full ${
              featured && index === 0 ? "aspect-[21/9] md:aspect-video" : "aspect-video"
            }`}
          />
          <CardContent className="p-6">
            <Skeleton className="h-6 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex gap-4 mb-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-32" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

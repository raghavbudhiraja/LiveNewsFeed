import { FileQuestion } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ 
  message = "No articles found. Try adjusting your search or check back later."
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md w-full" data-testid="card-empty">
        <CardContent className="p-8 text-center">
          <FileQuestion className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2" data-testid="text-empty-title">
            No Articles Found
          </h3>
          <p className="text-base text-muted-foreground" data-testid="text-empty-message">
            {message}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

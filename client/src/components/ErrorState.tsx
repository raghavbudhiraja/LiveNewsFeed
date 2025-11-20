import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  message = "Failed to load news articles. Please try again.",
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md w-full" data-testid="card-error">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2" data-testid="text-error-title">
            Something went wrong
          </h3>
          <p className="text-base text-muted-foreground mb-6" data-testid="text-error-message">
            {message}
          </p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" data-testid="button-retry">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

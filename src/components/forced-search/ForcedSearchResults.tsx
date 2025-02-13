
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ForcedSearchResult {
  title: string;
  size?: string;
  fileId: string;
}

interface ForcedSearchResultsProps {
  results: ForcedSearchResult[];
  isLoading: boolean;
  searchQuery: string;
}

export const ForcedSearchResults = ({ results, isLoading, searchQuery }: ForcedSearchResultsProps) => {
  if (isLoading) {
    return <div className="text-muted-foreground">Searching external sources...</div>;
  }

  if (results.length === 0) {
    return (
      <div className="text-muted-foreground">
        No external results found for "{searchQuery}"
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {results.map((result, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-start md:items-center gap-4 p-3 rounded-md bg-blue-950/30 hover:bg-blue-950/40 transition-colors"
        >
          <div className="flex-1 w-full">
            <h3 className="font-medium text-sm">{result.title}</h3>
            <div className="flex gap-2 mt-1">
              {result.size && (
                <Badge variant="outline" className="text-xs">
                  {result.size}
                </Badge>
              )}
            </div>
          </div>
          <Button 
            size="sm" 
            variant="secondary" 
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              window.open(`https://new3.scloud.ninja/file/${result.fileId}`, '_blank');
            }}
          >
            View Details
          </Button>
        </div>
      ))}
    </div>
  );
};

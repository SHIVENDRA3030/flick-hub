
import { Search } from "lucide-react";
import { ForcedSearchResults } from "./ForcedSearchResults";

interface ForcedSearchSectionProps {
  isEnabled: boolean;
  searchQuery: string;
  results: any[];
  isLoading: boolean;
}

export const ForcedSearchSection = ({ 
  isEnabled, 
  searchQuery, 
  results, 
  isLoading 
}: ForcedSearchSectionProps) => {
  if (!isEnabled || !searchQuery) {
    return null;
  }

  return (
    <div className="rounded-lg bg-blue-950/20 p-4 space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Search className="w-4 h-4" />
        Forced Search Results
      </h2>
      
      <ForcedSearchResults 
        results={results}
        isLoading={isLoading}
        searchQuery={searchQuery}
      />
    </div>
  );
};

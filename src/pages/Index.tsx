import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Movie, XenineLink } from "@/types/movie";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { ForcedSearchSection } from "@/components/forced-search/ForcedSearchSection";
import { useForcedSearch } from "@/components/forced-search/useForcedSearch";

const ITEMS_PER_PAGE = 12;

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showXEngine, setShowXEngine] = useState(false);
  const [showScrapedResults, setShowScrapedResults] = useState(false);
  const isMobile = useIsMobile();

  // Regular movies query
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Movie[];
    },
  });

  // X Engine search results
  const { data: xengineResults = [], isLoading: isLoadingXEngine } = useQuery({
    queryKey: ["xenine", searchQuery],
    queryFn: async () => {
      if (!searchQuery || !showXEngine) return [];
      
      const { data, error } = await supabase
        .from("xenine_links")
        .select("*")
        .ilike("title", `%${searchQuery}%`);

      if (error) throw error;
      return data as XenineLink[];
    },
    enabled: !!searchQuery && showXEngine,
  });

  // Forced search results using the custom hook
  const { data: scrapedResults = [], isLoading: isLoadingScraped } = useForcedSearch(
    searchQuery,
    showScrapedResults
  );

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = filteredMovies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Darkstark</h1>
        
        {/* Search Section */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search movies..."
                className="bg-secondary/50 border-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="Dark-engine-mode"
                  checked={showXEngine}
                  onCheckedChange={setShowXEngine}
                  className="data-[state=checked]:bg-green-500"
                />
                <Label
                  htmlFor="Dark-engine-mode"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Dark Engine {showXEngine ? "On" : "Off"}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="forced-search-mode"
                  checked={showScrapedResults}
                  onCheckedChange={setShowScrapedResults}
                  className="data-[state=checked]:bg-blue-500"
                />
                <Label
                  htmlFor="forced-search-mode"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Forced Search {showScrapedResults ? "On" : "Off"}
                </Label>
              </div>
            </div>
          </div>

          {/* X Engine Results */}
          {showXEngine && searchQuery && (
            <div className="rounded-lg bg-secondary/20 p-4 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Search className="w-4 h-4" />
                Dark Engine Results
              </h2>
              
              {isLoadingXEngine ? (
                <div className="text-muted-foreground">Searching Dark Engine...</div>
              ) : xengineResults.length > 0 ? (
                <div className="space-y-3">
                  {xengineResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex flex-col md:flex-row items-start md:items-center gap-4 p-3 rounded-md bg-secondary/30 hover:bg-secondary/40 transition-colors"
                    >
                      <div className="flex-1 w-full">
                        <h3 className="font-medium text-sm">{result.title}</h3>
                        {result.description && (
                          <p className={`text-sm text-muted-foreground ${isMobile ? "" : "line-clamp-1"}`}>
                            {result.description}
                          </p>
                        )}
                        <div className="flex gap-2 mt-1">
                          {result.quality && (
                            <Badge variant="outline" className="text-xs">
                              {result.quality}
                            </Badge>
                          )}
                          {result.size && (
                            <Badge variant="outline" className="text-xs">
                              {result.size}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-full md:w-auto"
                      >
                        <Button size="sm" variant="secondary" className="w-full md:w-auto">
                          Open Link
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">
                  No Dark Engine results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}

          {/* Forced Search Section */}
          <ForcedSearchSection
            isEnabled={showScrapedResults}
            searchQuery={searchQuery}
            results={scrapedResults}
            isLoading={isLoadingScraped}
          />
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading movies...</div>
        ) : (
          <>
            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {paginatedMovies.map((movie) => (
                <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow glass-morphism">
                  <Link to={`/movie/${movie.id}`}>
                    <div className="aspect-[2/3] relative">
                      <img
                        src={movie.poster_url || "/placeholder.svg"}
                        alt={movie.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 neo-blur px-2 py-1 rounded-md flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white">{movie.size}</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h2 className="font-semibold text-lg mb-2 line-clamp-1 text-foreground">
                        {movie.title} ({format(new Date(movie.release_date), "yyyy")})
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-secondary/50">
                          {movie.content_type || "Movie"}
                        </Badge>
                        <Badge variant="secondary" className="bg-secondary/50">
                          {movie.size}
                        </Badge>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mb-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;

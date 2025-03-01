
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NetflixMovie } from "@/types/netflix";
import NetflixHero from "@/components/netflix/NetflixHero";
import NetflixRow from "@/components/netflix/NetflixRow";
import NavMenu from "@/components/Menu";
import { RainbowInput } from "@/components/ui/rainbow-input";
import { Search } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

const Netflix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: netflixMovies = [], isLoading } = useQuery({
    queryKey: ["netflix-movies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("netflix_movies")
        .select("*");

      if (error) throw error;
      return data as NetflixMovie[];
    },
  });

  // Apply search filter
  const filteredMovies = netflixMovies.filter(movie => 
    searchQuery === "" || 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (movie.description && movie.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get featured content
  const featuredContent = netflixMovies.find(item => item.is_featured) || 
    (netflixMovies.length > 0 ? netflixMovies[0] : null);

  // Filter by content type
  const movies = filteredMovies.filter(item => item.content_type === "movie");
  const series = filteredMovies.filter(item => item.content_type === "series");

  // Apply pagination to all content
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const paginatedSeries = series.slice(0, ITEMS_PER_PAGE);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading Netflix content...</div>
      </div>
    );
  }

  if (!featuredContent) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Netflix Section</h1>
          <p>No content available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-0 left-0 w-full z-50">
        <NavMenu />
      </div>
      
      <NetflixHero featured={featuredContent} />
      
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-16 relative z-20">
        {/* Search bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <RainbowInput
              placeholder="Search movies and series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
        </div>

        {/* Content Rows */}
        {searchQuery ? (
          <NetflixRow title="Search Results" items={paginatedMovies} />
        ) : (
          <>
            {movies.length > 0 && (
              <NetflixRow title="Movies" items={paginatedMovies.filter(item => item.content_type === "movie")} />
            )}
            
            {series.length > 0 && (
              <NetflixRow title="TV Series" items={paginatedMovies.filter(item => item.content_type === "series")} />
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Netflix;

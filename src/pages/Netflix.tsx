import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, Film, PlayCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NetflixContent } from "@/types/netflix";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThreeBackground from "@/components/ThreeBackground";
import NavMenu from "@/components/Menu";
import PageToggle from "@/components/PageToggle";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const ITEMS_PER_PAGE = 8;

const Netflix = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  // Query for Netflix content
  const { data: netflixContent = [], isLoading } = useQuery({
    queryKey: ["netflix-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("netflix_content")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load content: " + error.message);
        throw error;
      }
      
      return data as NetflixContent[];
    },
  });

  // Filter content based on search query
  const filteredContent = netflixContent.filter((content) =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredContent.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedContent = filteredContent.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Set page to 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <ThreeBackground color="#111111" particleCount={1000} />
      <NavMenu />
      
      {/* Page Toggle - Fixed Position */}
      <div className="fixed top-4 left-4 z-50">
        <PageToggle />
      </div>
      
      <div className="max-w-7xl mx-auto p-6 pt-16 relative z-10">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Film className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold text-red-600">STREAMARK</h1>
          </div>
          <p className="text-gray-400">Watch your favorite shows and movies online</p>
        </header>
        
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Input
              type="search"
              placeholder="Search titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg h-64"></div>
            ))}
          </div>
        ) : paginatedContent.length > 0 ? (
          <>
            {/* Featured Content (first item) */}
            {currentPage === 1 && filteredContent.some(c => c.is_featured) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Featured</h2>
                {filteredContent.filter(c => c.is_featured).slice(0, 1).map((content) => (
                  <div key={content.id} className="relative h-[400px] rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                    <img
                      src={content.poster_url || "/placeholder.svg"}
                      alt={content.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-3xl font-bold mb-2">{content.title}</h3>
                      {content.description && (
                        <p className="text-gray-300 mb-4 line-clamp-2">{content.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {content.genre?.map((g, i) => (
                          <Badge key={i} className="bg-red-600 hover:bg-red-700">{g}</Badge>
                        ))}
                        {content.maturity_rating && (
                          <Badge variant="outline" className="border-gray-500">{content.maturity_rating}</Badge>
                        )}
                      </div>
                      <Link to={`/netflix/${content.id}`}>
                        <Button className="bg-red-600 hover:bg-red-700">
                          <PlayCircle className="mr-2" /> Watch Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {paginatedContent.map((content) => (
                <Link key={content.id} to={`/netflix/${content.id}`}>
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full hover:scale-105 transition-transform duration-300">
                    <div className="aspect-[2/3] relative">
                      <img
                        src={content.poster_url || "/placeholder.svg"}
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />
                      {content.content_type === "series" && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                          SERIES
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-1">{content.title}</h3>
                      {content.release_year && (
                        <p className="text-gray-400 text-sm">{content.release_year}</p>
                      )}
                      {content.genre && content.genre.length > 0 && (
                        <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                          {content.genre.join(", ")}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mb-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={`transition-all duration-300 hover:scale-105 ${
                        currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                      }`}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer transition-all duration-300 hover:scale-110 bg-gray-800 border-gray-700"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className={`transition-all duration-300 hover:scale-105 ${
                        currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No content found</h3>
            <p className="text-gray-400">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : "No content available yet. Check back soon!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Netflix;


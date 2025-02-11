
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Movie } from "@/types/movie";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Movies</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search movies..."
            className="max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="text-center">Loading movies...</div>
        ) : (
          /* Movie Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/movie/${movie.id}`}>
                  <div className="aspect-[2/3] relative">
                    <img
                      src={movie.poster_url || "/placeholder.svg"}
                      alt={movie.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-md flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white">{movie.size}</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h2 className="font-semibold text-lg mb-2 line-clamp-1">
                      {movie.title} ({format(new Date(movie.release_date), "yyyy")})
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {movie.content_type || "Movie"}
                      </Badge>
                      <Badge variant="secondary">
                        {movie.size}
                      </Badge>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;


import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { movies } from "@/data/movies";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <a href={`/movie/${movie.id}`}>
                <div className="aspect-[2/3] relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-md flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white">{movie.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h2 className="font-semibold text-lg mb-2 line-clamp-1">
                    {movie.title} ({movie.year})
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.genre.map((g) => (
                      <Badge key={g} variant="secondary">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

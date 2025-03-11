import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Movie, DownloadLink } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import ThreeBackground from "@/components/ThreeBackground";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading: isLoadingMovie } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Movie;
    },
  });

  const { data: downloadLinks = [], isLoading: isLoadingDownloads } = useQuery({
    queryKey: ["download_links", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("download_links")
        .select("*")
        .eq("movie_id", id);

      if (error) throw error;
      return data as DownloadLink[];
    },
  });

  const streamingLinks = [];
  const isLoadingStreaming = false;

  const isLoading = isLoadingMovie || isLoadingDownloads;

  const getEmbedHtml = () => {
    if (!movie) return null;
    
    if (movie.embed_code) {
      return movie.embed_code.replace('<iframe', '<iframe style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;"');
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background/50 p-6">
        <ThreeBackground color="#4a9eff" particleCount={2000} />
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background/50 p-6">
        <ThreeBackground color="#ff4a4a" particleCount={2000} />
        <div className="text-center">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 p-6">
      <ThreeBackground color="#4a9eff" particleCount={2000} />
      <div className="max-w-7xl mx-auto relative z-10">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Movies
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-3 relative overflow-hidden rounded-lg bg-black aspect-video">
            {getEmbedHtml() ? (
              <div 
                dangerouslySetInnerHTML={{ __html: getEmbedHtml() as string }} 
                className="w-full h-full relative"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-900">
                <Play className="w-20 h-20 text-white opacity-70" />
              </div>
            )}
          </div>

          <div className="aspect-[2/3] relative">
            <img
              src={movie.poster_url || "/placeholder.svg"}
              alt={movie.title}
              className="object-cover w-full h-full rounded-lg shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="md:col-span-2 backdrop-blur-lg bg-black/20 p-6 rounded-lg">
            <h1 className="text-4xl font-bold mb-4">
              {movie.title} ({format(new Date(movie.release_date), "yyyy")})
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="hover:bg-secondary/70 transition-colors">
                {movie.content_type || "Movie"}
              </Badge>
              <Badge variant="secondary" className="hover:bg-secondary/70 transition-colors">
                {movie.size}
              </Badge>
            </div>

            {movie.description && (
              <p className="text-muted-foreground mb-8">{movie.description}</p>
            )}

            {downloadLinks.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Download Links</h2>
                <div className="space-y-4">
                  {downloadLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex flex-wrap items-center gap-4 p-4 border rounded-lg bg-black/20 backdrop-blur-sm
                        hover:bg-black/30 transition-all duration-300 hover:scale-[1.02]"
                    >
                      {link.label && (
                        <Badge variant="outline" className="hover:bg-white/10 transition-colors">
                          {link.label}
                        </Badge>
                      )}
                      {link.quality && (
                        <Badge variant="outline" className="hover:bg-white/10 transition-colors">
                          {link.quality}
                        </Badge>
                      )}
                      {link.size && (
                        <Badge variant="outline" className="hover:bg-white/10 transition-colors">
                          {link.size}
                        </Badge>
                      )}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto"
                      >
                        <Button className="hover:scale-105 transition-transform">Download</Button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;


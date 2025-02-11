
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Movie, DownloadLink, StreamingLink } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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

  const { data: streamingLinks = [], isLoading: isLoadingStreaming } = useQuery({
    queryKey: ["streaming_links", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("streaming_links")
        .select("*")
        .eq("movie_id", id);

      if (error) throw error;
      return data as StreamingLink[];
    },
  });

  const isLoading = isLoadingMovie || isLoadingDownloads || isLoadingStreaming;

  if (isLoading) {
    return <div className="min-h-screen bg-background p-6">Loading...</div>;
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background p-6">Movie not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Movies
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="aspect-[2/3] relative">
            <img
              src={movie.poster_url || "/placeholder.svg"}
              alt={movie.title}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">
              {movie.title} ({format(new Date(movie.release_date), "yyyy")})
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">
                {movie.content_type || "Movie"}
              </Badge>
              <Badge variant="secondary">
                {movie.size}
              </Badge>
            </div>

            {movie.description && (
              <p className="text-muted-foreground mb-8">{movie.description}</p>
            )}

            {/* Download Links */}
            {downloadLinks.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Download Links</h2>
                <div className="space-y-4">
                  {downloadLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex flex-wrap items-center gap-4 p-4 border rounded-lg"
                    >
                      {link.label && (
                        <Badge variant="outline">{link.label}</Badge>
                      )}
                      {link.quality && (
                        <Badge variant="outline">{link.quality}</Badge>
                      )}
                      {link.size && (
                        <Badge variant="outline">{link.size}</Badge>
                      )}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto"
                      >
                        <Button>Download</Button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Streaming Links */}
            {streamingLinks.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Streaming Links</h2>
                <div className="space-y-4">
                  {streamingLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex flex-wrap items-center gap-4 p-4 border rounded-lg"
                    >
                      {link.provider && (
                        <Badge variant="outline">{link.provider}</Badge>
                      )}
                      {link.quality && (
                        <Badge variant="outline">{link.quality}</Badge>
                      )}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto"
                      >
                        <Button>Watch Now</Button>
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

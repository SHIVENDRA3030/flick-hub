
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NetflixMovie, NetflixEmbedCode } from "@/types/netflix";
import { 
  ArrowLeft, 
  Play, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  Volume2,
  VolumeX,
  ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NetflixPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);

  const { data: movie, isLoading: isLoadingMovie } = useQuery({
    queryKey: ["netflix-movie", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("netflix_movies")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      
      // Mock data for the new fields
      if (data) {
        data.cast = data.cast || ["Bobby Berk", "Karamo Brown", "Tan France", "Antoni Porowski", "Jonathan Van Ness"];
        data.mood = data.mood || ["Heartfelt", "Feel-Good"];
        data.duration = data.duration || "48m";
        data.maturity_rating = data.maturity_rating || "TV-14";
        data.awards = data.awards || ["2021 Emmy Nominee"];
        data.episode_count = data.episode_count || 8;
        data.season_count = data.season_count || 5;
      }
      
      return data as NetflixMovie | null;
    },
  });

  const { data: embedCode, isLoading: isLoadingEmbed } = useQuery({
    queryKey: ["netflix-embed", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("netflix_embed_codes")
        .select("*")
        .eq("movie_id", id)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        data.duration = data.duration || "48m";
      }
      
      return data as NetflixEmbedCode | null;
    },
    enabled: !!movie,
  });

  // Mock episodes data
  const episodes = [
    { title: "Preaching Out Loud", duration: "50m", description: "The Fab Five help a timid gay pastor who came out in his 30s update his look and find the confidence to lead his congregation into the future." },
    { title: "The Anxious Activist", duration: "48m", description: "A passionate Gen Z activist is so focused on saving the planet that she forgets to schedule self-care. Can the Fab Five help her find balance?" },
    { title: "No Time for Yourself", duration: "45m", description: "A dedicated teacher who puts everyone else first learns how to prioritize her own needs with help from the Fab Five." }
  ];

  const isLoading = isLoadingMovie || isLoadingEmbed;

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, this would also mute the actual video player
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-xl text-white">Loading content...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/netflix")}
            className="mb-8 text-white"
          >
            <ArrowLeft className="mr-2" /> Back to Netflix
          </Button>
          <h1 className="text-4xl font-bold mb-8 text-white">Content Not Found</h1>
          <p className="text-white">The requested content could not be found.</p>
        </div>
      </div>
    );
  }

  const currentEpisode = movie.episode ? movie.episode : 3;
  const totalEpisodes = movie.episode_count || 8;
  const currentTitle = movie.episode_title || "The Anxious Activist";
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Video Player Section */}
      <div className="relative">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black relative">
          {embedCode?.embed_code ? (
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: embedCode.embed_code }} 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p>No embed code available for this content.</p>
            </div>
          )}
          
          {/* Netflix Logo Overlay */}
          <div className="absolute top-6 left-6">
            <span className="text-red-600 font-bold">N</span>
            <span className="ml-1 text-white text-xs">SERIES</span>
          </div>
          
          {/* Episode Progress */}
          <div className="absolute bottom-14 left-0 right-0 px-6">
            <div className="w-full bg-gray-600 h-1 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-between text-xs mt-1 text-gray-400">
              <span>{currentEpisode} of {movie.duration}</span>
              <span>Next Episode: {currentEpisode < totalEpisodes ? currentEpisode + 1 : 1}</span>
            </div>
          </div>
          
          {/* Player Controls */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="secondary" className="rounded-md px-6 flex items-center">
                <Play className="mr-2 h-4 w-4" /> Resume
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 bg-opacity-60">
                <Check className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 bg-opacity-60">
                <ThumbsUp className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 bg-opacity-60">
                <ThumbsDown className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 bg-opacity-60" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Subtitles */}
          <div className="absolute bottom-24 left-0 right-0 text-center">
            <p className="text-xl font-semibold bg-black bg-opacity-30 inline-block px-2 py-1 rounded">
              I always feel inadequate.
            </p>
          </div>
        </div>
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/netflix")}
          className="absolute top-6 right-6 text-white z-10 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50"
          size="icon"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Content Details */}
      <div className="px-6 py-8">
        {/* Release Info and Metadata */}
        <div className="flex flex-wrap gap-2 text-sm text-gray-400 mb-2">
          <span>{movie.release_year || 2020}</span>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            {movie.maturity_rating || "TV-14"}
          </Badge>
          <span>{movie.season_count || 5} Seasons</span>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            <Volume2 className="h-3 w-3 mr-1" /> 5.1
          </Badge>
        </div>
        
        {/* Awards */}
        {movie.awards && movie.awards.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-400">🏆</span>
            <span className="text-amber-400 font-medium">{movie.awards[0]}</span>
          </div>
        )}
        
        {/* Current Episode Title */}
        <h2 className="text-2xl font-bold mb-2">"{currentTitle}"</h2>
        
        {/* Episode Description */}
        <p className="text-gray-300 mb-6">{movie.description}</p>
        
        {/* Cast and Genres */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-gray-400 mb-1">Cast: 
              <span className="text-gray-300 ml-2">
                {movie.cast ? movie.cast.join(", ") : "No cast information"}
                {movie.cast && movie.cast.length > 4 && ", more"}
              </span>
            </p>
            <p className="text-gray-400 mb-1">Genres: 
              <span className="text-gray-300 ml-2">
                {movie.genre ? movie.genre.join(", ") : "No genre information"}
              </span>
            </p>
            <p className="text-gray-400">This show is: 
              <span className="text-gray-300 ml-2">
                {movie.mood ? movie.mood.join(", ") : "Heartfelt, Feel-Good"}
              </span>
            </p>
          </div>
        </div>
        
        {/* Episodes Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Episodes</h2>
            <div className="border border-gray-600 rounded-md px-3 py-2 flex items-center">
              <span>Season {movie.season || 5}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </div>
          </div>
          
          {/* Episode List */}
          <div className="space-y-4">
            {episodes.map((episode, index) => (
              <div key={index} className="flex gap-4 border-b border-gray-800 pb-4">
                <img 
                  src={movie.poster_url || "https://via.placeholder.com/120x68"} 
                  alt={episode.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{episode.title}</h3>
                    <span className="text-gray-400">{episode.duration}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{episode.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixPlayer;

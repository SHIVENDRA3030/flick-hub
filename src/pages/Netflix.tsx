
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NetflixContent } from "@/types/netflix";
import NetflixHero from "@/components/netflix/NetflixHero";
import NetflixRow from "@/components/netflix/NetflixRow";
import NavMenu from "@/components/Menu";

const Netflix: React.FC = () => {
  const { data: netflixContent = [], isLoading } = useQuery({
    queryKey: ["netflix-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("netflix_content")
        .select("*");

      if (error) throw error;
      return data as NetflixContent[];
    },
  });

  const featuredContent = netflixContent.find(item => item.is_featured) || 
    (netflixContent.length > 0 ? netflixContent[0] : null);

  const movies = netflixContent.filter(item => item.content_type === "movie");
  const series = netflixContent.filter(item => item.content_type === "series");

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
        {movies.length > 0 && (
          <NetflixRow title="Movies" items={movies} />
        )}
        
        {series.length > 0 && (
          <NetflixRow title="TV Series" items={series} />
        )}
      </div>
    </div>
  );
};

export default Netflix;

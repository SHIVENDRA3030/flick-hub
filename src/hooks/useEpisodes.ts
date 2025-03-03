
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Episode } from "@/components/EpisodeList";
import { toast } from "sonner";

// Sample data to use if no episodes are found
const sampleEpisodes: Episode[] = [
  {
    id: "sample-ep-1",
    episode_number: 1,
    episode_name: "Pilot Episode",
    embed_code: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: "sample-ep-2",
    episode_number: 2,
    episode_name: "The Beginning",
    embed_code: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>'
  },
  {
    id: "sample-ep-3",
    episode_number: 3,
    episode_name: "The Journey",
    embed_code: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>'
  }
];

export const useEpisodes = (netflixContentId: string | undefined) => {
  return useQuery({
    queryKey: ["episodes", netflixContentId],
    queryFn: async () => {
      if (!netflixContentId) {
        console.log("No content ID provided, returning sample episodes");
        return sampleEpisodes;
      }
      
      try {
        const { data, error } = await supabase
          .from("web_series_episodes")
          .select("*")
          .eq("netflix_content_id", netflixContentId)
          .order("episode_number", { ascending: true });
  
        if (error) {
          console.error("Error fetching episodes:", error);
          toast.error("Failed to load episodes: " + error.message);
          throw error;
        }
        
        console.log("Episodes fetched from DB:", data?.length || 0);
        
        // If no episodes found in database, return sample episodes
        if (!data || data.length === 0) {
          console.log("No episodes found in DB, returning sample episodes");
          toast.info("Using sample episodes for demonstration");
          return sampleEpisodes;
        }
        
        return data as Episode[];
      } catch (error) {
        console.error("Unexpected error in useEpisodes:", error);
        toast.error("Error loading episodes, using samples instead");
        return sampleEpisodes;
      }
    },
    enabled: true, // Always enable the query to at least get sample data
  });
};


import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Episode } from "@/components/EpisodeList";
import { toast } from "sonner";

export const useEpisodes = (netflixContentId: string | undefined) => {
  return useQuery({
    queryKey: ["episodes", netflixContentId],
    queryFn: async () => {
      if (!netflixContentId) {
        console.log("No content ID provided, cannot fetch episodes");
        return [];
      }
      
      try {
        console.log("Fetching episodes for content ID:", netflixContentId);
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
        
        console.log("Episodes data received:", data);
        
        if (!data || data.length === 0) {
          console.log("No episodes found for content ID:", netflixContentId);
          return [];
        }
        
        // Transform the data into Episode objects
        const episodes = data.map(episode => ({
          id: episode.id,
          episode_number: episode.episode_number,
          episode_name: episode.episode_name,
          embed_code: episode.embed_code
        }));
        
        console.log("Transformed episodes:", episodes);
        return episodes as Episode[];
      } catch (error) {
        console.error("Unexpected error in useEpisodes:", error);
        toast.error("Error loading episodes");
        return [];
      }
    },
    enabled: Boolean(netflixContentId),
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};


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
        console.log("Raw data length:", data?.length || 0);
        
        if (!data || data.length === 0) {
          console.log("No episodes found for content ID:", netflixContentId);
          // Make an extra check to see if we got data in the right format
          const checkResult = await supabase.from("web_series_episodes").select("count").eq("netflix_content_id", netflixContentId);
          console.log("Count check result:", checkResult);
          return [];
        }
        
        // Transform the data into Episode objects - print what we're getting
        console.log("Data structure sample:", JSON.stringify(data[0]));
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
    retry: 3,
    staleTime: 1 * 60 * 1000, // Lower staleTime to 1 minute to ensure fresher data
  });
};

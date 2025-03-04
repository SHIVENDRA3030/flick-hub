
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
        
        console.log("Episodes fetched from DB:", data?.length || 0);
        
        if (!data || data.length === 0) {
          console.log("No episodes found in DB for ID:", netflixContentId);
          // Instead of returning sample data, return empty array
          return [];
        }
        
        return data as Episode[];
      } catch (error) {
        console.error("Unexpected error in useEpisodes:", error);
        toast.error("Error loading episodes");
        return [];
      }
    },
    enabled: Boolean(netflixContentId), // Only run query if we have a content ID
  });
};

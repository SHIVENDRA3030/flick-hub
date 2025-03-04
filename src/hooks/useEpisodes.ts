
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
      
      console.log(`Fetching episodes for content ID: ${netflixContentId}`);
      
      // First, verify if there are any episodes with this content ID
      const countCheck = await supabase
        .from("web_series_episodes")
        .select("id", { count: "exact" })
        .eq("netflix_content_id", netflixContentId);
      
      console.log("Episode count check:", countCheck);
      
      if (countCheck.error) {
        console.error("Error checking episode count:", countCheck.error);
        toast.error("Error checking episodes");
        return [];
      }
      
      if (countCheck.count === 0) {
        console.log("No episodes found for this content - count is 0");
        return [];
      }
      
      // Now fetch the full episode data
      const { data, error } = await supabase
        .from("web_series_episodes")
        .select("*")
        .eq("netflix_content_id", netflixContentId)
        .order("episode_number", { ascending: true });
      
      if (error) {
        console.error("Error fetching episodes:", error);
        toast.error("Failed to load episodes: " + error.message);
        return [];
      }
      
      console.log("Raw episodes response:", data);
      
      if (!data || data.length === 0) {
        console.log("No episodes returned in the query result");
        return [];
      }
      
      // Successfully fetched episodes, transform them for the UI
      const episodes = data.map(episode => ({
        id: episode.id,
        episode_number: episode.episode_number,
        episode_name: episode.episode_name,
        embed_code: episode.embed_code
      }));
      
      console.log(`Successfully transformed ${episodes.length} episodes:`, episodes);
      return episodes as Episode[];
    },
    enabled: Boolean(netflixContentId),
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000, // 1 minute
  });
};

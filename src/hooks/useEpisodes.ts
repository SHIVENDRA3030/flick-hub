
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Episode } from "@/components/EpisodeList";
import { toast } from "sonner";

export const useEpisodes = (netflixContentId: string | undefined) => {
  return useQuery({
    queryKey: ["episodes", netflixContentId],
    queryFn: async () => {
      if (!netflixContentId) {
        return [];
      }
      
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
      
      console.log("Episodes fetched:", data?.length || 0);
      return data as Episode[] || [];
    },
    enabled: !!netflixContentId,
  });
};


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
      
      try {
        // Fetch the episodes for this content and order by episode number
        const { data, error } = await supabase
          .from("web_series_episodes")
          .select("*")
          .eq("netflix_content_id", netflixContentId)
          .order('episode_number', { ascending: true });
        
        if (error) {
          console.error("Error fetching episodes:", error);
          toast.error("Failed to load episodes");
          return [];
        }
        
        console.log(`Found ${data?.length || 0} episodes for content ID: ${netflixContentId}`);
        
        if (!data || data.length === 0) {
          console.log("No episodes found for this content");
          return [];
        }
        
        // Transform and ensure episodes are sorted by episode number
        const episodes = data
          .sort((a, b) => {
            // Convert episode_number to number before comparison
            const numA = typeof a.episode_number === 'string' ? parseInt(a.episode_number, 10) : a.episode_number;
            const numB = typeof b.episode_number === 'string' ? parseInt(b.episode_number, 10) : b.episode_number;
            return numA - numB;
          })
          .map(episode => {
            // Convert episode_number to number and handle potential string values
            const episodeNumber = typeof episode.episode_number === 'string' 
              ? parseInt(episode.episode_number, 10) 
              : episode.episode_number;
              
            // Use optional chaining to safely access properties that might not exist
            const qualityInfo = episode?.resolution || episode?.quality || null;
            
            return {
              id: episode.id,
              episode_number: episodeNumber,
              episode_name: episode.episode_name,
              embed_code: episode.embed_code,
              quality: determineQuality(qualityInfo)
            };
          });
        
        console.log("Transformed episodes:", episodes);
        return episodes as Episode[];
      } catch (error) {
        console.error("Unexpected error in useEpisodes:", error);
        toast.error("An unexpected error occurred while loading episodes");
        return [];
      }
    },
    enabled: Boolean(netflixContentId),
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000, // 1 minute
  });
};

// Helper function to determine and format quality
function determineQuality(qualityInfo: string | null): string | undefined {
  if (!qualityInfo) return undefined;
  
  // Clean up and normalize the quality string
  const quality = qualityInfo.toLowerCase().trim();
  
  if (quality.includes('4k') || quality.includes('2160p') || quality.includes('ultra hd')) {
    return '4K';
  } else if (quality.includes('1080p') || quality.includes('1080') || quality.includes('full hd')) {
    return '1080p';
  } else if (quality.includes('720p') || quality.includes('720') || quality.includes('hd')) {
    return '720p';
  } else if (quality.includes('480p') || quality.includes('480') || quality.includes('sd')) {
    return '480p';
  } else {
    // If we have some quality info but it doesn't match our patterns, return it as is
    return qualityInfo;
  }
}

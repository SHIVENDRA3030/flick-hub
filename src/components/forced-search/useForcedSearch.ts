
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useForcedSearch = (query: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["scraped", query],
    queryFn: async () => {
      if (!query || !enabled) return [];
      
      const response = await supabase.functions.invoke('scrape-search', {
        body: { query }
      });
      
      if (response.error) throw response.error;
      return response.data.results;
    },
    enabled: !!query && enabled,
  });
};

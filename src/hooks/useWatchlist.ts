
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface WatchlistItem {
  id: string;
  user_id: string;
  netflix_content_id: string;
  added_at: string;
}

export const useWatchlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user's watchlist
  const { data: watchlist = [], isLoading } = useQuery({
    queryKey: ['watchlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data as WatchlistItem[];
    },
    enabled: !!user,
  });

  // Add to watchlist mutation
  const addToWatchlistMutation = useMutation({
    mutationFn: async (contentId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('watchlist')
        .insert({ user_id: user.id, netflix_content_id: contentId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', user?.id] });
      toast.success('Added to watchlist!');
    },
    onError: (error: any) => {
      if (error.message.includes('duplicate key')) {
        toast.error('This item is already in your watchlist!');
      } else {
        toast.error('Failed to add to watchlist');
      }
    },
  });

  // Remove from watchlist mutation
  const removeFromWatchlistMutation = useMutation({
    mutationFn: async (contentId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', user.id)
        .eq('netflix_content_id', contentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', user?.id] });
      toast.success('Removed from watchlist!');
    },
    onError: () => {
      toast.error('Failed to remove from watchlist');
    },
  });

  const addToWatchlist = (contentId: string) => {
    if (!user) {
      toast.error('Please sign in to add items to your watchlist');
      return;
    }
    addToWatchlistMutation.mutate(contentId);
  };

  const removeFromWatchlist = (contentId: string) => {
    removeFromWatchlistMutation.mutate(contentId);
  };

  const isInWatchlist = (contentId: string) => {
    return watchlist.some(item => item.netflix_content_id === contentId);
  };

  return {
    watchlist,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    isAddingToWatchlist: addToWatchlistMutation.isPending,
    isRemovingFromWatchlist: removeFromWatchlistMutation.isPending,
  };
};

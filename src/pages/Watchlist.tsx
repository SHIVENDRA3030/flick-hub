
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Heart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { NetflixContent } from "@/types/netflix";
import { Button } from "@/components/ui/button";
import ThreeBackground from "@/components/ThreeBackground";
import NavMenu from "@/components/Menu";
import InteractiveCard from "@/components/InteractiveCard";
import { toast } from "sonner";

const Watchlist = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign in to view your watchlist");
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const { data: watchlistContent = [], isLoading } = useQuery({
    queryKey: ['watchlist-content', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('watchlist')
        .select(`
          netflix_content_id,
          netflix_content!inner(*)
        `)
        .eq('user_id', user.id);

      if (error) {
        toast.error("Failed to load watchlist");
        throw error;
      }
      
      return data.map(item => item.netflix_content) as NetflixContent[];
    },
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <ThreeBackground color="#111111" particleCount={800} />
      <NavMenu />
      
      <div className="max-w-7xl mx-auto p-6 pt-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/netflix")}
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Button>
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-600" />
              <h1 className="text-3xl font-bold">My Watchlist</h1>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg h-64" />
            ))}
          </div>
        ) : watchlistContent.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {watchlistContent.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <InteractiveCard content={content} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Your watchlist is empty</h3>
            <p className="text-gray-400 mb-6">
              Start adding movies and shows to keep track of what you want to watch!
            </p>
            <Button
              onClick={() => navigate("/netflix")}
              className="bg-red-600 hover:bg-red-700"
            >
              Browse Content
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;

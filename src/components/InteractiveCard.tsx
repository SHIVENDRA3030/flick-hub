import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NetflixContent } from "@/types/netflix";
import { useAuth } from "@/contexts/AuthContext";
import { useWatchlist } from "@/hooks/useWatchlist";

interface InteractiveCardProps {
  content: NetflixContent;
}

const InteractiveCard = ({ content }: InteractiveCardProps) => {
  const { user } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, isAddingToWatchlist, isRemovingFromWatchlist } = useWatchlist();

  // Floating animation variants
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  const inWatchlist = isInWatchlist(content.id);
  const isLoading = isAddingToWatchlist || isRemovingFromWatchlist;

  const handleWatchlistClick = () => {
    console.log('Watchlist button clicked for content:', content.id, 'current state:', inWatchlist);
    
    if (!user) {
      console.log('No user logged in');
      return;
    }
    
    if (isLoading) {
      console.log('Already processing watchlist action');
      return;
    }
    
    if (inWatchlist) {
      console.log('Removing from watchlist');
      removeFromWatchlist(content.id);
    } else {
      console.log('Adding to watchlist');
      addToWatchlist(content.id);
    }
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      variants={floatingVariants}
      whileInView="animate"
      viewport={{ once: false }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Link to={`/netflix/${content.id}`}>
        <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full hover:shadow-lg hover:shadow-red-500/20 transition-shadow duration-300">
          <div className="aspect-[2/3] relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
              animate={{
                x: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <img
              src={content.poster_url || "/placeholder.svg"}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            {content.content_type === "series" && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                SERIES
              </div>
            )}
            
            {/* Watchlist Button - Simplified approach */}
            {user && (
              <div
                className="absolute top-2 left-2 h-12 w-12 md:h-10 md:w-10 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleWatchlistClick();
                }}
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Heart 
                    className={`h-6 w-6 md:h-5 md:w-5 transition-colors duration-200 ${
                      inWatchlist 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-white hover:text-red-400'
                    }`}
                  />
                )}
              </div>
            )}
            
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="w-full">
                <span className="text-white text-xs flex items-center justify-between">
                  <span>View details</span>
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="w-full h-0.5 bg-gradient-to-r from-red-500 to-purple-600 mt-2"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold line-clamp-1">{content.title}</h3>
            {content.release_year && (
              <p className="text-gray-400 text-sm">{content.release_year}</p>
            )}
            {content.genre && content.genre.length > 0 && (
              <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                {content.genre.join(", ")}
              </p>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default InteractiveCard;

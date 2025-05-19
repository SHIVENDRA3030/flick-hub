
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { NetflixContent } from "@/types/netflix";

interface InteractiveCardProps {
  content: NetflixContent;
}

const InteractiveCard = ({ content }: InteractiveCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/netflix/${content.id}`}>
        <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full hover:shadow-lg hover:shadow-red-500/20 transition-shadow duration-300">
          <div className="aspect-[2/3] relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              src={content.poster_url || "/placeholder.svg"}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            {content.content_type === "series" && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                SERIES
              </div>
            )}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <span className="text-white text-xs">View details</span>
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

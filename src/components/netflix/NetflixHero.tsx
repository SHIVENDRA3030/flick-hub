
import React from "react";
import { NetflixContent } from "@/types/netflix";
import { Button } from "@/components/ui/button";
import { PlayCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface NetflixHeroProps {
  featured: NetflixContent;
}

const NetflixHero: React.FC<NetflixHeroProps> = ({ featured }) => {
  return (
    <div className="relative w-full h-[80vh] min-h-[600px]">
      {/* Hero background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background">
        {featured.poster_url ? (
          <img
            src={featured.poster_url}
            alt={featured.title}
            className="w-full h-full object-cover object-center opacity-50"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Hero content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{featured.title}</h1>
            
            <div className="flex items-center gap-3 mb-5">
              {featured.release_year && (
                <span className="text-gray-300">{featured.release_year}</span>
              )}
              <span className="text-gray-300 capitalize">{featured.content_type}</span>
              {featured.genre && featured.genre.length > 0 && (
                <span className="text-gray-300">{featured.genre.join(', ')}</span>
              )}
            </div>
            
            <p className="text-lg text-gray-300 mb-8 line-clamp-3">
              {featured.description}
            </p>
            
            <div className="flex gap-4">
              <Link to={`/netflix/${featured.id}`}>
                <Button size="lg" className="px-8">
                  <PlayCircle className="mr-2" /> Play
                </Button>
              </Link>
              <Link to={`/netflix/${featured.id}`}>
                <Button variant="outline" size="lg">
                  <Info className="mr-2" /> More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixHero;

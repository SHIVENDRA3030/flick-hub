
import React from "react";
import { NetflixContent } from "@/types/netflix";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface NetflixHeroProps {
  featured: NetflixContent;
}

const NetflixHero: React.FC<NetflixHeroProps> = ({ featured }) => {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
      
      {/* Background image */}
      {featured.poster_url && (
        <img
          src={featured.poster_url}
          alt={featured.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 z-20 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{featured.title}</h1>
        {featured.release_year && (
          <div className="text-xl font-semibold mb-2">{featured.release_year}</div>
        )}
        <p className="text-lg text-gray-200 mb-6 line-clamp-3">{featured.description}</p>
        
        <div className="flex flex-wrap gap-4">
          <Link to={`/netflix/${featured.id}`}>
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              <Play className="mr-2" /> Play
            </Button>
          </Link>
          <Link to={`/netflix/${featured.id}/details`}>
            <Button size="lg" variant="secondary">
              <Info className="mr-2" /> More Info
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NetflixHero;


import React from "react";
import { NetflixMovie } from "@/types/netflix";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NetflixRowProps {
  title: string;
  items: NetflixMovie[];
  className?: string;
}

const NetflixRow: React.FC<NetflixRowProps> = ({ title, items, className }) => {
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <Link 
            key={item.id} 
            to={`/netflix/${item.id}`}
            className="transition-transform duration-300 hover:scale-105"
          >
            <div className="rounded-md overflow-hidden shadow-lg bg-card h-full">
              {item.poster_url ? (
                <div className="w-full aspect-[2/3] relative">
                  <img 
                    src={item.poster_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[2/3] bg-secondary flex items-center justify-center">
                  <span className="text-2xl text-secondary-foreground">{item.title[0]}</span>
                </div>
              )}
              <div className="p-3">
                <h3 className="font-semibold truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {item.release_year} • {item.content_type}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NetflixRow;


import React from "react";
import { NetflixContent } from "@/types/netflix";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NetflixRowProps {
  title: string;
  items: NetflixContent[];
  className?: string;
}

const NetflixRow: React.FC<NetflixRowProps> = ({ title, items, className }) => {
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item) => (
          <Link 
            key={item.id} 
            to={`/netflix/${item.id}`}
            className="min-w-[180px] md:min-w-[220px] transition-transform duration-300 hover:scale-105"
          >
            <div className="rounded-md overflow-hidden shadow-lg bg-card">
              {item.poster_url ? (
                <img 
                  src={item.poster_url} 
                  alt={item.title} 
                  className="w-full aspect-[2/3] object-cover"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-secondary flex items-center justify-center">
                  <span className="text-secondary-foreground">{item.title[0]}</span>
                </div>
              )}
              <div className="p-2">
                <h3 className="font-semibold truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
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

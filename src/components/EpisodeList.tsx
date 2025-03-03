
import React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Episode {
  id: string;
  episode_number: number;
  episode_name: string;
  embed_code: string;
}

interface EpisodeListProps {
  episodes: Episode[];
  activeEpisodeId: string | null;
  onSelectEpisode: (episode: Episode) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ 
  episodes, 
  activeEpisodeId, 
  onSelectEpisode 
}) => {
  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
      {episodes.map((episode) => (
        <div 
          key={episode.id}
          onClick={() => onSelectEpisode(episode)}
          className={cn(
            "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors",
            activeEpisodeId === episode.id 
              ? "bg-red-700/30 border border-red-600" 
              : "hover:bg-gray-800/60 border border-gray-700"
          )}
        >
          <div className="flex-shrink-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            {activeEpisodeId === episode.id ? (
              <Play className="w-4 h-4 text-red-500 fill-current" />
            ) : (
              <span className="text-sm font-medium">{episode.episode_number}</span>
            )}
          </div>
          <div className="flex-grow">
            <h4 className="text-sm font-medium">Episode {episode.episode_number}</h4>
            <p className="text-xs text-gray-400">{episode.episode_name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;

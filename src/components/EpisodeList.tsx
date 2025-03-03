
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
  seriesTitle?: string;
  season?: string | number;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ 
  episodes, 
  activeEpisodeId, 
  onSelectEpisode,
  seriesTitle,
  season
}) => {
  // Find the active episode to display at the top
  const activeEpisode = episodes.find(ep => ep.id === activeEpisodeId);

  return (
    <div className="flex flex-col space-y-4">
      {activeEpisode && (
        <div className="mb-2">
          <h2 className="text-xl font-bold">
            Episode {activeEpisode.episode_number} : <span className="font-normal">{activeEpisode.episode_name}</span>
          </h2>
          {seriesTitle && (
            <div className="text-center mt-1">
              <h3 className="text-lg text-gray-300">{seriesTitle}</h3>
              {season && <p className="text-gray-400">season {season}</p>}
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {episodes.map((episode) => (
          <div 
            key={episode.id}
            onClick={() => onSelectEpisode(episode)}
            className={cn(
              "flex items-center cursor-pointer transition-colors border border-gray-700 rounded-md overflow-hidden",
              activeEpisodeId === episode.id 
                ? "bg-blue-900 border-blue-700" 
                : "hover:bg-gray-800"
            )}
          >
            <div className="flex-shrink-0 w-1/3 p-4 bg-black flex items-center justify-center">
              <span className="text-lg font-medium">Episode {episode.episode_number}</span>
            </div>
            <div className="flex-grow p-4 border-l border-gray-700">
              <p className="text-lg">{episode.episode_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;

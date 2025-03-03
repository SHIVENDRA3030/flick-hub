import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Film, Award, Star, Calendar, User, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NetflixContent } from "@/types/netflix";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ThreeBackground from "@/components/ThreeBackground";
import NavMenu from "@/components/Menu";
import { toast } from "sonner";
import EpisodeList, { Episode } from "@/components/EpisodeList";
import { useEpisodes } from "@/hooks/useEpisodes";

const NetflixDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null);
  const [currentEmbedCode, setCurrentEmbedCode] = useState<string | null>(null);
  
  const {
    data: content,
    isLoading,
    error
  } = useQuery({
    queryKey: ["netflix-content", id],
    queryFn: async () => {
      if (!id) throw new Error("Content ID is required");
      const { data, error } = await supabase
        .from("netflix_content")
        .select("*")
        .eq("id", id)
        .maybeSingle();
        
      if (error) {
        toast.error("Failed to load content: " + error.message);
        throw error;
      }
      if (!data) {
        throw new Error("Content not found");
      }
      return data as NetflixContent;
    }
  });

  const { 
    data: episodes = [], 
    isLoading: isLoadingEpisodes 
  } = useEpisodes(content?.content_type === "series" ? id : undefined);

  const handleSelectEpisode = (episode: Episode) => {
    setActiveEpisodeId(episode.id);
    setCurrentEmbedCode(episode.embed_code);
    document.getElementById("video-player")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (episodes.length > 0 && !activeEpisodeId) {
      handleSelectEpisode(episodes[0]);
    }
  }, [episodes, activeEpisodeId]);

  const getEmbedHtml = () => {
    if (currentEmbedCode) {
      return currentEmbedCode.replace('<iframe', '<iframe style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;"');
    }
    
    if (content?.embed_code) {
      return content.embed_code.replace('<iframe', '<iframe style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;"');
    } else if (content?.embed_url) {
      return `<iframe src="${content.embed_url}" style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;" allowfullscreen></iframe>`;
    }
    return null;
  };

  const embedHtml = getEmbedHtml();

  if (isLoading) {
    return <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
      </div>;
  }

  if (error || !content) {
    return <div className="min-h-screen bg-[#141414] text-white p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <Film className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
          <p className="text-gray-400 mb-6">
            The content you're looking for could not be found or is no longer available.
          </p>
          <Link to="/netflix">
            <Button className="bg-red-600 hover:bg-red-700">
              <ArrowLeft className="mr-2" /> Back to Browse
            </Button>
          </Link>
        </div>
      </div>;
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <ThreeBackground color="#111111" particleCount={1000} />
      <NavMenu />

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <div className="mb-6">
          <Link to="/netflix">
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
              <ArrowLeft className="mr-2" /> Back to Browse
            </Button>
          </Link>
        </div>

        {content.content_type === "series" && episodes.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            <div id="video-player" className="relative overflow-hidden rounded-lg bg-black aspect-video">
              {embedHtml ? (
                <div 
                  style={{ paddingBottom: '56.25%' }} 
                  dangerouslySetInnerHTML={{ __html: embedHtml }} 
                  className="w-full h-full relative"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-900">
                  <Play className="w-20 h-20 text-white opacity-70" />
                </div>
              )}
            </div>
            
            <div className="mt-2">
              <EpisodeList 
                episodes={episodes} 
                activeEpisodeId={activeEpisodeId} 
                onSelectEpisode={handleSelectEpisode}
                seriesTitle={content.title}
                season={content.season}
              />
            </div>
          </div>
        ) : (
          <div id="video-player" className="relative overflow-hidden rounded-lg bg-black aspect-video mb-8">
            {embedHtml ? (
              <div 
                style={{ paddingBottom: '56.25%' }} 
                dangerouslySetInnerHTML={{ __html: embedHtml }} 
                className="w-full h-full relative"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-900">
                <Play className="w-20 h-20 text-white opacity-70" />
              </div>
            )}
          </div>
        )}

        {(content.content_type !== "series" || episodes.length === 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
              
              {content.release_year && (
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{content.release_year}</span>
                  
                  {content.runtime && (
                    <>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4" />
                      <span>{content.runtime}</span>
                    </>
                  )}
                  
                  {content.resolution && (
                    <>
                      <span className="mx-2">•</span>
                      <Badge variant="outline" className="border-gray-600">
                        {content.resolution}
                      </Badge>
                    </>
                  )}
                </div>
              )}
              
              {content.description && <p className="text-gray-300 mb-6">{content.description}</p>}
              
              <div className="space-y-4">
                {content.genre && content.genre.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">GENRES</h3>
                    <div className="flex flex-wrap gap-2">
                      {content.genre.map((genre, index) => (
                        <Badge key={index} className="bg-gray-800 hover:bg-gray-700">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {content.actors && content.actors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">CAST</h3>
                    <div className="flex flex-wrap gap-2">
                      {content.actors.map((actor, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 flex items-center gap-1">
                          <User className="w-3 h-3" /> {actor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {content.awards && content.awards.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">AWARDS</h3>
                    <div className="flex flex-wrap gap-2">
                      {content.awards.map((award, index) => (
                        <Badge key={index} variant="outline" className="border-yellow-600 text-yellow-400 flex items-center gap-1">
                          <Award className="w-3 h-3" /> {award}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {content.content_type === "series" && (
                <div className="mt-8">
                  <Separator className="bg-gray-800 my-6" />
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-xl font-bold">
                      {content.season && `Season ${content.season}`}
                      {content.episode && content.season && ` | `}
                      {content.episode && `Episode ${content.episode}`}
                    </h2>
                    {activeEpisodeId ? (
                      <span className="text-gray-400">
                        {episodes.find(ep => ep.id === activeEpisodeId)?.episode_name || content.episode_title}
                      </span>
                    ) : (
                      content.episode_title && <span className="text-gray-400">"{content.episode_title}"</span>
                    )}
                  </div>
                  
                  {content.season_count && content.episode_count && (
                    <p className="text-sm text-gray-400 mb-4">
                      {content.season_count} {content.season_count === 1 ? "Season" : "Seasons"} | {content.episode_count} {content.episode_count === 1 ? "Episode" : "Episodes"} total
                    </p>
                  )}

                  {content.content_type === "series" && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Play className="w-5 h-5 text-red-600" />
                        Episodes
                      </h3>
                      
                      {isLoadingEpisodes ? (
                        <div className="space-y-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-16 bg-gray-800 animate-pulse rounded-md"></div>
                          ))}
                        </div>
                      ) : episodes.length > 0 ? (
                        <EpisodeList 
                          episodes={episodes} 
                          activeEpisodeId={activeEpisodeId} 
                          onSelectEpisode={handleSelectEpisode} 
                        />
                      ) : (
                        <div className="text-center py-6 bg-gray-800/30 rounded-md">
                          <p className="text-gray-400">No episodes available</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Film className="w-5 h-5 text-red-600" />
                  <span>Stream Details</span>
                </h3>
                
                <div className="space-y-4">
                  {content.maturity_rating && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-1">RATING</h4>
                      <Badge className="bg-gray-800">{content.maturity_rating}</Badge>
                    </div>
                  )}
                  
                  {content.duration && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-1">DURATION</h4>
                      <p className="text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {content.duration}
                      </p>
                    </div>
                  )}
                  
                  {content.resolution && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-1">QUALITY</h4>
                      <Badge variant="outline" className="border-gray-600">
                        {content.resolution}
                      </Badge>
                    </div>
                  )}
                  
                  {content.mood && content.mood.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-1">MOOD</h4>
                      <div className="flex flex-wrap gap-2">
                        {content.mood.map((mood, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-800">
                            {mood}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetflixDetails;

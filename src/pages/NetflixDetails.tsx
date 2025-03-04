import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Film, Award, Star, Calendar, User, Play, Info, Sun, Moon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NetflixContent } from "@/types/netflix";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import ThreeBackground from "@/components/ThreeBackground";
import NavMenu from "@/components/Menu";
import { toast } from "sonner";
import EpisodeList, { Episode } from "@/components/EpisodeList";
import { useEpisodes } from "@/hooks/useEpisodes";

const THEMES = {
  darkstark: {
    background: "#141414",
    primary: "#9b87f5",
    secondary: "#7E69AB",
    accent: "#6E59A5",
  },
  streamark: {
    background: "#1A1F2C",
    primary: "#0EA5E9",
    secondary: "#33C3F0",
    accent: "#1EAEDB",
  }
};

const NetflixDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null);
  const [currentEmbedCode, setCurrentEmbedCode] = useState<string | null>(null);
  const [theme, setTheme] = useState<"darkstark" | "streamark">(
    localStorage.getItem("preferred-theme") as "darkstark" | "streamark" || "darkstark"
  );
  
  console.log("Netflix Details Page - Current route ID:", id);
  
  const {
    data: content,
    isLoading,
    error
  } = useQuery({
    queryKey: ["netflix-content", id],
    queryFn: async () => {
      if (!id) throw new Error("Content ID is required");
      
      console.log("Fetching content details for ID:", id);
      const { data, error } = await supabase
        .from("netflix_content")
        .select("*")
        .eq("id", id)
        .maybeSingle();
        
      if (error) {
        console.error("Error fetching content details:", error);
        toast.error("Failed to load content: " + error.message);
        throw error;
      }
      if (!data) {
        console.error("No content found for ID:", id);
        throw new Error("Content not found");
      }
      
      console.log("Content loaded successfully:", data.title, "Type:", data.content_type);
      return data as NetflixContent;
    }
  });

  const { 
    data: episodes = [], 
    isLoading: isLoadingEpisodes 
  } = useEpisodes(id);
  
  useEffect(() => {
    console.log("NetflixDetails component - Current ID:", id);
    if (content) {
      console.log("Content type:", content.content_type);
      console.log("Content title:", content.title);
    }
    console.log("Episodes count:", episodes?.length || 0);
    if (episodes && episodes.length > 0) {
      console.log("First episode:", episodes[0]);
    }
  }, [id, content, episodes]);

  const handleSelectEpisode = (episode: Episode) => {
    console.log("Episode selected:", episode);
    setActiveEpisodeId(episode.id);
    setCurrentEmbedCode(episode.embed_code);
    document.getElementById("video-player")?.scrollIntoView({ behavior: "smooth" });
    toast.success(`Now playing: Episode ${episode.episode_number}`);
  };

  useEffect(() => {
    if (episodes && episodes.length > 0 && !activeEpisodeId) {
      console.log("Auto-selecting first episode:", episodes[0]);
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
  
  const toggleTheme = () => {
    const newTheme = theme === "darkstark" ? "streamark" : "darkstark";
    setTheme(newTheme);
    localStorage.setItem("preferred-theme", newTheme);
    toast.success(`Theme switched to ${newTheme === "darkstark" ? "Darkstark" : "Streamark"}`);
  };

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = THEMES[theme];
    
    root.style.setProperty('--theme-background', currentTheme.background);
    root.style.setProperty('--theme-primary', currentTheme.primary);
    root.style.setProperty('--theme-secondary', currentTheme.secondary);
    root.style.setProperty('--theme-accent', currentTheme.accent);
    
    document.body.style.backgroundColor = currentTheme.background;
  }, [theme]);

  if (isLoading) {
    return <div className="min-h-screen bg-[var(--theme-background,#141414)] text-white flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-[var(--theme-primary,#9b87f5)] border-t-transparent rounded-full"></div>
      </div>;
  }

  if (error || !content) {
    return <div className="min-h-screen bg-[var(--theme-background,#141414)] text-white p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <Film className="w-16 h-16 text-[var(--theme-primary,#9b87f5)] mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
          <p className="text-gray-400 mb-6">
            The content you're looking for could not be found or is no longer available.
          </p>
          <Link to="/netflix">
            <Button className="bg-[var(--theme-primary,#9b87f5)] hover:bg-[var(--theme-secondary,#7E69AB)]">
              <ArrowLeft className="mr-2" /> Back to Browse
            </Button>
          </Link>
        </div>
      </div>;
  }

  useEffect(() => {
    if (content?.content_type === 'series' && (!episodes || episodes.length === 0)) {
      console.log("This is a series but no episodes found. Check the database connection.");
    }
  }, [content, episodes]);

  return (
    <div className="min-h-screen bg-[var(--theme-background,#141414)] text-white">
      <ThreeBackground color={theme === "darkstark" ? "#111111" : "#151C2C"} particleCount={1000} />
      <NavMenu />

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <Link to="/netflix">
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
              <ArrowLeft className="mr-2" /> Back to Browse
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Moon className={`w-4 h-4 ${theme === "darkstark" ? "text-[var(--theme-primary,#9b87f5)]" : "text-gray-400"}`} />
            <Switch 
              checked={theme === "streamark"}
              onCheckedChange={toggleTheme}
              className={theme === "streamark" ? "bg-[var(--theme-primary,#0EA5E9)]" : ""}
            />
            <Sun className={`w-4 h-4 ${theme === "streamark" ? "text-[var(--theme-primary,#0EA5E9)]" : "text-gray-400"}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div id="video-player" className="lg:col-span-2 relative overflow-hidden rounded-lg bg-black aspect-video">
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
            <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
            {content.description && <p className="text-gray-300 mb-4">{content.description}</p>}
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Episodes</h3>
                <Badge className={`bg-[var(--theme-primary,#9b87f5)] text-white`}>
                  {content.content_type || "Unknown Type"}
                </Badge>
              </div>
              
              <EpisodeList 
                episodes={episodes} 
                activeEpisodeId={activeEpisodeId} 
                onSelectEpisode={handleSelectEpisode}
                seriesTitle={content.title}
                season={content.season}
                isLoading={isLoadingEpisodes}
              />
            </div>
            
            <div className="mt-6 space-y-4">
              {content.genre && content.genre.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">GENRES</h3>
                  <div className="flex flex-wrap gap-2">
                    {content.genre.map((genre, index) => (
                      <Badge key={index} className={`bg-gray-800 hover:bg-gray-700 ${theme === "streamark" ? "border-[var(--theme-primary,#0EA5E9)]" : ""}`}>
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {content.release_year && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{content.release_year}</span>
                  
                  {content.runtime && (
                    <>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4" />
                      <span>{content.runtime}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixDetails;

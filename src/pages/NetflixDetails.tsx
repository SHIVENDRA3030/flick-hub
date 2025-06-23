import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Film, Star, Calendar, Play, Info, Sun, Moon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NetflixContent } from "@/types/netflix";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import ThreeBackground from "@/components/ThreeBackground";
import NavMenu from "@/components/Menu";
import ContentConsentDialog from "@/components/ContentConsentDialog";
import { toast } from "sonner";
import EpisodeList, { Episode } from "@/components/EpisodeList";
import { useEpisodes } from "@/hooks/useEpisodes";
import { useIsMobile } from "@/hooks/use-mobile";

const THEMES = {
  darkstark: {
    background: "#141414",
    primary: "#9b87f5",
    secondary: "#7E69AB",
    accent: "#6E59A5"
  },
  streamark: {
    background: "#1A1F2C",
    primary: "#0EA5E9",
    secondary: "#33C3F0",
    accent: "#1EAEDB"
  }
};

const NetflixDetails = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [theme, setTheme] = useState<"darkstark" | "streamark">(localStorage.getItem("preferred-theme") as "darkstark" | "streamark" || "darkstark");
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null);
  const [currentEmbedCode, setCurrentEmbedCode] = useState<string | null>(null);
  const [hasUserConsent, setHasUserConsent] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [pendingEmbedCode, setPendingEmbedCode] = useState<string | null>(null);
  const isMobile = useIsMobile();
  console.log("NetflixDetails Page - Current route ID:", id);
  const {
    data: content,
    isLoading,
    error
  } = useQuery({
    queryKey: ["netflix-content", id],
    queryFn: async () => {
      if (!id) throw new Error("Content ID is required");
      console.log("Fetching content details for ID:", id);
      const {
        data,
        error
      } = await supabase.from("netflix_content").select("*").eq("id", id).maybeSingle();
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
  useEffect(() => {
    if (episodes && episodes.length > 0 && !activeEpisodeId) {
      console.log("Auto-selecting first episode:", episodes[0]);
      handleSelectEpisode(episodes[0]);
    }
  }, [episodes, activeEpisodeId]);
  useEffect(() => {
    if (content?.content_type === 'series' && (!episodes || episodes.length === 0)) {
      console.log("This is a series but no episodes found. Check the database connection.");
    }
  }, [content, episodes]);
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = THEMES[theme];
    root.style.setProperty('--theme-background', currentTheme.background);
    root.style.setProperty('--theme-primary', currentTheme.primary);
    root.style.setProperty('--theme-secondary', currentTheme.secondary);
    root.style.setProperty('--theme-accent', currentTheme.accent);
    document.body.style.backgroundColor = currentTheme.background;
  }, [theme]);
  const handleSelectEpisode = (episode: Episode) => {
    console.log("Episode selected:", episode);
    setActiveEpisodeId(episode.id);
    setCurrentEmbedCode(episode.embed_code);
    document.getElementById("video-player")?.scrollIntoView({
      behavior: "smooth"
    });
    toast.success(`Now playing: Episode ${episode.episode_number}`);
  };
  const getEmbedHtml = () => {
    if (!hasUserConsent) return null;
    
    // Fix the iframe styling to properly fill the container
    if (currentEmbedCode) {
      return currentEmbedCode
        .replace('<iframe', '<iframe style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;"')
        .replace('<IFRAME', '<iframe style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;"')
        .replace('</IFRAME>', '</iframe>');
    }
    if (content?.embed_code) {
      return content.embed_code
        .replace('<iframe', '<iframe style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;"')
        .replace('<IFRAME', '<iframe style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;"')
        .replace('</IFRAME>', '</iframe>');
    } else if (content?.embed_url) {
      return `<iframe src="${content.embed_url}" style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;" allowfullscreen></iframe>`;
    }
    return null;
  };
  const handleLoadContent = () => {
    const embedCode = currentEmbedCode || content?.embed_code;
    if (embedCode || content?.embed_url) {
      setPendingEmbedCode(embedCode);
      setShowConsentDialog(true);
    }
  };

  const handleConsentAccept = () => {
    setHasUserConsent(true);
    setShowConsentDialog(false);
    toast.success("Content loaded successfully!");
  };

  const extractUrlFromEmbed = (embedCode: string | null): string | undefined => {
    if (!embedCode) return undefined;
    const srcMatch = embedCode.match(/src=["']([^"']+)["']/i);
    return srcMatch ? srcMatch[1] : undefined;
  };

  const toggleTheme = () => {
    const newTheme = theme === "darkstark" ? "streamark" : "darkstark";
    setTheme(newTheme);
    localStorage.setItem("preferred-theme", newTheme);
    toast.success(`Theme switched to ${newTheme === "darkstark" ? "Darkstark" : "Streamark"}`);
  };
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
  const embedHtml = getEmbedHtml();
  const currentEmbedUrl = extractUrlFromEmbed(currentEmbedCode) || 
                         extractUrlFromEmbed(content?.embed_code) || 
                         content?.embed_url;

  return (
    <div className="min-h-screen bg-[var(--theme-background,#141414)] text-white overflow-x-hidden">
      <ThreeBackground color={theme === "darkstark" ? "#111111" : "#151C2C"} particleCount={isMobile ? 500 : 1000} />
      <NavMenu />

      <ContentConsentDialog
        isOpen={showConsentDialog}
        onOpenChange={setShowConsentDialog}
        onAccept={handleConsentAccept}
        contentTitle={content?.title || "Unknown Content"}
        embedUrl={currentEmbedUrl}
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 relative z-10">
        {/* Header section with back button and theme switch */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 py-3">
          <Link to="/netflix">
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800 px-2 sm:px-4">
              <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> 
              <span className="text-sm sm:text-base">Back</span>
            </Button>
          </Link>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Moon className={`w-3 h-3 sm:w-4 sm:h-4 ${theme === "darkstark" ? "text-[var(--theme-primary,#9b87f5)]" : "text-gray-400"}`} />
            <Switch 
              checked={theme === "streamark"} 
              onCheckedChange={toggleTheme} 
              className={theme === "streamark" ? "bg-[var(--theme-primary,#0EA5E9)]" : ""} 
            />
            <Sun className={`w-3 h-3 sm:w-4 sm:h-4 ${theme === "streamark" ? "text-[var(--theme-primary,#0EA5E9)]" : "text-gray-400"}`} />
          </div>
        </div>

        {/* Main content container */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Video player - Full width on mobile, 2/3 on desktop */}
          <div id="video-player" className="lg:col-span-2 relative overflow-hidden w-full rounded-lg mb-4 lg:mb-0 bg-transparent">
            {embedHtml ? (
              <div className="w-full aspect-video relative">
                <div dangerouslySetInnerHTML={{ __html: embedHtml }} className="absolute inset-0" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-900 aspect-video gap-4">
                <Play className="w-16 h-16 sm:w-20 sm:h-20 text-white opacity-70" />
                <Button 
                  onClick={handleLoadContent}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Load Content
                </Button>
                <p className="text-gray-400 text-sm text-center max-w-md">
                  Click to load external video content. You'll be asked to confirm loading from third-party sources.
                </p>
              </div>
            )}
            {content?.resolution && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-blue-900 text-blue-100 text-xs">
                  {content.resolution}
                </Badge>
              </div>
            )}
          </div>
          
          {/* Content details - Full width on mobile, 1/3 on desktop */}
          <div className="w-full lg:col-span-1 px-1 sm:px-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{content?.title}</h1>
            
            {content?.description && <p className="text-sm sm:text-base text-gray-300 mb-4 line-clamp-3 sm:line-clamp-none">
                {content.description}
              </p>}
            
            {/* Episodes section */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-semibold">Episodes</h3>
                <Badge className={`bg-[var(--theme-primary,#9b87f5)] text-white text-xs`}>
                  {content?.content_type || "Unknown Type"}
                </Badge>
              </div>
              
              <EpisodeList episodes={episodes} activeEpisodeId={activeEpisodeId} onSelectEpisode={handleSelectEpisode} seriesTitle={content?.title} season={content?.season} isLoading={isLoadingEpisodes} />
            </div>
            
            {/* Metadata section */}
            <div className="mt-4 space-y-3 sm:space-y-4">
              {content?.genre && content.genre.length > 0 && <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-400 mb-1 sm:mb-2">GENRES</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {content.genre.map((genre, index) => <Badge key={index} className={`text-xs bg-gray-800 hover:bg-gray-700 ${theme === "streamark" ? "border-[var(--theme-primary,#0EA5E9)]" : ""}`}>
                        {genre}
                      </Badge>)}
                  </div>
                </div>}
              
              {content?.release_year && <div className="flex items-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{content.release_year}</span>
                  
                  {content.runtime && <>
                      <span className="mx-1 sm:mx-2">•</span>
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{content.runtime}</span>
                    </>}
                  
                  {content.resolution && <>
                      <span className="mx-1 sm:mx-2">•</span>
                      <Badge className="bg-blue-900 text-blue-100 text-xs">
                        {content.resolution}
                      </Badge>
                    </>}
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixDetails;

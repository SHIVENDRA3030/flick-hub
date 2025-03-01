
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NetflixContent } from "@/types/netflix";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NetflixPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: content, isLoading } = useQuery({
    queryKey: ["netflix-content", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("netflix_content")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as NetflixContent;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading content...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/netflix")}
            className="mb-8"
          >
            <ArrowLeft className="mr-2" /> Back to Netflix
          </Button>
          <h1 className="text-4xl font-bold mb-8">Content Not Found</h1>
          <p>The requested content could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/netflix")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2" /> Back to Netflix
        </Button>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {content.release_year && (
              <Badge variant="outline" className="text-sm">
                {content.release_year}
              </Badge>
            )}
            <Badge variant="outline" className="text-sm capitalize">
              {content.content_type}
            </Badge>
            {content.genre && content.genre.map((g) => (
              <Badge key={g} variant="secondary" className="text-sm">
                {g}
              </Badge>
            ))}
          </div>
          <p className="text-lg text-gray-300 mb-6">{content.description}</p>
        </div>
        
        <div className="aspect-video bg-black rounded-lg overflow-hidden w-full">
          {content.embed_code ? (
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: content.embed_code }} 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p>No embed code available for this content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetflixPlayer;

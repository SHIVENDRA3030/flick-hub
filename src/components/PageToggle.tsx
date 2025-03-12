
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Film, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface PageToggleProps {
  className?: string;
}

const PageToggle = ({ className }: PageToggleProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isNetflixPage = location.pathname.startsWith("/netflix");
  
  const handleToggle = (checked: boolean) => {
    if (checked) {
      navigate("/netflix");
    } else {
      navigate("/");
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-3 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg transition-all duration-300",
      className
    )}>
      <div className={cn(
        "flex items-center gap-2",
        isNetflixPage ? "text-muted-foreground" : "text-primary font-semibold"
      )}>
        <Home className="w-4 h-4" />
        {!isMobile && <span>Home</span>}
      </div>
      
      <Switch
        checked={isNetflixPage}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-primary transition-colors duration-300"
      />
      
      <div className={cn(
        "flex items-center gap-2",
        isNetflixPage ? "text-red-500 font-semibold" : "text-muted-foreground"
      )}>
        <Film className="w-4 h-4" />
        {!isMobile && <span>Netflix</span>}
      </div>
    </div>
  );
};

export default PageToggle;

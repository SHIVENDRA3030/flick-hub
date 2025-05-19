
import React from "react";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageToggleProps {
  className?: string;
}

const PageToggle = ({ className }: PageToggleProps) => {
  return (
    <div className={cn(
      "flex items-center gap-3 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg transition-all duration-300",
      className
    )}>
      <div className="flex items-center gap-2 text-red-500 font-semibold">
        <Film className="w-4 h-4" />
        <span>STREAMARK</span>
      </div>
    </div>
  );
};

export default PageToggle;


import React, { useState, useEffect } from "react";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PageToggleProps {
  className?: string;
}

const PageToggle = ({
  className
}: PageToggleProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide toggle when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div 
      initial={{
        opacity: 0,
        y: -20
      }} 
      animate={{
        opacity: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : -10,
        scale: isVisible ? 1 : 0.95
      }} 
      transition={{
        duration: 0.3
      }}
      className={cn("relative flex items-center gap-3 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg overflow-hidden", className)}
    >
      {/* Wave background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 opacity-50"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
      />
      <div className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-400 transition-colors duration-300 z-10">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Film className="w-4 h-4" />
        </motion.div>
        <span>DARK-STARK</span>
      </div>
    </motion.div>
  );
};

export default PageToggle;

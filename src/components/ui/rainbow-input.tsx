
import * as React from "react";
import { cn } from "@/lib/utils";

const RainbowInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md px-3 py-2 text-base text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "bg-secondary/50 border-secondary",
            "relative z-10",
            className
          )}
          ref={ref}
          {...props}
        />
        <div 
          className="absolute inset-0 rounded-md animate-rainbow z-0
          [background:linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] 
          bg-[length:200%] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
        ></div>
        <div 
          className="absolute inset-0.5 rounded-md bg-secondary/70 backdrop-blur-md z-[1]"
        ></div>
      </div>
    );
  }
);
RainbowInput.displayName = "RainbowInput";

export { RainbowInput };

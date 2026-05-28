import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "text" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base premium transition classes
        "relative inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest text-xs transition-all duration-500 overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        
        // Size adjustments
        size === "sm" && "px-4 py-2 text-[10px]",
        size === "md" && "px-7 py-3.5",
        size === "lg" && "px-10 py-5 text-sm",

        // Variant styles
        variant === "primary" && 
          "bg-stone-950 text-white border border-stone-800 hover:bg-stone-900 hover:border-stone-500 shadow-md dark:bg-stone-950 dark:text-white dark:border-stone-800 dark:hover:border-stone-600",
        
        variant === "secondary" && 
          "bg-white text-stone-950 border border-stone-200 hover:bg-stone-50 hover:border-stone-400 dark:bg-stone-50 dark:text-stone-950 dark:border-transparent dark:hover:bg-stone-200",
        
        variant === "gold" && 
          "bg-[#D4AF37] text-stone-950 border border-transparent hover:bg-[#C5A028] hover:shadow-[0_0_15px_rgba(212,175,55,0.35)]",
        
        variant === "outline" && 
          "bg-transparent text-stone-950 border border-stone-300 hover:bg-stone-50 dark:text-white dark:border-stone-800 dark:hover:bg-stone-900 dark:hover:border-stone-600",
          
        variant === "text" && 
          "bg-transparent text-stone-800 border-none p-0 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white transition-colors duration-300",

        className
      )}
      {...props}
    >
      {/* Background slide animation effect for primary/outline styles */}
      {(variant === "primary" || variant === "outline") && (
        <span className="absolute inset-0 block w-full h-full bg-[#D4AF37]/5 translate-y-full hover:translate-y-0 transition-transform duration-500 ease-out -z-10" />
      )}
      
      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === "left" && <span className="transition-transform duration-300 group-hover:-translate-x-1">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </span>
    </button>
  );
}

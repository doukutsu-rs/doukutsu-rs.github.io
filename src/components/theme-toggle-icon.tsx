"use client";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { memo } from "react";

const iconStyles = "transition-[transform,color]";

export const ThemeToggleIcon = memo(function ThemeToggleIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <div className="relative">
      <Sun
        className={cn(
          iconStyles,
          "absolute",
          "-rotate-90 scale-0 dark:-rotate-0 dark:scale-100",
          className
        )}
      />
      <Moon
        className={cn(
          iconStyles,
          "rotate-0 scale-100 dark:rotate-90 dark:scale-0",
          className
        )}
      />
    </div>
  );
});

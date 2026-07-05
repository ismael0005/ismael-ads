import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TvFrameProps {
  children: ReactNode;
  className?: string;
  showStand?: boolean;
}

/** The shared Smart TV mockup used across the hero, platform, format, and testimonial sections — the screen slot is the only thing that changes. */
export function TvFrame({ children, className, showStand = true }: TvFrameProps) {
  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-2xl border-[6px] border-foreground/15 bg-background shadow-2xl",
          className
        )}
      >
        {children}
      </div>
      {showStand && (
        <div className="flex flex-col items-center" aria-hidden="true">
          <div className="h-3 w-2.5 bg-foreground/15" />
          <div className="h-1.5 w-1/4 rounded-full bg-foreground/10" />
        </div>
      )}
    </div>
  );
}

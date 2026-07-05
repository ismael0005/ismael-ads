import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MonitorFrameProps {
  children: ReactNode;
  className?: string;
}

/** A desktop monitor mockup — thin bezel, center pedestal stand. Distinct from TvFrame's simpler neck+base silhouette. */
export function MonitorFrame({ children, className }: MonitorFrameProps) {
  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-xl border-[5px] border-foreground/15 bg-background shadow-2xl",
          className
        )}
      >
        {children}
      </div>
      <div className="flex flex-col items-center" aria-hidden="true">
        <div className="h-5 w-3 bg-gradient-to-b from-foreground/15 to-foreground/8" />
        <div className="h-1.5 w-2/5 rounded-full bg-foreground/12" />
      </div>
    </div>
  );
}

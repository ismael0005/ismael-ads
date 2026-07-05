import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TabletFrameProps {
  children: ReactNode;
  className?: string;
}

/** A tablet mockup — thick uniform bezel, no notch, no stand (tablets float free in this ecosystem). */
export function TabletFrame({ children, className }: TabletFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] border-[8px] border-foreground/15 bg-background shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}

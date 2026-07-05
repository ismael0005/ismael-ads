import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface LaptopFrameProps {
  children: ReactNode;
  className?: string;
}

/** A laptop mockup — screen + a keyboard-deck base, distinct from MonitorFrame's pedestal stand. */
export function LaptopFrame({ children, className }: LaptopFrameProps) {
  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-t-lg border-[5px] border-b-0 border-foreground/15 bg-background shadow-2xl",
          className
        )}
      >
        {children}
      </div>
      <div aria-hidden="true" className="h-2.5 w-full rounded-b-xl bg-gradient-to-b from-foreground/15 to-foreground/5" />
      <div aria-hidden="true" className="mx-auto h-1.5 w-1/4 rounded-b-lg bg-foreground/10" />
    </div>
  );
}

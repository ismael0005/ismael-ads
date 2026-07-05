import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

/** The shared 3D phone bezel used across the hero, format showcase, and testimonial sections — the screen slot is the only thing that changes. */
export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.6rem] border-[6px] border-foreground/15 bg-background shadow-2xl",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground/15"
      />
      <div className="relative h-full w-full overflow-hidden">{children}</div>
    </div>
  );
}

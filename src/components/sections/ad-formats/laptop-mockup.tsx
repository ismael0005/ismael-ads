"use client";

import { motion } from "framer-motion";

import { TiltCard } from "@/components/ui/tilt-card";
import { AdSlot } from "@/components/sections/ad-formats/ad-slot";
import type { AdFormatDemo } from "@/data/home";

interface LaptopMockupProps {
  formatId: string;
  formats: AdFormatDemo[];
}

export function LaptopMockup({ formatId, formats }: LaptopMockupProps) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
    <TiltCard maxTilt={4} className="mx-auto w-full max-w-lg">
      <div className="rounded-t-xl border border-b-0 border-border/60 bg-muted/30 p-2">
        <div className="flex items-center gap-1.5 rounded-lg bg-background/80 px-3 py-2">
          <span className="size-2 rounded-full bg-red-400/70" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-green-400/70" />
          <div className="ml-2 flex-1 truncate rounded-full bg-muted px-3 py-1 text-[9px] text-muted-foreground">
            ismaelads.com/publisher-demo
          </div>
        </div>
      </div>

      <div className="relative h-64 overflow-hidden border border-border/60 bg-background sm:h-72">
        <div className="absolute inset-x-6 top-32 space-y-2.5 opacity-25 sm:top-36">
          <div className="h-2 w-1/3 rounded-full bg-foreground" />
          <div className="h-2 w-2/3 rounded-full bg-foreground" />
          <div className="h-2 w-1/2 rounded-full bg-foreground" />
        </div>

        <AdSlot formatId={formatId} formats={formats} device="laptop" />
      </div>

      {/* laptop base */}
      <div className="mx-auto h-3 w-full rounded-b-xl bg-gradient-to-b from-muted/60 to-muted/20" />
      <div className="mx-auto h-1.5 w-1/3 rounded-b-lg bg-muted/40" />
    </TiltCard>
    </motion.div>
  );
}

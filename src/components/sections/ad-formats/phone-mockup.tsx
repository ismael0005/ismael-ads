"use client";

import { motion } from "framer-motion";

import { TiltCard } from "@/components/ui/tilt-card";
import { AdSlot } from "@/components/sections/ad-formats/ad-slot";
import type { AdFormatDemo } from "@/data/home";

interface PhoneMockupProps {
  formatId: string;
  formats: AdFormatDemo[];
}

export function PhoneMockup({ formatId, formats }: PhoneMockupProps) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
    >
    <TiltCard maxTilt={6} className="mx-auto w-48">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border-[6px] border-foreground/10 bg-background shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-3 text-[9px] font-medium text-muted-foreground">
          <span>9:41</span>
          <span>●●●</span>
        </div>

        <div className="space-y-2.5 px-3 pt-4">
          <div className="h-20 rounded-xl bg-foreground/10" />
          <div className="flex items-center gap-2">
            <span className="size-5 shrink-0 rounded-full bg-foreground/10" />
            <div className="h-1.5 w-2/3 rounded-full bg-foreground/15" />
          </div>
          <div className="h-1.5 w-1/2 rounded-full bg-foreground/10" />
        </div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-3 top-44 space-y-2 opacity-40"
        >
          <div className="h-16 rounded-xl bg-foreground/10" />
          <div className="h-1.5 w-3/4 rounded-full bg-foreground/15" />
        </motion.div>

        <AdSlot formatId={formatId} formats={formats} device="phone" />
      </div>
    </TiltCard>
    </motion.div>
  );
}

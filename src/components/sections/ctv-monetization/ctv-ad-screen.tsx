"use client";

import type { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause as PauseIcon, Radio } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import type { CtvAdFormat, CtvAdFormatId } from "@/data/ctv-monetization";

function ScreenChrome() {
  return (
    <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[9px] font-semibold text-white/70 sm:top-4 sm:left-4">
      <Radio className="size-3" aria-hidden="true" />
      LIVE
    </div>
  );
}

function BackdropContent() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5" />
  );
}

function PreRollCreative({ format }: { format: CtvAdFormat }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/20 to-secondary/15">
      <span className={cn("flex size-12 items-center justify-center rounded-2xl ring-1 sm:size-14", accentChipClasses[format.accent])}>
        <Icon className="size-6 sm:size-7" aria-hidden="true" />
      </span>
      <p className="text-sm font-bold text-foreground sm:text-base">Your video starts after this ad</p>
      <div className="mt-1 h-1 w-40 overflow-hidden rounded-full bg-white/20 sm:w-56">
        <motion.div
          className="h-full origin-left rounded-full bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <span className="absolute top-3 right-3 rounded-full bg-black/40 px-2 py-1 text-[9px] font-semibold text-white sm:top-4 sm:right-4">
        Ad 1 of 2
      </span>
    </div>
  );
}

function MidRollCreative({ format }: { format: CtvAdFormat }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary/20 to-accent/15">
      <span className={cn("flex size-12 items-center justify-center rounded-2xl ring-1 sm:size-14", accentChipClasses[format.accent])}>
        <Icon className="size-6 sm:size-7" aria-hidden="true" />
      </span>
      <p className="text-sm font-bold text-foreground sm:text-base">Resuming Northern Lights in 0:08</p>
      <span className="rounded-full bg-white/15 px-3 py-1 text-[9px] font-semibold text-foreground backdrop-blur">
        Mid-roll break
      </span>
    </div>
  );
}

function PauseAdsCreative({ format }: { format: CtvAdFormat }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 backdrop-blur-[1px]">
      <div className={cn(glass.base, glass.light, "flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl")}>
        <span className={cn("flex size-9 items-center justify-center rounded-xl ring-1", accentChipClasses[format.accent])}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold text-foreground">Paused — Sponsored</p>
          <p className="text-[10px] text-muted-foreground">{format.tagline}</p>
        </div>
      </div>
      <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[9px] font-semibold text-white sm:top-4 sm:left-4">
        <PauseIcon className="size-2.5" aria-hidden="true" />
        Paused
      </span>
    </div>
  );
}

function HomeScreenCreative({ format }: { format: CtvAdFormat }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-background via-primary/15 to-accent/10 p-4 sm:p-5">
      <span className="w-fit rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-bold text-primary-text ring-1 ring-primary/30">
        Sponsored
      </span>
      <div className="flex items-center gap-2">
        <span className={cn("flex size-8 items-center justify-center rounded-lg ring-1", accentChipClasses[format.accent])}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <p className="font-heading text-sm font-bold text-foreground sm:text-base">Featured before you press play</p>
      </div>
    </div>
  );
}

function InteractiveCreative({ format }: { format: CtvAdFormat }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent/20 to-primary/15">
      <motion.span
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className={cn("flex size-12 items-center justify-center rounded-2xl ring-1 sm:size-14", accentChipClasses[format.accent])}
      >
        <Icon className="size-6 sm:size-7" aria-hidden="true" />
      </motion.span>
      <p className="text-sm font-bold text-foreground sm:text-base">Press OK on your remote to explore</p>
      <span className="rounded-full border border-white/30 px-3 py-1 text-[9px] font-bold text-foreground">OK</span>
    </div>
  );
}

function CompanionCreative({ format }: { format: CtvAdFormat }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-0 flex bg-background">
      <div className="flex-1 bg-gradient-to-br from-primary/15 to-secondary/10" />
      <div className={cn(glass.base, glass.light, "flex w-1/3 flex-col items-center justify-center gap-2 p-2")}>
        <span className={cn("flex size-8 items-center justify-center rounded-lg ring-1", accentChipClasses[format.accent])}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <p className="text-center text-[9px] font-semibold text-foreground">Companion Ad</p>
      </div>
    </div>
  );
}

function OverlayCreative({ format }: { format: CtvAdFormat }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 to-accent/10">
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/50 px-3 py-2 backdrop-blur-sm sm:px-4 sm:py-2.5">
        <span className={cn("flex size-6 items-center justify-center rounded-md ring-1", accentChipClasses[format.accent])}>
          <Icon className="size-3.5" aria-hidden="true" />
        </span>
        <p className="truncate text-[10px] font-semibold text-white sm:text-xs">{format.label} · non-intrusive lower third</p>
      </div>
    </div>
  );
}

function SponsoredChannelsCreative({ format }: { format: CtvAdFormat }) {
  const Icon = format.icon;
  const rows = ["News 24", "Sponsored Channel", "Sports Live"];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-1.5 bg-background p-3 sm:p-4">
      {rows.map((row, index) => (
        <div
          key={row}
          className={cn(
            "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold",
            index === 1
              ? cn(accentChipClasses[format.accent], "ring-1")
              : "bg-foreground/5 text-muted-foreground"
          )}
        >
          {index === 1 && <Icon className="size-3.5" aria-hidden="true" />}
          {row}
        </div>
      ))}
    </div>
  );
}

const CREATIVES: Record<CtvAdFormatId, (props: { format: CtvAdFormat }) => ReactElement> = {
  "pre-roll": PreRollCreative,
  "mid-roll": MidRollCreative,
  "pause-ads": PauseAdsCreative,
  "home-screen": HomeScreenCreative,
  interactive: InteractiveCreative,
  companion: CompanionCreative,
  overlay: OverlayCreative,
  "sponsored-channels": SponsoredChannelsCreative,
};

interface CtvAdScreenProps {
  format: CtvAdFormat;
  className?: string;
}

/** Renders one CTV ad format's mock creative inside a TV screen — used by the format-cycling section. */
export function CtvAdScreen({ format, className }: CtvAdScreenProps) {
  const Creative = CREATIVES[format.id];

  return (
    <div className={cn("relative h-full w-full bg-background", className)}>
      <BackdropContent />
      <ScreenChrome />
      <AnimatePresence mode="wait">
        <motion.div
          key={format.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Creative format={format} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

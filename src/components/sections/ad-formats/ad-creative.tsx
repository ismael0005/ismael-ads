"use client";

import type { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import type { AdFormatDefinition, AdFormatId } from "@/data/ad-formats";

function AppChrome() {
  return (
    <div className="absolute inset-0 space-y-2 p-3 opacity-[0.16] sm:p-4">
      <div className="h-2 w-1/2 rounded-full bg-foreground" />
      <div className="h-10 w-full rounded-lg bg-foreground/20 sm:h-16" />
      <div className="h-2 w-2/3 rounded-full bg-foreground" />
      <div className="h-2 w-1/3 rounded-full bg-foreground" />
    </div>
  );
}

function BannerCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-x-3 top-3 sm:inset-x-6 sm:top-6">
      <div className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-lg px-2.5 py-2 sm:gap-3 sm:px-4 sm:py-3")}>
        <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-md ring-1 sm:size-8", accentChipClasses[format.accent])}>
          <Icon className="size-3.5 sm:size-4" aria-hidden="true" />
        </span>
        <p className="truncate text-[9px] font-bold text-foreground sm:text-xs">{format.label} Ad</p>
      </div>
    </div>
  );
}

function NativeCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 sm:inset-x-10">
      <div className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-xl p-2.5 sm:gap-3 sm:p-4")}>
        <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg ring-1 sm:size-10", accentChipClasses[format.accent])}>
          <Icon className="size-3.5 sm:size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded-full bg-foreground/20" />
          <div className="h-1.5 w-1/2 rounded-full bg-foreground/12" />
        </div>
      </div>
    </div>
  );
}

function StickyCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6"
    >
      <div className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3 py-2")}>
        <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full ring-1", accentChipClasses[format.accent])}>
          <Icon className="size-3.5" aria-hidden="true" />
        </span>
        <p className="truncate text-[9px] font-bold text-foreground sm:text-xs">Sticky · Always in view</p>
      </div>
    </motion.div>
  );
}

function AnchorCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <div className={cn(glass.base, glass.light, "absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-lg px-2 py-1.5 sm:inset-x-4 sm:bottom-4")}>
      <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-md ring-1 sm:size-6", accentChipClasses[format.accent])}>
        <Icon className="size-3 sm:size-3.5" aria-hidden="true" />
      </span>
      <p className="truncate text-[8px] font-semibold text-foreground sm:text-[10px]">Anchor · 320×50</p>
    </div>
  );
}

function InterstitialCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-3 flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/15 ring-1 ring-border sm:inset-6 sm:gap-3">
      <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-foreground/10 text-foreground/70 sm:top-3 sm:right-3">
        <X className="size-3" aria-hidden="true" />
      </span>
      <span className={cn("flex size-9 items-center justify-center rounded-2xl ring-1 sm:size-12", accentChipClasses[format.accent])}>
        <Icon className="size-4.5 sm:size-6" aria-hidden="true" />
      </span>
      <p className="text-xs font-bold text-foreground sm:text-sm">{format.label}</p>
    </div>
  );
}

function RewardedCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-3 flex flex-col items-center justify-center gap-2 rounded-2xl bg-background/95 ring-1 ring-border sm:inset-6">
      <motion.span
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className={cn("flex size-9 items-center justify-center rounded-2xl ring-1 sm:size-12", accentChipClasses[format.accent])}
      >
        <Icon className="size-4.5 sm:size-6" aria-hidden="true" />
      </motion.span>
      <p className="text-[10px] font-bold text-foreground sm:text-sm">Watch to earn reward</p>
      <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[9px] font-semibold text-primary-text ring-1 ring-primary/25 sm:text-[10px]">
        +50 Coins
      </span>
    </div>
  );
}

function VideoCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-3 flex items-center justify-center rounded-2xl bg-gradient-to-br from-foreground/10 to-foreground/[0.02] sm:inset-6">
      <motion.span
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className={cn("flex size-10 items-center justify-center rounded-full ring-1 sm:size-14", accentChipClasses[format.accent])}
      >
        <Icon className="size-5 sm:size-7" aria-hidden="true" />
      </motion.span>
      <span className="absolute bottom-2 left-2 text-[8px] font-semibold text-foreground/80 sm:bottom-4 sm:left-4 sm:text-[10px]">
        {format.label} · 0:15
      </span>
    </div>
  );
}

function InArticleCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 space-y-2 sm:inset-x-8">
      <div className="h-1.5 w-full rounded-full bg-foreground/12" />
      <div className="h-1.5 w-4/5 rounded-full bg-foreground/12" />
      <div className={cn(glass.base, glass.light, "my-2 flex items-center gap-2 rounded-lg p-2")}>
        <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-md ring-1", accentChipClasses[format.accent])}>
          <Icon className="size-3.5" aria-hidden="true" />
        </span>
        <p className="truncate text-[9px] font-semibold text-foreground">In-Article Ad</p>
      </div>
      <div className="h-1.5 w-3/4 rounded-full bg-foreground/12" />
    </div>
  );
}

function InFeedCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-3 grid grid-cols-3 gap-1.5 sm:inset-6 sm:gap-2">
      {[0, 1, 2].map((cell) => (
        <div
          key={cell}
          className={cn(
            "flex items-center justify-center rounded-lg",
            cell === 1 ? cn(accentChipClasses[format.accent], "ring-1") : "bg-foreground/[0.06]"
          )}
        >
          {cell === 1 && <Icon className="size-4 sm:size-5" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

function CtvCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/20 to-accent/10">
      <span className={cn("flex size-10 items-center justify-center rounded-2xl ring-1 sm:size-14", accentChipClasses[format.accent])}>
        <Icon className="size-5 sm:size-7" aria-hidden="true" />
      </span>
      <p className="text-[10px] font-bold text-foreground sm:text-sm">Living Room Premium Video</p>
      <div className="h-1 w-24 overflow-hidden rounded-full bg-white/20 sm:w-32">
        <motion.div
          className="h-full origin-left rounded-full bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

const CREATIVES: Record<AdFormatId, (props: { format: AdFormatDefinition }) => ReactElement> = {
  display: BannerCreative,
  native: NativeCreative,
  sticky: StickyCreative,
  anchor: AnchorCreative,
  interstitial: InterstitialCreative,
  rewarded: RewardedCreative,
  video: VideoCreative,
  "in-article": InArticleCreative,
  "in-feed": InFeedCreative,
  ctv: CtvCreative,
};

interface AdCreativeProps {
  format: AdFormatDefinition;
  className?: string;
  showChrome?: boolean;
  /** Icon-only rendering for very small devices (e.g. hero satellites) — the full creatives are tuned for 150px+ screens and overflow badly below that. */
  compact?: boolean;
}

function CompactCreative({ format }: { format: AdFormatDefinition }) {
  const Icon = format.icon;
  return (
    <div className={cn("flex h-full w-full items-center justify-center", accentChipClasses[format.accent])}>
      <Icon className="size-4" aria-hidden="true" />
    </div>
  );
}

/** Renders one ad format's mock creative inside any device frame — the single source of truth reused across the hero, showroom, and every device-experience section. */
export function AdCreative({ format, className, showChrome = true, compact = false }: AdCreativeProps) {
  const Creative = compact ? CompactCreative : CREATIVES[format.id];

  return (
    <div className={cn("relative h-full w-full bg-background", className)}>
      {showChrome && !compact && <AppChrome />}
      <AnimatePresence mode="wait">
        <motion.div
          key={format.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Creative format={format} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

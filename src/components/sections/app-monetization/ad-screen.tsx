"use client";

import type { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import type { AdFormatContent, AdFormatId } from "@/data/app-monetization";

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 pt-3">
      <span className="text-[9px] font-medium text-foreground/60">9:41</span>
      <span className="text-[9px] font-medium text-foreground/60">●●●●</span>
    </div>
  );
}

function AppChrome() {
  return (
    <div className="space-y-2.5 px-4 pt-4 opacity-[0.18]">
      <div className="h-2 w-2/3 rounded-full bg-foreground" />
      <div className="h-16 w-full rounded-xl bg-foreground/20" />
      <div className="h-2 w-1/2 rounded-full bg-foreground" />
      <div className="h-2 w-1/3 rounded-full bg-foreground" />
    </div>
  );
}

function RewardedCreative({ format }: { format: AdFormatContent }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-3xl bg-background/95 ring-1 ring-border">
      <div className="relative flex size-14 items-center justify-center">
        <motion.svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
          <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3" className="stroke-muted" />
          <motion.circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={100.5}
            className="stroke-primary"
            initial={{ strokeDashoffset: 100.5 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          />
        </motion.svg>
        <Icon className="size-5 text-primary-text" aria-hidden="true" />
      </div>
      <p className="text-xs font-bold text-foreground">Watch to earn reward</p>
      <span className="rounded-full bg-primary/15 px-3 py-1 text-[10px] font-semibold text-primary-text ring-1 ring-primary/25">
        +50 Coins
      </span>
    </div>
  );
}

function InterstitialCreative({ format }: { format: AdFormatContent }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-3xl bg-gradient-to-br from-secondary/20 to-primary/20 ring-1 ring-border">
      <span className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-full bg-foreground/10 text-foreground/70">
        <X className="size-3.5" aria-hidden="true" />
      </span>
      <span className={cn("flex size-12 items-center justify-center rounded-2xl ring-1", accentChipClasses[format.accent])}>
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <p className="text-sm font-bold text-foreground">{format.label} Ad</p>
      <p className="px-6 text-center text-[10px] text-muted-foreground">{format.tagline}</p>
    </div>
  );
}

function NativeCreative({ format }: { format: AdFormatContent }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-x-3 top-24 flex items-center gap-2.5 rounded-2xl bg-background p-3 shadow-lg ring-1 ring-border">
      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl ring-1", accentChipClasses[format.accent])}>
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-bold text-foreground">Sponsored · {format.label}</p>
        <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function BannerCreative({ format }: { format: AdFormatContent }) {
  const Icon = format.icon;
  return (
    <div className={cn(glass.base, glass.light, "absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl px-2.5 py-2")}>
      <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-md ring-1", accentChipClasses[format.accent])}>
        <Icon className="size-3.5" aria-hidden="true" />
      </span>
      <p className="truncate text-[9px] font-semibold text-foreground">{format.label} · 320×50</p>
    </div>
  );
}

function OpenAppCreative({ format }: { format: AdFormatContent }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background">
      <span className={cn("flex size-14 items-center justify-center rounded-3xl ring-1", accentChipClasses[format.accent])}>
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <p className="text-sm font-bold text-foreground">Welcome back</p>
      <p className="px-8 text-center text-[10px] text-muted-foreground">{format.tagline}</p>
    </div>
  );
}

function SplashCreative({ format }: { format: AdFormatContent }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-background to-muted/60">
      <motion.span
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className={cn("flex size-12 items-center justify-center rounded-2xl ring-1", accentChipClasses[format.accent])}
      >
        <Icon className="size-6" aria-hidden="true" />
      </motion.span>
      <div className="h-1 w-24 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full w-1/3 rounded-full bg-primary"
          animate={{ x: ["-100%", "220%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function OfferwallCreative({ format }: { format: AdFormatContent }) {
  const Icon = format.icon;
  const tasks = ["Install & try", "Reach level 5", "Watch a video"];
  return (
    <div className="absolute inset-3 flex flex-col gap-2 rounded-3xl bg-background p-3 ring-1 ring-border">
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 text-primary-text" aria-hidden="true" />
        <p className="text-[10px] font-bold text-foreground">Earn Rewards</p>
      </div>
      {tasks.map((task) => (
        <div key={task} className="flex items-center justify-between rounded-lg bg-foreground/[0.04] px-2 py-1.5">
          <span className="text-[9px] text-muted-foreground">{task}</span>
          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[8px] font-bold text-white">+20</span>
        </div>
      ))}
    </div>
  );
}

function PlayableCreative({ format }: { format: AdFormatContent }) {
  const Icon = format.icon;
  return (
    <div className="absolute inset-3 flex flex-col items-center justify-between rounded-3xl bg-gradient-to-br from-accent/15 to-primary/15 p-3 ring-1 ring-border">
      <p className="text-[9px] font-semibold text-muted-foreground">Try before you install</p>
      <motion.span
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className={cn("flex size-10 items-center justify-center rounded-2xl ring-1", accentChipClasses[format.accent])}
      >
        <Icon className="size-5" aria-hidden="true" />
      </motion.span>
      <span className="rounded-full bg-primary px-3 py-1.5 text-[9px] font-bold text-primary-foreground">Play Now</span>
    </div>
  );
}

const CREATIVES: Record<AdFormatId, (props: { format: AdFormatContent }) => ReactElement> = {
  rewarded: RewardedCreative,
  interstitial: InterstitialCreative,
  native: NativeCreative,
  banner: BannerCreative,
  "open-app": OpenAppCreative,
  splash: SplashCreative,
  offerwall: OfferwallCreative,
  playable: PlayableCreative,
};

interface AdScreenProps {
  format: AdFormatContent;
  className?: string;
  showChrome?: boolean;
  /** Icon-only rendering for very small phones (e.g. satellite mini-phones) — the full creatives are hand-tuned for a ~170px+ screen and overflow badly below that. */
  compact?: boolean;
}

function CompactCreative({ format }: { format: AdFormatContent }) {
  const Icon = format.icon;
  return (
    <div className={cn("flex h-full w-full items-center justify-center", accentChipClasses[format.accent])}>
      <Icon className="size-6" aria-hidden="true" />
    </div>
  );
}

/** Renders one ad format's mock creative inside a phone screen — the single source of truth for what every format "looks like" across the page. */
export function AdScreen({ format, className, showChrome = true, compact = false }: AdScreenProps) {
  const Creative = compact ? CompactCreative : CREATIVES[format.id];

  return (
    <div className={cn("relative h-full w-full bg-background", className)}>
      {showChrome && (
        <>
          <StatusBar />
          <AppChrome />
        </>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={format.id}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Creative format={format} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

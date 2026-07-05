"use client";

import type { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlayCircle, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import type { AdFormatDemo } from "@/data/home";

type Device = "laptop" | "phone";
type SlotVariant = "banner" | "video" | "overlay" | "modal" | "rail";

interface SlotStyle {
  laptop: string;
  phone: string;
  variant: SlotVariant;
}

/** Position + size within each device's content area, and which internal treatment to render — one entry per format id. */
const SLOT_STYLES: Record<string, SlotStyle> = {
  display: { laptop: "inset-x-4 top-3 h-10", phone: "inset-x-2 top-9 h-8", variant: "banner" },
  native: { laptop: "inset-x-6 top-16 h-14", phone: "inset-x-2 top-24 h-14", variant: "banner" },
  video: { laptop: "inset-x-10 top-8 h-24", phone: "inset-x-2 top-16 h-20", variant: "video" },
  sticky: { laptop: "inset-x-4 bottom-3 h-9", phone: "inset-x-2 bottom-2 h-8", variant: "banner" },
  interstitial: { laptop: "inset-3", phone: "inset-2", variant: "overlay" },
  rewarded: { laptop: "inset-x-12 top-10 h-24", phone: "inset-x-3 top-16 h-24", variant: "modal" },
  anchor: { laptop: "inset-x-4 bottom-2 h-6", phone: "inset-x-2 bottom-2 h-6", variant: "banner" },
  "in-article": { laptop: "inset-x-6 top-20 h-12", phone: "inset-x-2 top-20 h-12", variant: "banner" },
  "in-content": { laptop: "inset-x-6 bottom-14 h-14", phone: "inset-x-2 top-36 h-14", variant: "banner" },
  sidebar: { laptop: "top-3 right-3 bottom-3 w-16", phone: "inset-x-2 top-28 h-16", variant: "rail" },
  ctv: { laptop: "inset-x-12 top-10 h-24", phone: "inset-x-3 top-16 h-20", variant: "video" },
};

/** Representative subset shown together when "All Formats" is selected. */
const ALL_PREVIEW_IDS = ["display", "native", "sticky"];

function BannerVisual({ format }: { format: AdFormatDemo }) {
  const Icon = format.icon;
  return (
    <div className={cn(glass.base, glass.light, "flex h-full w-full items-center gap-2 rounded-lg px-2.5")}>
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-md ring-1",
          accentChipClasses[format.accent]
        )}
      >
        <Icon className="size-3.5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[9px] font-bold text-foreground">{format.label} Ad</p>
        <p className="text-[8px] text-muted-foreground">{format.dimensions}</p>
      </div>
    </div>
  );
}

function VideoVisual({ format }: { format: AdFormatDemo }) {
  return (
    <div
      className={cn(
        glass.base,
        glass.light,
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl"
      )}
    >
      <motion.span
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "flex size-9 items-center justify-center rounded-full ring-1",
          accentChipClasses[format.accent]
        )}
      >
        <PlayCircle className="size-5" aria-hidden="true" />
      </motion.span>
      <span className="absolute bottom-1.5 left-2 text-[8px] font-semibold text-foreground">
        {format.label} · {format.dimensions}
      </span>
    </div>
  );
}

function OverlayVisual({ format }: { format: AdFormatDemo }) {
  const Icon = format.icon;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-background/90 ring-1 ring-border backdrop-blur-sm">
      <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-foreground/10 text-muted-foreground">
        <X className="size-3" aria-hidden="true" />
      </span>
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-2xl ring-1",
          accentChipClasses[format.accent]
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="text-xs font-bold text-foreground">{format.label}</p>
      <p className="text-[9px] text-muted-foreground">{format.dimensions}</p>
    </div>
  );
}

function ModalVisual({ format }: { format: AdFormatDemo }) {
  const Icon = format.icon;
  return (
    <div
      className={cn(
        glass.base,
        glass.light,
        "flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-2xl shadow-2xl"
      )}
    >
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-xl ring-1",
          accentChipClasses[format.accent]
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <p className="text-[10px] font-bold text-foreground">{format.label}</p>
      <p className="text-[8px] text-muted-foreground">Tap to continue</p>
    </div>
  );
}

function RailVisual({ format }: { format: AdFormatDemo }) {
  const Icon = format.icon;
  return (
    <div
      className={cn(
        glass.base,
        glass.light,
        "flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl p-2"
      )}
    >
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-lg ring-1",
          accentChipClasses[format.accent]
        )}
      >
        <Icon className="size-3.5" aria-hidden="true" />
      </span>
      <p className="text-center text-[8px] font-bold text-foreground">{format.label}</p>
      <p className="text-center text-[7px] text-muted-foreground">{format.dimensions}</p>
    </div>
  );
}

const VARIANT_RENDERERS: Record<SlotVariant, (props: { format: AdFormatDemo }) => ReactElement> = {
  banner: BannerVisual,
  video: VideoVisual,
  overlay: OverlayVisual,
  modal: ModalVisual,
  rail: RailVisual,
};

interface AdSlotProps {
  formatId: string;
  formats: AdFormatDemo[];
  device: Device;
}

/** Renders the active format's (or, for "all", a representative trio of) ad visuals inside a device mockup. */
export function AdSlot({ formatId, formats, device }: AdSlotProps) {
  const activeIds = formatId === "all" ? ALL_PREVIEW_IDS : [formatId];

  return (
    <AnimatePresence>
      {activeIds.map((id) => {
        const format = formats.find((item) => item.id === id);
        const style = SLOT_STYLES[id];
        if (!format || !style) return null;
        const Visual = VARIANT_RENDERERS[style.variant];

        return (
          <motion.div
            key={`${formatId}-${id}`}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn("absolute", style[device])}
          >
            <Visual format={format} />
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}

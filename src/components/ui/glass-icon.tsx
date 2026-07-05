"use client";

import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { Accent } from "@/lib/accent";

export type GlassIconSize = "sm" | "md" | "lg" | "xl";

/** Accepts both lucide-react icons and plain custom SVG components (e.g. the site's hand-authored LinkedinIcon). */
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface GlassIcon3DProps {
  icon: IconComponent;
  accent?: Accent;
  size?: GlassIconSize;
  className?: string;
  /** Disables the idle float loop — use in dense grids where many icons animating at once would feel noisy. */
  static?: boolean;
}

const SIZE_MAP: Record<GlassIconSize, { box: string; icon: string; radius: string }> = {
  sm: { box: "size-9", icon: "size-4", radius: "rounded-xl" },
  md: { box: "size-11", icon: "size-5", radius: "rounded-2xl" },
  lg: { box: "size-14", icon: "size-6", radius: "rounded-[1.25rem]" },
  xl: { box: "size-20", icon: "size-9", radius: "rounded-3xl" },
};

/** Rich, saturated gradient fill — distinct from the flat `accentChipClasses` tint used for plain text-color chips elsewhere on the site. */
const ACCENT_GRADIENT: Record<Accent, string> = {
  primary: "from-primary via-primary/85 to-secondary",
  secondary: "from-secondary via-secondary/85 to-accent",
  accent: "from-accent via-accent/85 to-primary",
};

const ACCENT_GLOW_SHADOW: Record<Accent, string> = {
  primary: "shadow-primary/40",
  secondary: "shadow-secondary/40",
  accent: "shadow-accent/40",
};

const ACCENT_GLOW_BG: Record<Accent, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

/**
 * The site's premium "acrylic glass" icon treatment — a gradient-filled,
 * glossy 3D badge inspired by (not copied from) the Iconora-style reference
 * sheets in public/assets/icons: saturated gradient shell, diagonal glass
 * highlight, soft colored shadow, white glyph. Reserved for prominent
 * feature/section icons; small inline utility icons should stay plain
 * Lucide per the site's icon guidelines.
 */
export function GlassIcon3D({ icon: Icon, accent = "primary", size = "md", className, static: isStatic }: GlassIcon3DProps) {
  const s = SIZE_MAP[size];

  return (
    <motion.span
      animate={isStatic ? undefined : { y: [0, -3, 0] }}
      transition={isStatic ? undefined : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ y: -5, scale: 1.08, rotate: 3 }}
      className={cn("group/glassicon relative inline-flex shrink-0", s.box, className)}
    >
      {/* Ambient glow — fades in on hover */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 rounded-[inherit] opacity-0 blur-lg transition-opacity duration-300 group-hover/glassicon:opacity-70",
          ACCENT_GLOW_BG[accent]
        )}
      />

      {/* Glass shell */}
      <span
        className={cn(
          s.radius,
          "relative flex size-full items-center justify-center overflow-hidden border border-white/40 bg-gradient-to-br shadow-lg shadow-black/10 backdrop-blur-xl transition-shadow duration-300 dark:border-white/15 dark:shadow-black/40",
          ACCENT_GRADIENT[accent],
          ACCENT_GLOW_SHADOW[accent]
        )}
      >
        {/* Diagonal glass highlight streak */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/2 -left-1/2 size-[200%] -rotate-[20deg] bg-gradient-to-b from-white/55 via-white/10 to-transparent opacity-70"
        />
        {/* Bottom inner shadow for acrylic depth */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/15 to-transparent"
        />
        <Icon className={cn(s.icon, "relative text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]")} aria-hidden="true" />
      </span>
    </motion.span>
  );
}

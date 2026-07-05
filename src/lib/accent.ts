export type Accent = "primary" | "secondary" | "accent";

/**
 * Icon-chip treatment shared across dashboard widgets, stat tiles, and section
 * cards. Text color uses the `-text` variants (see globals.css) — the plain
 * `primary`/`secondary`/`accent` tokens are tuned for glows/washes and fail
 * WCAG contrast as readable text in at least one theme (accent cyan is only
 * ~1.7:1 against the light background; primary purple is only ~2.8:1 against
 * the dark background).
 */
export const accentChipClasses: Record<Accent, string> = {
  primary: "bg-primary/10 text-primary-text ring-primary/20",
  secondary: "bg-secondary/10 text-secondary-text ring-secondary/20",
  accent: "bg-accent/10 text-accent-text ring-accent/20",
};

export const accentTextClasses: Record<Accent, string> = {
  primary: "text-primary-text",
  secondary: "text-secondary-text",
  accent: "text-accent-text",
};

export const accentBorderClasses: Record<Accent, string> = {
  primary: "border-primary/30",
  secondary: "border-secondary/30",
  accent: "border-accent/30",
};

export const accentGlowClasses: Record<Accent, string> = {
  primary: "bg-primary/25",
  secondary: "bg-secondary/25",
  accent: "bg-accent/25",
};

/** Hover treatment for interactive cards/widgets — soft glow shadow + border highlight, no layout shift. */
export const accentHoverClasses: Record<Accent, string> = {
  primary: "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/15",
  secondary: "hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/15",
  accent: "hover:border-accent/40 hover:shadow-xl hover:shadow-accent/15",
};

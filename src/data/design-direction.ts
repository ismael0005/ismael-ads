/**
 * Design-direction notes distilled from `references/*` moodboards and the
 * design tokens already codified in `src/styles/*` and `src/app/globals.css`.
 *
 * This file is documentation-as-data: plain notes to guide future section
 * building, not props consumed by a component. `references/colors` and
 * `references/dashboard` are currently empty — those sections below are
 * derived from the existing token system instead of a moodboard.
 */

export const colorDirection = {
  source: "src/styles/colors.ts + src/app/globals.css (references/colors is empty)",
  palette: {
    primary: "#6D28D9",
    secondary: "#2563EB",
    accent: "#22D3EE",
    backgroundDark: "#070B1A",
    backgroundLight: "#F8FAFC",
  },
  notes: [
    "Dark navy-to-black hero/section backgrounds (~#070B1A) with purple → blue → cyan radial glows are the default treatment, matching references/hero almost exactly — do not flatten to solid color.",
    "Light theme (#F8FAFC background) is a valid inverted variant, not just a fallback — one hero reference used a white background with soft purple blobs to the same effect.",
    "Reserve the existing --shadow-glow-primary / --shadow-glow-secondary / --shadow-glow-accent tokens for card and blob glows instead of generic box-shadow.",
  ],
} as const;

export const motionDirection = {
  source: "src/styles/animations.ts",
  durations: { fast: 0.2, base: 0.4, slow: 0.8 },
  easing: { out: [0.16, 1, 0.3, 1], inOut: [0.65, 0, 0.35, 1] },
  notes: [
    "Entrance pattern: fadeInUp + staggerContainer (0.12s stagger) for stacked hero copy — already used in hero.tsx, reuse for every new section.",
    "Subtle floating loops (y: [0, -8/-14, 0], 5-6s, easeInOut, Infinity) are the established idle-motion signature for glass cards and character images — see hero-widget.tsx, hero-stage.tsx, and metric-card.tsx.",
    "Background glow blobs pulse opacity slowly (8-10s loops) rather than moving position — keep motion ambient, not attention-grabbing.",
  ],
} as const;

export const videoDirection = {
  source: "references/videos (7 files, catalogued by filename only — binary content not inspected)",
  notes: [
    "Files split into two groups by naming convention: 'Recording <timestamp>.mp4' (4 files) are Windows screen captures — likely dashboard/UI walkthrough footage, best suited as a product-demo loop.",
    "Numeric/hash-named files (22.mp4, 32 435.mp4, 20260703-1051-58.6855739.mp4) are likely stock or AI-generated clips — better suited as ambient hero background loops than product demos.",
    "None of these have been moved into public/assets/videos yet — treat references/videos as raw candidates only, not production-ready sources. Trim/re-encode before publishing.",
    "No files currently placed in public/assets/videos — video usage on the live site is not yet decided or implemented.",
  ],
} as const;

export const dashboardDirection = {
  source: "src/components/dashboard/* + src/components/sections/hero-stage.tsx + hero-widget.tsx (references/dashboard is empty)",
  notes: [
    "Established pattern: floating glass widgets (glass.base + glass.light) — metric, chart (mini sparkline), and status-badge variants — arranged as an ecosystem around the founder rather than a single panel. See hero-stage.tsx / hero-widget.tsx.",
    "Widgets use a small rounded-square icon chip with a tinted background/ring (accent color at ~15% opacity) rather than a bare icon — keep this for any new stat tile.",
    "Depth is expressed via z-index + parallax strength + shadow tint (not blur on the card itself — blurring readable text/numbers hurts legibility), driven by a per-widget `depth` value in data/home.ts.",
    "One incidental typography reference (references/typography) also showed a dashboard: dark sidebar, rounded-xl stat tiles, purple-monochrome charts — directionally consistent with the existing component set, no changes needed.",
  ],
} as const;

export const cardDirection = {
  source: "references/cards (19 files, 10 sampled)",
  notes: [
    "Glassmorphic is the dominant and correct treatment — frosted translucent panels with a soft glow rather than a hard drop-shadow. Keep using glass-card.tsx as the base.",
    "Lean into large corner radii (rounded-2xl/rounded-3xl) over tighter default rounding — references consistently show rounder cards than a flat 8px radius.",
    "Icon treatment: small rounded-square chip with a tinted color-wash background (matches existing metric-card.tsx pattern) — not bare line icons.",
    "Bento/asymmetric grid layouts read well for solutions/metrics groupings; uniform 3-up grids were less common in the references.",
    "A handful of references (flat mobile app mock, photography portfolio, solid-color social cards) are off-brand outliers — ignore as noise, not signal.",
  ],
} as const;

export const typographyDirection = {
  source: "references/typography (1 file) + src/styles/typography.ts",
  notes: [
    "Heavy geometric/grotesk sans-serif throughout — no serif or script anywhere in the reference set, consistent with the existing font-sans/font-heading tokens.",
    "Strong size hierarchy: headline sits 4-5x larger than body copy, bold/extrabold weight, tight line-height — matches the existing fontSize scale (4xl-7xl headlines vs. base/lg body).",
    "Two-tone headline convention: base text in the foreground color, one key phrase recolored via gradient/accent (GradientText component already implements this) — pair with a small uppercase 'eyebrow' label above the headline (Badge component already implements this).",
  ],
} as const;

export const heroDirection = {
  source: "references/hero (35 files, 12 sampled) — superseded by an explicit cinematic-redesign brief, kept here for the underlying rationale",
  notes: [
    "Superseded: the split copy-left/image-right template from the original reference sweep was deliberately abandoned in favor of a centered, layered composition — headline/CTA centered up top, founder + floating widget ecosystem as a single 'stage' beneath it. See hero.tsx / hero-stage.tsx.",
    "Depth over columns: the founder sits behind the highest-depth widgets and in front of the lowest-depth ones (z-index derived from each widget's `depth`), with widgets connected to him via faint animated SVG lines — this reads as an ecosystem, not a two-column template.",
    "A 3-4 item stat row is still the right fallback below `md` where the floating layout doesn't have room — see the compact mobile row in hero-stage.tsx.",
    "Crossed-arms / confident-stance poses (confident-arms.png, front-view.png, 34-view.png) remain valid hero-grade alternates; the live hero currently uses welcome-pose.png (open, welcoming gesture) per explicit direction.",
  ],
} as const;

export const characterUsageRules = {
  source: "public/assets/characters (13 poses) + prior asset inspection",
  rules: [
    "Never use stock people or placeholder humans anywhere on the site — only the founder character poses in src/data/assets.ts.",
    "Hero section: welcome-pose.png per explicit direction (open, welcoming gesture); confident-arms.png/34-view.png remain valid alternates if the pose is swapped later — the hero stage reads the pose from data/home.ts, so swapping requires zero code changes.",
    "Section imagery should match the emotional beat of the copy: thinking.png for problem/consideration copy, thumbs-up.png or celebrating-growth.png for results/proof copy, pointing-left.png/pointing-right.png for directional callouts toward adjacent content, holding-tablet.png for product/format demonstrations, waving.png for greetings (contact, empty states), casual-standing.png for approachable bio/about contexts, cta-pose.png reserved for the final call-to-action section.",
    "Keep the same character across every placement — no alternate models, illustration styles, or stock photography mixed in.",
    "All character images render via next/image; only the hero instance is eager-loaded (preload — Next 16 deprecated the `priority` prop in favor of `preload`), every other placement lazy-loads by default.",
    "Apply the established subtle-floating motion loop (see motionDirection) to character images in hero/feature contexts, not to small inline/byline uses (e.g. blog author avatar).",
  ],
} as const;

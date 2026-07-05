import type { LucideIcon } from "lucide-react";
import {
  AlignVerticalJustifyEnd,
  Antenna,
  Baby,
  BrainCircuit,
  ClipboardCheck,
  Cpu,
  Eye,
  FileText,
  Flame,
  Gauge,
  Gavel,
  Gift,
  Globe,
  Layers,
  Layers3,
  LayoutGrid,
  LayoutTemplate,
  LifeBuoy,
  LineChart,
  Maximize2,
  MonitorPlay,
  Newspaper,
  PanelRight,
  Pin,
  PlayCircle,
  Plane,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Utensils,
  Workflow,
  Zap,
} from "lucide-react";

import type { Accent } from "@/lib/accent";
import type { CharacterPoseId } from "@/data/assets";

export interface HeroContent {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  /** Substring of `headline` to render with the gradient/accent treatment. */
  headlineEmphasis: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  characterPose: CharacterPoseId;
}

export const hero: HeroContent = {
  kicker: "AI-Powered Revenue Optimization",
  kickerIcon: Sparkles,
  headline: "Turn Every Impression Into Maximum Revenue",
  headlineEmphasis: "Maximum Revenue",
  subheadline:
    "Ismael Ads helps publishers grow through premium demand, smart monetization, Header Bidding, and AI-powered revenue optimization.",
  primaryCta: { label: "Check Eligibility", href: "/eligibility-checker" },
  secondaryCta: { label: "Explore Solutions", href: "/solutions" },
  characterPose: "welcomePose",
};

export type HeroWidgetAccent = Accent;

interface HeroWidgetBase {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: HeroWidgetAccent;
  /** Position of the widget's center, as a percentage of the stage box. */
  x: number;
  y: number;
  /** 0 (background, subtle) to 1 (foreground, prominent) — drives parallax strength, shadow, and z-index. */
  depth: number;
  /** Entrance stagger delay in seconds. */
  delay: number;
  /** Also show a simplified version of this widget in the mobile stat row. */
  compact?: boolean;
}

export interface HeroMetricWidget extends HeroWidgetBase {
  kind: "metric";
  numericValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export interface HeroChartWidget extends HeroWidgetBase {
  kind: "chart";
  value: string;
  trend: number[];
}

export interface HeroBadgeWidget extends HeroWidgetBase {
  kind: "badge";
  status: string;
}

export type HeroWidget = HeroMetricWidget | HeroChartWidget | HeroBadgeWidget;

/**
 * The floating widget ecosystem arranged around the founder in the hero stage.
 * Deliberately asymmetric — no mirrored left/right pairs — so it reads as a
 * natural layered scene rather than a template grid. `depth` below 0.5 renders
 * behind the founder (tucked under his silhouette), above 0.5 renders in front
 * (floating over it) — see hero-stage.tsx for the z-index/scale derivation and
 * design-direction.ts heroDirection for the composition rationale.
 */
export const heroWidgets: HeroWidget[] = [
  {
    id: "revenue",
    kind: "chart",
    label: "Revenue Growth",
    value: "+285%",
    trend: [22, 34, 28, 46, 40, 58, 72, 66, 88, 100],
    icon: TrendingUp,
    accent: "primary",
    x: 14,
    y: 15,
    depth: 0.35,
    delay: 0.5,
    compact: true,
  },
  {
    id: "ai-optimization",
    kind: "badge",
    label: "AI Optimization",
    status: "Active",
    icon: BrainCircuit,
    accent: "accent",
    x: 87,
    y: 10,
    depth: 0.85,
    delay: 0.65,
  },
  {
    id: "fill-rate",
    kind: "metric",
    label: "Fill Rate",
    numericValue: 98,
    suffix: "%",
    icon: Target,
    accent: "secondary",
    x: 3,
    y: 45,
    depth: 0.42,
    delay: 0.8,
    compact: true,
  },
  {
    id: "rpm",
    kind: "metric",
    label: "Avg. RPM",
    numericValue: 24.8,
    decimals: 2,
    prefix: "$",
    icon: Gauge,
    accent: "primary",
    x: 97,
    y: 49,
    depth: 0.75,
    delay: 0.95,
    compact: true,
  },
  {
    id: "publishers",
    kind: "metric",
    label: "Active Publishers",
    numericValue: 500,
    suffix: "+",
    icon: Users,
    accent: "accent",
    x: 15,
    y: 90,
    depth: 0.25,
    delay: 1.1,
    compact: true,
  },
  {
    id: "ad-requests",
    kind: "metric",
    label: "Monthly Ad Requests",
    numericValue: 3,
    suffix: "B+",
    icon: Zap,
    accent: "secondary",
    x: 85,
    y: 92,
    depth: 0.6,
    delay: 1.25,
  },
  {
    id: "header-bidding",
    kind: "badge",
    label: "Header Bidding",
    status: "Enabled",
    icon: Layers,
    accent: "primary",
    x: 46,
    y: 4,
    depth: 0.55,
    delay: 1.4,
  },
  {
    id: "google-adx",
    kind: "badge",
    label: "Google AdX",
    status: "Connected",
    icon: Globe,
    accent: "accent",
    x: 58,
    y: 97,
    depth: 0.65,
    delay: 1.5,
  },
];

export interface Metric {
  icon: LucideIcon;
  label: string;
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent: Accent;
}

/**
 * Canonical revenue/performance metrics — the hero's compact trust row and the
 * "Trusted By / Stats Bar" section both read from this single source of truth.
 * `value` is the pre-formatted display string; `numericValue`/`prefix`/`suffix`
 * feed AnimatedCounter wherever the number should count up instead of appear.
 */
export const metrics: Metric[] = [
  {
    icon: TrendingUp,
    label: "Revenue Growth",
    value: "+285%",
    numericValue: 285,
    prefix: "+",
    suffix: "%",
    accent: "primary",
  },
  {
    icon: Target,
    label: "Fill Rate",
    value: "98%",
    numericValue: 98,
    suffix: "%",
    accent: "secondary",
  },
  {
    icon: Eye,
    label: "Monthly Impressions",
    value: "3B+",
    numericValue: 3,
    suffix: "B+",
    accent: "accent",
  },
  {
    icon: Users,
    label: "Active Publishers",
    value: "500+",
    numericValue: 500,
    suffix: "+",
    accent: "primary",
  },
];

export interface SectionIntro {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  subheadline: string;
}

export const solutionsIntro: SectionIntro = {
  kicker: "Solutions",
  kickerIcon: Layers3,
  headline: "One Partner for Every Screen",
  headlineEmphasis: "Every Screen",
  subheadline:
    "Whichever surface your audience lives on, Ismael Ads has a monetization engine built for it.",
};

export interface GrowthStep {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}

export const growthJourneyIntro: SectionIntro = {
  kicker: "How It Works",
  kickerIcon: Workflow,
  headline: "How We Grow Publisher Revenue",
  headlineEmphasis: "Publisher Revenue",
  subheadline:
    "Follow a single impression from your page to your payout — every step optimized in real time.",
};

/**
 * The impression-to-payout journey rendered as a horizontal, scroll-revealed
 * timeline in growth-journey.tsx — see that component for the bespoke
 * mini-illustration each step gets (browser/phone/TV chips, bidding flow,
 * AI core, winning-bid burst, live dashboard).
 */
export const growthSteps: GrowthStep[] = [
  {
    id: "inventory",
    label: "Website, App & CTV",
    description: "Your inventory across every screen.",
    icon: Antenna,
    accent: "primary",
  },
  {
    id: "ad-request",
    label: "Ad Request",
    description: "A visitor loads a page — the request fires instantly.",
    icon: Send,
    accent: "secondary",
  },
  {
    id: "header-bidding",
    label: "Header Bidding",
    description: "Every demand source bids at once — no waterfall.",
    icon: Gavel,
    accent: "accent",
  },
  {
    id: "demand",
    label: "Demand Partners Compete",
    description: "Premium buyers compete in real time for your slot.",
    icon: Flame,
    accent: "primary",
  },
  {
    id: "ai",
    label: "AI Optimization Engine",
    description: "AI reprices and routes toward the strongest bid.",
    icon: Cpu,
    accent: "accent",
  },
  {
    id: "winner",
    label: "Highest CPM Wins",
    description: "The top bid is served — automatically, every time.",
    icon: Trophy,
    accent: "secondary",
  },
  {
    id: "dashboard",
    label: "Revenue Dashboard",
    description: "Your payout updates live, down to the impression.",
    icon: LineChart,
    accent: "primary",
  },
];

export interface AdFormatDemo {
  id: string;
  label: string;
  dimensions: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
  examples: string[];
}

export const adFormatsIntro: SectionIntro = {
  kicker: "Ad Formats",
  kickerIcon: LayoutTemplate,
  headline: "Every Format, Fully Optimized",
  headlineEmphasis: "Fully Optimized",
  subheadline:
    "One live demo, eleven formats — see exactly how each placement performs on web and mobile.",
};

/**
 * Drives the interactive laptop/phone demo in ad-formats-preview.tsx. Each
 * format gets a bespoke visual keyed by `id` in ad-slot.tsx — there's no
 * generic "placement" field because every format's layout is hand-built.
 */
export const adFormatDemos: AdFormatDemo[] = [
  {
    id: "display",
    label: "Display",
    dimensions: "728×90",
    description: "High-impact leaderboard banners tuned for viewability and RPM.",
    icon: LayoutTemplate,
    accent: "primary",
    examples: ["Homepage header", "Article top"],
  },
  {
    id: "native",
    label: "Native",
    dimensions: "Fluid",
    description: "Blends into your content for a seamless reading experience.",
    icon: Newspaper,
    accent: "secondary",
    examples: ["Content feed", "Related articles"],
  },
  {
    id: "video",
    label: "Video",
    dimensions: "16:9",
    description: "Instream and outstream video demand at premium rates.",
    icon: PlayCircle,
    accent: "accent",
    examples: ["Article video player", "Feed autoplay"],
  },
  {
    id: "sticky",
    label: "Sticky",
    dimensions: "320×50",
    description: "A persistent placement that stays in view without hurting UX.",
    icon: Pin,
    accent: "primary",
    examples: ["Mobile reading bar", "Footer banner"],
  },
  {
    id: "interstitial",
    label: "Interstitial",
    dimensions: "Full Screen",
    description: "A high-impact full-screen moment between content transitions.",
    icon: Maximize2,
    accent: "secondary",
    examples: ["Page transition", "App launch"],
  },
  {
    id: "rewarded",
    label: "Rewarded",
    dimensions: "Full Screen",
    description: "An opt-in placement users choose to engage with for a reward.",
    icon: Gift,
    accent: "accent",
    examples: ["Unlock content", "In-app currency"],
  },
  {
    id: "anchor",
    label: "Anchor",
    dimensions: "320×50",
    description: "A slim bar anchored to the screen edge, always in view.",
    icon: AlignVerticalJustifyEnd,
    accent: "primary",
    examples: ["Mobile web footer", "App bottom bar"],
  },
  {
    id: "in-article",
    label: "In-Article",
    dimensions: "Fluid",
    description: "Placed naturally between paragraphs as readers scroll.",
    icon: FileText,
    accent: "secondary",
    examples: ["Mid-article", "Long-form content"],
  },
  {
    id: "in-content",
    label: "In-Content",
    dimensions: "Fluid",
    description: "Woven directly into content modules and card grids.",
    icon: LayoutGrid,
    accent: "accent",
    examples: ["Content grids", "Listicles"],
  },
  {
    id: "sidebar",
    label: "Sidebar",
    dimensions: "300×600",
    description: "A high-viewability rail that scrolls alongside your content.",
    icon: PanelRight,
    accent: "primary",
    examples: ["Blog sidebar", "Desktop rail"],
  },
  {
    id: "ctv",
    label: "CTV",
    dimensions: "1920×1080",
    description: "Premium video demand across connected TV audiences.",
    icon: MonitorPlay,
    accent: "secondary",
    examples: ["Living room screens", "OTT apps"],
  },
];

export const successStoriesIntro: SectionIntro = {
  kicker: "Success Stories",
  kickerIcon: Star,
  headline: "Publisher Success Stories",
  headlineEmphasis: "Success Stories",
  subheadline:
    "500+ publishers, one growing wall of results — real revenue transformations from across the Ismael Ads network.",
};

export type ResultCardKind = "quote" | "metric" | "result" | "growth" | "location";

interface ResultCardBase {
  id: string;
  kind: ResultCardKind;
  accent: Accent;
}

export interface QuoteResultCard extends ResultCardBase {
  kind: "quote";
  quote: string;
  publisher: string;
  role: string;
}

export interface MetricResultCard extends ResultCardBase {
  kind: "metric";
  icon: LucideIcon;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface PublisherResultCard extends ResultCardBase {
  kind: "result";
  publisher: string;
  initials: string;
  country: string;
  niche: string;
  quote: string;
  growthPercent: number;
  beforeRevenue: string;
  afterRevenue: string;
  fillRate: number;
}

export interface GrowthResultCard extends ResultCardBase {
  kind: "growth";
  publisher: string;
  growthPercent: number;
  trend: number[];
}

export interface LocationResultCard extends ResultCardBase {
  kind: "location";
  publisher: string;
  country: string;
  niche: string;
  icon: LucideIcon;
}

export type ResultsWallCard =
  | QuoteResultCard
  | MetricResultCard
  | PublisherResultCard
  | GrowthResultCard
  | LocationResultCard;

/**
 * Feeds the three-row infinite marquee in results-wall.tsx. `row` groups
 * cards visually (each row is duplicated and CSS-animated independently —
 * see results-wall.tsx for the marquee mechanics and pause-on-hover).
 */
export const resultsWallCards: (ResultsWallCard & { row: 1 | 2 | 3 })[] = [
  {
    id: "northbound",
    row: 1,
    kind: "result",
    publisher: "Northbound Media",
    initials: "NM",
    country: "United States",
    niche: "News & Media",
    quote: "Ismael Ads rebuilt our header bidding stack in a week — revenue hasn't plateaued since.",
    accent: "primary",
    beforeRevenue: "$14,200",
    afterRevenue: "$54,700",
    growthPercent: 285,
    fillRate: 98,
  },
  {
    id: "dailyfeed",
    row: 1,
    kind: "quote",
    quote: "Fill rate was our bottleneck for two years. Solved in a single onboarding call.",
    publisher: "Dailyfeed Network",
    role: "Founder",
    accent: "secondary",
  },
  {
    id: "horizon-gaming",
    row: 1,
    kind: "metric",
    icon: Gauge,
    label: "Avg. RPM",
    numericValue: 18.4,
    prefix: "$",
    decimals: 2,
    accent: "accent",
  },
  {
    id: "wanderlust",
    row: 1,
    kind: "location",
    publisher: "Wanderlust Journal",
    country: "Spain",
    niche: "Travel",
    icon: Plane,
    accent: "primary",
  },
  {
    id: "cookwell",
    row: 1,
    kind: "result",
    publisher: "CookWell Media",
    initials: "CM",
    country: "United States",
    niche: "Food & Recipes",
    quote: "Header Bidding alone lifted our RPM more than three prior demand partners combined.",
    accent: "secondary",
    beforeRevenue: "$9,300",
    afterRevenue: "$24,600",
    growthPercent: 164,
    fillRate: 96,
  },
  {
    id: "streamhouse",
    row: 2,
    kind: "growth",
    publisher: "StreamHouse",
    growthPercent: 211,
    trend: [10, 18, 24, 30, 42, 50, 63, 74, 86, 100],
    accent: "accent",
  },
  {
    id: "techpulse",
    row: 2,
    kind: "quote",
    quote: "Our CTV inventory finally gets treated as premium, not an afterthought.",
    publisher: "TechPulse Daily",
    role: "Editor-in-Chief",
    accent: "primary",
  },
  {
    id: "fittrack",
    row: 2,
    kind: "metric",
    icon: Target,
    label: "Fill Rate",
    numericValue: 97,
    suffix: "%",
    accent: "secondary",
  },
  {
    id: "nova-sports",
    row: 2,
    kind: "result",
    publisher: "Nova Sports Network",
    initials: "NS",
    country: "France",
    niche: "Sports",
    quote: "Matchday traffic spikes used to go unfilled — now every impression is auctioned instantly.",
    accent: "accent",
    beforeRevenue: "$21,000",
    afterRevenue: "$62,600",
    growthPercent: 198,
    fillRate: 95,
  },
  {
    id: "urban-eats",
    row: 2,
    kind: "location",
    publisher: "Urban Eats Guide",
    country: "Italy",
    niche: "Food & Dining",
    icon: Utensils,
    accent: "secondary",
  },
  {
    id: "local-wire",
    row: 3,
    kind: "quote",
    quote: "Onboarding took a day. Revenue reporting finally makes sense.",
    publisher: "The Local Wire",
    role: "Publisher",
    accent: "primary",
  },
  {
    id: "bright-kids",
    row: 3,
    kind: "growth",
    publisher: "Bright Kids Media",
    growthPercent: 176,
    trend: [30, 34, 40, 38, 52, 60, 68, 74, 82, 90],
    accent: "secondary",
  },
  {
    id: "momentum-finance",
    row: 3,
    kind: "metric",
    icon: Zap,
    label: "Monthly Requests",
    numericValue: 2.4,
    suffix: "M",
    decimals: 1,
    accent: "accent",
  },
  {
    id: "greenliving",
    row: 3,
    kind: "result",
    publisher: "GreenLiving Weekly",
    initials: "GW",
    country: "Sweden",
    niche: "Sustainability",
    quote: "Small publisher, premium demand — Ismael Ads didn't make us feel like an afterthought.",
    accent: "primary",
    beforeRevenue: "$6,800",
    afterRevenue: "$16,500",
    growthPercent: 143,
    fillRate: 94,
  },
  {
    id: "bright-kids-location",
    row: 3,
    kind: "location",
    publisher: "Bright Kids Media",
    country: "South Korea",
    niche: "Family & Kids",
    icon: Baby,
    accent: "accent",
  },
];

export interface SuccessStat {
  icon: LucideIcon;
  label: string;
  accent: Accent;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  staticValue?: string;
}

export const successStats: SuccessStat[] = [
  { icon: Users, label: "Publishers", numericValue: 500, suffix: "+", accent: "primary" },
  { icon: Eye, label: "Monthly Ad Requests", numericValue: 3, suffix: "B+", accent: "secondary" },
  { icon: Target, label: "Fill Rate", numericValue: 98, suffix: "%", accent: "accent" },
  { icon: TrendingUp, label: "Revenue Growth", numericValue: 285, prefix: "+", suffix: "%", accent: "primary" },
  { icon: LifeBuoy, label: "Publisher Support", staticValue: "24/7", accent: "secondary" },
];

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Check Eligibility",
    description: "Tell us about your traffic and inventory in a two-minute form.",
    icon: Search,
  },
  {
    step: 2,
    title: "Get Approved",
    description: "Our team reviews your site or app and confirms fit within 48 hours.",
    icon: ClipboardCheck,
  },
  {
    step: 3,
    title: "Integrate",
    description: "Add a single tag or SDK — our team handles the technical setup.",
    icon: Rocket,
  },
  {
    step: 4,
    title: "Grow Revenue",
    description: "Track performance in real time as premium demand fills your inventory.",
    icon: LineChart,
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqPreview: FaqItem[] = [
  {
    question: "What kind of publishers does Ismael Ads work with?",
    answer:
      "Websites, mobile apps, and CTV channels with consistent traffic looking to grow ad revenue without sacrificing user experience.",
  },
  {
    question: "How fast can I get started?",
    answer:
      "Most publishers pass eligibility review and go live within a week of applying.",
  },
  {
    question: "Do I need to change my current ad setup?",
    answer:
      "No — Ismael Ads layers on top of or replaces underperforming demand sources with minimal integration work.",
  },
  {
    question: "Is there a minimum traffic requirement?",
    answer:
      "Requirements vary by surface (web, app, CTV) — the eligibility checker gives you an instant read on your fit.",
  },
];

export interface FinalCta {
  headline: string;
  headlineEmphasis: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  characterPose: CharacterPoseId;
  trustIcon: LucideIcon;
  trustLabel: string;
}

export const finalCta: FinalCta = {
  headline: "Ready to Turn Impressions Into Revenue?",
  headlineEmphasis: "Into Revenue?",
  subheadline:
    "Join 500+ publishers already growing with Ismael Ads. Check your eligibility in under two minutes.",
  primaryCta: { label: "Check Eligibility", href: "/eligibility-checker" },
  secondaryCta: { label: "Contact Ismael", href: "/about/contact" },
  characterPose: "ctaPose",
  trustIcon: ShieldCheck,
  trustLabel: "No commitment required to check eligibility",
};

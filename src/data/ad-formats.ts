import type { LucideIcon } from "lucide-react";
import {
  AlignVerticalJustifyEnd,
  AppWindow,
  Aperture,
  BrainCircuit,
  Building2,
  Cpu,
  Eye,
  FileText,
  Gauge,
  Gift,
  Globe2,
  Layers,
  LayoutGrid,
  LayoutTemplate,
  MonitorCheck,
  MousePointerClick,
  Newspaper,
  PlayCircle,
  Rocket,
  ShieldCheck,
  Smartphone,
  SlidersHorizontal,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Tv,
  Tv2,
  Users,
  Zap,
} from "lucide-react";

import type { Accent } from "@/lib/accent";
import type { CharacterPoseId } from "@/data/assets";
import type { SectionIntro } from "@/data/home";

export interface AdFormatsHeroContent {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const adFormatsHero: AdFormatsHeroContent = {
  kicker: "Ad Formats",
  kickerIcon: LayoutTemplate,
  headline: "Premium Ad Formats For Every Screen",
  headlineEmphasis: "Every Screen",
  description:
    "Explore every advertising format supported by Ismael Ads — optimized for higher viewability, better user experience, stronger engagement, and maximum publisher revenue.",
  primaryCta: { label: "Explore Formats", href: "#showroom" },
  secondaryCta: { label: "Talk To Ismael", href: "/about/contact" },
};

export const adFormatsTrustBadges: string[] = [
  "Google Ad Manager",
  "Prebid",
  "OpenX",
  "PubMatic",
  "Magnite",
  "APS",
];

export type DeviceType = "desktop" | "mobile" | "ctv";

export type AdFormatId =
  | "display"
  | "native"
  | "sticky"
  | "anchor"
  | "interstitial"
  | "rewarded"
  | "video"
  | "in-article"
  | "in-feed"
  | "ctv";

export interface AdFormatDefinition {
  id: AdFormatId;
  label: string;
  icon: LucideIcon;
  accent: Accent;
  tagline: string;
  description: string;
  benefits: string[];
  devices: DeviceType[];
  trend: number[];
}

/** The single source of truth for every ad format on this page — the hero, showroom, and orbit sections all read from this one catalog. */
export const adFormatCatalog: AdFormatDefinition[] = [
  {
    id: "display",
    label: "Display",
    icon: LayoutTemplate,
    accent: "primary",
    tagline: "High-impact leaderboards and sidebars",
    description: "Classic banner placements tuned for viewability and RPM, sized responsively for every layout.",
    benefits: ["High viewability", "Responsive sizing", "Broad demand pool"],
    devices: ["desktop", "mobile"],
    trend: [20, 28, 26, 34, 40, 48, 56, 64, 74, 86],
  },
  {
    id: "native",
    label: "Native",
    icon: Newspaper,
    accent: "secondary",
    tagline: "Blends into your content",
    description: "Ads styled to match your site or feed, so they read as content instead of an interruption.",
    benefits: ["Higher CTR", "Lower bounce rate", "Feels editorial"],
    devices: ["desktop", "mobile"],
    trend: [24, 30, 28, 38, 44, 52, 60, 70, 80, 92],
  },
  {
    id: "sticky",
    label: "Sticky",
    icon: AlignVerticalJustifyEnd,
    accent: "accent",
    tagline: "Always in view, never in the way",
    description: "A persistent placement that stays on screen as visitors scroll, without hurting page experience.",
    benefits: ["Constant viewability", "Low CLS impact", "Strong RPM"],
    devices: ["desktop", "mobile"],
    trend: [22, 26, 32, 30, 42, 50, 58, 66, 76, 88],
  },
  {
    id: "anchor",
    label: "Anchor",
    icon: AlignVerticalJustifyEnd,
    accent: "primary",
    tagline: "A slim bar anchored to the edge",
    description: "A lightweight mobile-first placement anchored to the bottom of the screen, always visible.",
    benefits: ["Mobile optimized", "Minimal footprint", "Always visible"],
    devices: ["mobile"],
    trend: [18, 24, 22, 32, 38, 46, 54, 62, 72, 84],
  },
  {
    id: "interstitial",
    label: "Interstitial",
    icon: AppWindow,
    accent: "secondary",
    tagline: "A full-screen moment between transitions",
    description: "A high-impact full-screen placement shown at natural transition points, never mid-task.",
    benefits: ["Premium CPMs", "High attention", "Natural placement"],
    devices: ["mobile", "ctv"],
    trend: [26, 32, 30, 40, 46, 54, 64, 74, 84, 96],
  },
  {
    id: "rewarded",
    label: "Rewarded",
    icon: Gift,
    accent: "accent",
    tagline: "Opt-in value exchange",
    description: "Viewers choose to watch in exchange for an in-app reward — the highest-consent format available.",
    benefits: ["100% opt-in", "Highest eCPM", "Best completion rate"],
    devices: ["mobile", "ctv"],
    trend: [30, 36, 34, 44, 52, 60, 70, 80, 90, 100],
  },
  {
    id: "video",
    label: "Video",
    icon: PlayCircle,
    accent: "primary",
    tagline: "Instream and outstream demand",
    description: "Premium video placements that command the strongest CPMs across web, app, and CTV inventory.",
    benefits: ["Premium demand", "Strong completion", "Cross-device"],
    devices: ["desktop", "mobile", "ctv"],
    trend: [28, 34, 32, 42, 50, 58, 68, 78, 88, 98],
  },
  {
    id: "in-article",
    label: "In-Article",
    icon: FileText,
    accent: "secondary",
    tagline: "Placed naturally between paragraphs",
    description: "Ads woven directly into long-form content as readers scroll, without breaking the reading flow.",
    benefits: ["Reader-friendly", "High viewability", "Scales with content"],
    devices: ["desktop", "mobile"],
    trend: [20, 26, 24, 34, 40, 48, 58, 66, 76, 88],
  },
  {
    id: "in-feed",
    label: "In-Feed",
    icon: LayoutGrid,
    accent: "accent",
    tagline: "Woven into content grids",
    description: "Placements that sit inside card grids and listicles, matching your site's own layout rhythm.",
    benefits: ["Grid-native", "High engagement", "Flexible sizing"],
    devices: ["desktop", "mobile"],
    trend: [22, 28, 26, 36, 42, 50, 60, 68, 78, 90],
  },
  {
    id: "ctv",
    label: "CTV Video",
    icon: Tv2,
    accent: "primary",
    tagline: "Broadcast-quality living room demand",
    description: "Premium pre-roll and mid-roll placements delivered to Smart TVs and connected devices.",
    benefits: ["Broadcast quality", "High completion", "Premium CPMs"],
    devices: ["ctv"],
    trend: [32, 38, 36, 46, 54, 62, 72, 82, 92, 100],
  },
];

export type HeroWidgetKind = "metric" | "badge";

interface HeroWidgetBase {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: Accent;
  x: number;
  y: number;
  depth: number;
  delay: number;
  compact?: boolean;
}

export interface HeroMetricWidgetDef extends HeroWidgetBase {
  kind: "metric";
  numericValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export interface HeroBadgeWidgetDef extends HeroWidgetBase {
  kind: "badge";
  status: string;
}

export type AdFormatsHeroWidget = HeroMetricWidgetDef | HeroBadgeWidgetDef;

/** Scattered around the device ecosystem — fixed positions, never a sweeping orbit, so they never collide with the devices they float beside. */
/**
 * Positions are split into a clear top band (y <= 8%) and bottom band (y >= 86%)
 * that the hero's device cluster never occupies (devices are confined to the
 * vertical middle of the stage) — see hero-stage.tsx for the verified device
 * bounding boxes this was designed around.
 */
export const adFormatsHeroWidgets: AdFormatsHeroWidget[] = [
  { id: "ctr", kind: "metric", label: "CTR", numericValue: 2.8, decimals: 1, suffix: "%", icon: MousePointerClick, accent: "secondary", x: 6, y: 6, depth: 0.5, delay: 0.35, compact: true },
  { id: "ai-optimized", kind: "badge", label: "AI Optimized", status: "Active", icon: BrainCircuit, accent: "accent", x: 50, y: 3, depth: 0.85, delay: 0.5 },
  { id: "viewability", kind: "metric", label: "Viewability", numericValue: 94, suffix: "%", icon: Eye, accent: "primary", x: 90, y: 8, depth: 0.7, delay: 0.65, compact: true },
  { id: "revenue", kind: "metric", label: "Revenue", numericValue: 32600, prefix: "$", icon: TrendingUp, accent: "accent", x: 5, y: 90, depth: 0.4, delay: 0.8, compact: true },
  { id: "fill-rate", kind: "metric", label: "Fill Rate", numericValue: 98, suffix: "%", icon: Target, accent: "secondary", x: 30, y: 94, depth: 0.6, delay: 0.95, compact: true },
  { id: "rpm", kind: "metric", label: "RPM", numericValue: 26.4, decimals: 2, prefix: "$", icon: Gauge, accent: "primary", x: 62, y: 92, depth: 0.55, delay: 1.1, compact: true },
  { id: "ad-requests", kind: "metric", label: "Ad Requests", numericValue: 8.4, decimals: 1, suffix: "M", icon: Zap, accent: "accent", x: 90, y: 88, depth: 0.65, delay: 1.25, compact: true },
];

export const showroomIntro: SectionIntro = {
  kicker: "Format Showroom",
  kickerIcon: LayoutGrid,
  headline: "Every Format, Live in One Place",
  headlineEmphasis: "Live in One Place",
  subheadline: "Pick a format and watch it come alive — creative, benefits, and revenue, all in real time.",
};

export const desktopExperienceIntro: SectionIntro = {
  kicker: "Desktop Experience",
  kickerIcon: MonitorCheck,
  headline: "See Every Placement On a Real Website",
  headlineEmphasis: "a Real Website",
  subheadline: "The same sequence a real visitor sees, from first paint to scroll.",
};

export interface DesktopStep {
  id: string;
  label: string;
  description: string;
}

export const desktopSteps: DesktopStep[] = [
  { id: "leaderboard", label: "Leaderboard slides in", description: "A high-viewability banner loads above the fold." },
  { id: "sidebar", label: "Sidebar loads", description: "A rail placement fills alongside your content." },
  { id: "in-content", label: "In-content appears", description: "A native unit fades in as the reader scrolls." },
  { id: "sticky-footer", label: "Sticky footer sticks", description: "A persistent footer bar anchors to the bottom." },
];

export const mobileExperienceIntro: SectionIntro = {
  kicker: "Mobile Experience",
  kickerIcon: Smartphone,
  headline: "Every Format, Native to Mobile",
  headlineEmphasis: "Native to Mobile",
  subheadline: "Tuned for thumbs, small screens, and short sessions.",
};

export interface MobileStep {
  id: string;
  label: string;
}

export const mobileSteps: MobileStep[] = [
  { id: "banner", label: "Banner loads" },
  { id: "native", label: "Native card appears" },
  { id: "interstitial", label: "Interstitial opens" },
  { id: "rewarded", label: "Rewarded video launches" },
  { id: "anchor", label: "Anchor sticks" },
];

export interface SdkLogo {
  name: string;
  icon: LucideIcon;
}

export const mobileSdks: SdkLogo[] = [
  { name: "AdMob", icon: Smartphone },
  { name: "MAX", icon: Target },
  { name: "Unity", icon: PlayCircle },
  { name: "IronSource", icon: Layers },
  { name: "Google Ad Manager", icon: Gauge },
];

export const ctvExperienceIntro: SectionIntro = {
  kicker: "CTV Experience",
  kickerIcon: Tv,
  headline: "Premium Video for the Biggest Screen",
  headlineEmphasis: "the Biggest Screen",
  subheadline: "A living-room-quality experience, from splash to sponsor.",
};

export interface CtvAnalyticsWidget {
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: LucideIcon;
  accent: Accent;
}

export const ctvAnalyticsWidgets: CtvAnalyticsWidget[] = [
  { label: "Video Starts", numericValue: 3.6, decimals: 1, suffix: "M", icon: PlayCircle, accent: "primary" },
  { label: "Completion", numericValue: 93, suffix: "%", icon: Target, accent: "secondary" },
  { label: "eCPM", numericValue: 24.8, decimals: 2, prefix: "$", icon: Gauge, accent: "accent" },
];

export const comparisonIntro: SectionIntro = {
  kicker: "Performance",
  kickerIcon: SlidersHorizontal,
  headline: "Optimized Formats Win, Every Time",
  headlineEmphasis: "Win, Every Time",
  subheadline: "The same inventory, priced two completely different ways.",
};

export interface ComparisonMetric {
  label: string;
  traditional: number;
  optimized: number;
  suffix?: string;
  prefix?: string;
}

export const comparisonMetrics: ComparisonMetric[] = [
  { label: "Fill Rate", traditional: 61, optimized: 98, suffix: "%" },
  { label: "RPM", traditional: 8.2, optimized: 26.4, prefix: "$" },
  { label: "Viewability", traditional: 54, optimized: 94, suffix: "%" },
  { label: "Revenue Index", traditional: 100, optimized: 285, suffix: "" },
];

export interface EcosystemAdvantage {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: Accent;
}

export const advantagesIntro: SectionIntro = {
  kicker: "Why Our Formats Perform Better",
  kickerIcon: Sparkles,
  headline: "Every Advantage, Working Together",
  headlineEmphasis: "Working Together",
  subheadline: "One AI engine, tuning every format at once.",
};

export const ecosystemAdvantages: EcosystemAdvantage[] = [
  { id: "viewability", label: "Better Viewability", icon: Eye, accent: "primary" },
  { id: "premium-demand", label: "Premium Demand", icon: Globe2, accent: "secondary" },
  { id: "lazy-loading", label: "Lazy Loading", icon: Timer, accent: "accent" },
  { id: "cls-protection", label: "CLS Protection", icon: ShieldCheck, accent: "primary" },
  { id: "fast-rendering", label: "Fast Rendering", icon: Rocket, accent: "secondary" },
  { id: "ai-optimization", label: "AI Optimization", icon: BrainCircuit, accent: "accent" },
  { id: "responsive-sizes", label: "Responsive Sizes", icon: Aperture, accent: "primary" },
  { id: "header-bidding", label: "Header Bidding", icon: Layers, accent: "secondary" },
];

export const simulatorIntro: SectionIntro = {
  kicker: "Revenue Simulator",
  kickerIcon: Cpu,
  headline: "See Your Potential Revenue",
  headlineEmphasis: "Potential Revenue",
  subheadline: "Move the inputs — the dashboard updates instantly.",
};

export interface SimulatorOption {
  id: string;
  label: string;
  multiplier: number;
}

export const simulatorCountries: SimulatorOption[] = [
  { id: "us", label: "United States", multiplier: 1 },
  { id: "uk", label: "United Kingdom", multiplier: 0.82 },
  { id: "de", label: "Germany", multiplier: 0.74 },
  { id: "in", label: "India", multiplier: 0.28 },
  { id: "br", label: "Brazil", multiplier: 0.34 },
];

export const simulatorDevices: SimulatorOption[] = [
  { id: "desktop", label: "Desktop", multiplier: 1 },
  { id: "mobile", label: "Mobile", multiplier: 0.86 },
  { id: "ctv", label: "CTV", multiplier: 1.35 },
];

export interface SimulatorFormatOption {
  id: AdFormatId;
  label: string;
  baseRpm: number;
}

export const simulatorFormats: SimulatorFormatOption[] = [
  { id: "display", label: "Display", baseRpm: 6.2 },
  { id: "native", label: "Native", baseRpm: 9.4 },
  { id: "video", label: "Video", baseRpm: 18.6 },
  { id: "rewarded", label: "Rewarded", baseRpm: 24.8 },
  { id: "ctv", label: "CTV Video", baseRpm: 32.5 },
];

export interface CaseStudy {
  id: string;
  name: string;
  category: string;
  deviceType: DeviceType;
  icon: LucideIcon;
  accent: Accent;
  revenueBefore: string;
  revenueAfter: string;
  rpmBefore: string;
  rpmAfter: string;
  ctr: number;
  growthPercent: number;
  trend: number[];
}

export const caseStudiesIntro: SectionIntro = {
  kicker: "Success Stories",
  kickerIcon: Users,
  headline: "Real Publishers, Real Growth",
  headlineEmphasis: "Real Growth",
  subheadline: "Click any card to see the full before-and-after.",
};

export const caseStudies: CaseStudy[] = [
  {
    id: "daily-north",
    name: "Daily North",
    category: "News Website",
    deviceType: "desktop",
    icon: Newspaper,
    accent: "primary",
    revenueBefore: "$12,400",
    revenueAfter: "$41,900",
    rpmBefore: "$4.10",
    rpmAfter: "$14.80",
    ctr: 2.4,
    growthPercent: 238,
    trend: [18, 24, 22, 32, 40, 52, 64, 76, 88, 100],
  },
  {
    id: "pixel-quest",
    name: "Pixel Quest Arena",
    category: "Gaming Site",
    deviceType: "desktop",
    icon: LayoutTemplate,
    accent: "secondary",
    revenueBefore: "$8,900",
    revenueAfter: "$27,600",
    rpmBefore: "$3.60",
    rpmAfter: "$11.20",
    ctr: 3.1,
    growthPercent: 210,
    trend: [22, 26, 30, 28, 38, 48, 58, 70, 82, 92],
  },
  {
    id: "capital-ledger",
    name: "Capital Ledger",
    category: "Finance Blog",
    deviceType: "desktop",
    icon: FileText,
    accent: "accent",
    revenueBefore: "$15,200",
    revenueAfter: "$38,400",
    rpmBefore: "$6.80",
    rpmAfter: "$17.50",
    ctr: 1.9,
    growthPercent: 153,
    trend: [30, 34, 32, 42, 48, 56, 64, 74, 84, 92],
  },
  {
    id: "fittrack-go",
    name: "FitTrack Go",
    category: "Mobile App",
    deviceType: "mobile",
    icon: Smartphone,
    accent: "primary",
    revenueBefore: "$6,100",
    revenueAfter: "$19,800",
    rpmBefore: "$5.20",
    rpmAfter: "$16.40",
    ctr: 2.7,
    growthPercent: 225,
    trend: [20, 24, 28, 26, 36, 46, 56, 68, 80, 94],
  },
  {
    id: "wavelength-tv",
    name: "Wavelength TV",
    category: "Streaming Platform",
    deviceType: "ctv",
    icon: Tv2,
    accent: "secondary",
    revenueBefore: "$28,000",
    revenueAfter: "$86,200",
    rpmBefore: "$14.60",
    rpmAfter: "$31.20",
    ctr: 0,
    growthPercent: 208,
    trend: [24, 30, 28, 40, 48, 58, 70, 82, 92, 100],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const adFormatsFaqIntro: SectionIntro = {
  kicker: "FAQ",
  kickerIcon: Building2,
  headline: "Questions, Answered",
  headlineEmphasis: "Answered",
  subheadline: "Everything publishers ask before choosing formats.",
};

export const adFormatsFaqs: FaqItem[] = [
  {
    question: "Do I need to choose one format, or can I run several?",
    answer: "Most publishers run several formats together — the AI engine balances them per page so they complement rather than compete for the same impression.",
  },
  {
    question: "Will more ad formats hurt my site speed or Core Web Vitals?",
    answer: "No — every format lazy-loads and is CLS-protected by default, so adding formats doesn't cost you page speed or search ranking.",
  },
  {
    question: "Which formats work best for mobile apps?",
    answer: "Rewarded, interstitial, and native typically perform best in-app, with anchor banners as a low-friction complement.",
  },
  {
    question: "Can I preview a format before turning it on?",
    answer: "Yes — the format showroom above shows the exact creative, benefits, and expected revenue impact before you enable anything.",
  },
  {
    question: "How is pricing decided across formats?",
    answer: "Every format runs through the same real-time header bidding auction, so pricing always reflects genuine demand, not a fixed rate card.",
  },
];

export interface AdFormatsFinalCta {
  headline: string;
  headlineEmphasis: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  characterPose: CharacterPoseId;
  trustIcon: LucideIcon;
  trustLabel: string;
}

export const adFormatsFinalCta: AdFormatsFinalCta = {
  headline: "Start Monetizing Every Impression",
  headlineEmphasis: "Every Impression",
  subheadline: "Every format, one AI engine, applied across web, app, and CTV.",
  primaryCta: { label: "Apply Now", href: "/eligibility-checker" },
  secondaryCta: { label: "Book A Consultation", href: "/about/contact" },
  characterPose: "thumbsUp",
  trustIcon: ShieldCheck,
  trustLabel: "No commitment required to apply",
};

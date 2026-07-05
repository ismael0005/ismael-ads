import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Building2,
  Cast,
  Clapperboard,
  Clock3,
  Eye,
  Film,
  Flame,
  FileBarChart,
  Gauge,
  Globe,
  Handshake,
  Layers,
  LayoutGrid,
  LineChart,
  MonitorPlay,
  MonitorSmartphone,
  MousePointerClick,
  Pause,
  PlayCircle,
  Radio,
  Send,
  ShieldCheck,
  SkipForward,
  Sparkles,
  Target,
  Trophy,
  Tv,
  Tv2,
  Users,
  Wand2,
} from "lucide-react";

import type { Accent } from "@/lib/accent";
import type { CharacterPoseId } from "@/data/assets";
import type { SectionIntro } from "@/data/home";

export interface CtvHeroContent {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const ctvHero: CtvHeroContent = {
  kicker: "CTV Monetization",
  kickerIcon: Tv,
  headline: "Turn Every TV Screen Into Premium Revenue",
  headlineEmphasis: "Premium Revenue",
  description:
    "Monetize Smart TVs, OTT apps, FAST channels, and connected TV inventory through premium video demand and AI-powered optimization.",
  primaryCta: { label: "Check Eligibility", href: "/eligibility-checker" },
  secondaryCta: { label: "Explore CTV", href: "#ad-formats" },
};

export const ctvTrustBadges: string[] = [
  "Google Ad Manager",
  "SpringServe",
  "FreeWheel",
  "Magnite",
  "PubMatic",
];

export interface CtvDevice {
  name: string;
  icon: LucideIcon;
}

/** The full platform roster for Section 4 — the hero's floating device row uses the first six. */
export const ctvDevices: CtvDevice[] = [
  { name: "Apple TV", icon: Tv2 },
  { name: "Fire TV", icon: Flame },
  { name: "Android TV", icon: MonitorSmartphone },
  { name: "Samsung TV", icon: Tv },
  { name: "LG WebOS", icon: MonitorPlay },
  { name: "Roku", icon: Cast },
  { name: "Google TV", icon: PlayCircle },
  { name: "Hisense", icon: Radio },
];

export type CtvWidgetKind = "metric" | "badge";

interface CtvWidgetBase {
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

export interface CtvMetricWidget extends CtvWidgetBase {
  kind: "metric";
  numericValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export interface CtvBadgeWidget extends CtvWidgetBase {
  kind: "badge";
  status: string;
}

export type CtvHeroWidget = CtvMetricWidget | CtvBadgeWidget;

/** Scattered around the TV — deliberately asymmetric, never a full ring, so it never has to sweep past the TV's silhouette. */
export const ctvHeroWidgets: CtvHeroWidget[] = [
  { id: "fill-rate", kind: "metric", label: "Live Fill Rate", numericValue: 96, suffix: "%", icon: Target, accent: "secondary", x: 5, y: 18, depth: 0.5, delay: 0.4, compact: true },
  { id: "completion", kind: "metric", label: "Video Completion", numericValue: 91, suffix: "%", icon: PlayCircle, accent: "primary", x: 92, y: 15, depth: 0.7, delay: 0.55, compact: true },
  { id: "ecpm", kind: "metric", label: "eCPM", numericValue: 28.4, decimals: 2, prefix: "$", icon: Gauge, accent: "accent", x: 3, y: 58, depth: 0.4, delay: 0.7, compact: true },
  { id: "viewability", kind: "metric", label: "Viewability", numericValue: 97, suffix: "%", icon: Eye, accent: "secondary", x: 94, y: 55, depth: 0.6, delay: 0.85, compact: true },
  { id: "ai-optimizing", kind: "badge", label: "AI Optimizing", status: "Active", icon: BrainCircuit, accent: "accent", x: 8, y: 90, depth: 0.85, delay: 1 },
  { id: "revenue-today", kind: "metric", label: "Revenue Today", numericValue: 18200, prefix: "$", icon: LineChart, accent: "primary", x: 90, y: 88, depth: 0.55, delay: 1.15, compact: true },
];

export interface CtvGrowthStat {
  icon: LucideIcon;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent: Accent;
}

export const ctvGrowthIntro: SectionIntro = {
  kicker: "Why CTV Is Growing",
  kickerIcon: LineChart,
  headline: "The Living Room Is the New Prime Time",
  headlineEmphasis: "New Prime Time",
  subheadline: "Viewers moved to streaming years ago. Ad budgets are still catching up.",
};

export const ctvGrowthTrend: number[] = [18, 24, 22, 32, 38, 46, 55, 64, 74, 84, 92, 100];

export const ctvGrowthStats: CtvGrowthStat[] = [
  { icon: Clock3, label: "Daily Streaming Hours", numericValue: 3.2, decimals: 1, suffix: "hrs", accent: "primary" },
  { icon: Users, label: "Cord Cutters", numericValue: 6.5, decimals: 1, suffix: "M+", accent: "secondary" },
  { icon: Gauge, label: "Premium CPM", numericValue: 32, prefix: "$", accent: "accent" },
  { icon: Sparkles, label: "Viewer Engagement", numericValue: 94, suffix: "%", accent: "primary" },
];

export interface CtvPipelineNode {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}

export const ctvPipelineIntro: SectionIntro = {
  kicker: "How It Works",
  kickerIcon: Wand2,
  headline: "From First Frame to First Payout",
  headlineEmphasis: "First Payout",
  subheadline: "Every viewing session, routed and priced automatically.",
};

export const ctvPipelineNodes: CtvPipelineNode[] = [
  { id: "viewer", label: "Viewer", description: "A viewer presses play on a connected TV.", icon: Users, accent: "primary" },
  { id: "tv-app", label: "TV App", description: "Your app or FAST channel loads the stream.", icon: Tv, accent: "secondary" },
  { id: "video-request", label: "Video Request", description: "An ad request fires for the upcoming break.", icon: Send, accent: "accent" },
  { id: "ai-optimization", label: "AI Optimization", description: "The engine reprices the break in real time.", icon: BrainCircuit, accent: "primary" },
  { id: "premium-demand", label: "Premium Demand", description: "Certified video buyers bid on the impression.", icon: Globe, accent: "secondary" },
  { id: "winning-advertiser", label: "Winning Advertiser", description: "The highest bid wins the slot, instantly.", icon: Trophy, accent: "accent" },
  { id: "ad-playback", label: "Ad Playback", description: "The creative plays back in broadcast quality.", icon: PlayCircle, accent: "primary" },
  { id: "revenue-dashboard", label: "Revenue Dashboard", description: "Your payout updates live, down to the view.", icon: FileBarChart, accent: "secondary" },
];

export const ctvPlatformsIntro: SectionIntro = {
  kicker: "Supported Platforms",
  kickerIcon: MonitorPlay,
  headline: "Every Screen in the Living Room",
  headlineEmphasis: "Living Room",
  subheadline: "One integration, certified across every major CTV platform.",
};

export type CtvAdFormatId =
  | "pre-roll"
  | "mid-roll"
  | "pause-ads"
  | "home-screen"
  | "interactive"
  | "companion"
  | "overlay"
  | "sponsored-channels";

export interface CtvAdFormat {
  id: CtvAdFormatId;
  label: string;
  icon: LucideIcon;
  accent: Accent;
  tagline: string;
}

export const ctvAdFormatsIntro: SectionIntro = {
  kicker: "Ad Formats",
  kickerIcon: Clapperboard,
  headline: "Premium Formats Built for the Big Screen",
  headlineEmphasis: "the Big Screen",
  subheadline: "Broadcast-quality placements that never feel like a pop-up.",
};

export const ctvAdFormats: CtvAdFormat[] = [
  { id: "pre-roll", label: "Pre-Roll", icon: PlayCircle, accent: "primary", tagline: "Plays before the content starts" },
  { id: "mid-roll", label: "Mid-Roll", icon: SkipForward, accent: "secondary", tagline: "A natural break inside the content" },
  { id: "pause-ads", label: "Pause Ads", icon: Pause, accent: "accent", tagline: "A static moment, never intrusive" },
  { id: "home-screen", label: "Home Screen Ads", icon: LayoutGrid, accent: "primary", tagline: "Premium placement before a session starts" },
  { id: "interactive", label: "Interactive Ads", icon: MousePointerClick, accent: "secondary", tagline: "Viewers engage with the remote" },
  { id: "companion", label: "Companion Ads", icon: Layers, accent: "accent", tagline: "A second-screen extension of the break" },
  { id: "overlay", label: "Overlay", icon: Film, accent: "primary", tagline: "A subtle banner within the frame" },
  { id: "sponsored-channels", label: "Sponsored Channels", icon: Tv2, accent: "secondary", tagline: "A branded FAST channel placement" },
];

export interface CtvDashboardMetric {
  icon: LucideIcon;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent: Accent;
}

export const ctvDashboardIntro: SectionIntro = {
  kicker: "Live Dashboard",
  kickerIcon: FileBarChart,
  headline: "Every Frame, Measured",
  headlineEmphasis: "Measured",
  subheadline: "Video starts, completions, and revenue — all in one cinematic view.",
};

export const ctvDashboardMetrics: CtvDashboardMetric[] = [
  { icon: PlayCircle, label: "Video Starts", numericValue: 4.8, decimals: 1, suffix: "M", accent: "primary" },
  { icon: Target, label: "Completion Rate", numericValue: 92, suffix: "%", accent: "secondary" },
  { icon: Eye, label: "Viewability", numericValue: 96, suffix: "%", accent: "accent" },
  { icon: Clock3, label: "Avg. Watch Time", numericValue: 4.2, decimals: 1, suffix: " min", accent: "primary" },
  { icon: Gauge, label: "eCPM", numericValue: 28.5, decimals: 2, prefix: "$", accent: "secondary" },
  { icon: LineChart, label: "Revenue", numericValue: 214, prefix: "$", suffix: "K", accent: "accent" },
];

export const ctvRevenueTrend: number[] = [22, 28, 26, 36, 34, 48, 56, 62, 72, 80, 90, 100];

export interface CtvRankedRow {
  label: string;
  value: string;
  share: number;
}

export const ctvCountryDistribution: CtvRankedRow[] = [
  { label: "United States", value: "$128K", share: 100 },
  { label: "Canada", value: "$41K", share: 58 },
  { label: "United Kingdom", value: "$29K", share: 42 },
  { label: "Australia", value: "$16K", share: 26 },
];

export const ctvDeviceDistribution: CtvRankedRow[] = [
  { label: "Roku", value: "$62K", share: 100 },
  { label: "Samsung TV", value: "$48K", share: 79 },
  { label: "Apple TV", value: "$37K", share: 61 },
  { label: "Fire TV", value: "$31K", share: 52 },
];

export interface CtvCaseStudy {
  id: string;
  appName: string;
  initials: string;
  category: string;
  monthlyViewers: string;
  revenueBefore: string;
  revenueAfter: string;
  completionRate: number;
  growthPercent: number;
  quote: string;
  trend: number[];
  accent: Accent;
}

export const ctvCaseStudiesIntro: SectionIntro = {
  kicker: "Success Stories",
  kickerIcon: Users,
  headline: "Streaming Apps Already Scaling",
  headlineEmphasis: "Already Scaling",
  subheadline: "A handful of the FAST channels and OTT apps already growing with Ismael Ads.",
};

export const ctvCaseStudies: CtvCaseStudy[] = [
  {
    id: "streamhouse-plus",
    appName: "StreamHouse+",
    initials: "SH",
    category: "FAST Channel",
    monthlyViewers: "1.8M+",
    revenueBefore: "$34,000",
    revenueAfter: "$112,000",
    completionRate: 94,
    growthPercent: 229,
    quote: "Premium demand finally treated our channel like broadcast inventory, not remnant.",
    trend: [20, 26, 24, 36, 42, 54, 63, 76, 90, 100],
    accent: "primary",
  },
  {
    id: "cinereel",
    appName: "CineReel",
    initials: "CR",
    category: "OTT Movies & Series",
    monthlyViewers: "920K+",
    revenueBefore: "$21,500",
    revenueAfter: "$58,900",
    completionRate: 91,
    growthPercent: 174,
    quote: "Mid-roll and pause ads lifted RPM without a single complaint about the experience.",
    trend: [24, 28, 32, 30, 40, 48, 56, 66, 78, 88],
    accent: "secondary",
  },
  {
    id: "livesport-now",
    appName: "LiveSport Now",
    initials: "LS",
    category: "Sports Streaming",
    monthlyViewers: "2.4M+",
    revenueBefore: "$58,000",
    revenueAfter: "$168,400",
    completionRate: 96,
    growthPercent: 190,
    quote: "Matchday inventory used to go unsold. Now premium buyers compete for every break.",
    trend: [30, 34, 32, 44, 50, 60, 70, 80, 90, 96],
    accent: "accent",
  },
];

export interface CtvEcosystemNode {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: Accent;
}

export const ctvEcosystemIntro: SectionIntro = {
  kicker: "Why Ismael Ads",
  kickerIcon: Sparkles,
  headline: "One Partner, Every Advantage",
  headlineEmphasis: "Every Advantage",
  subheadline: "Everything a premium CTV publisher needs, orbiting one AI engine.",
};

export const ctvEcosystemNodes: CtvEcosystemNode[] = [
  { id: "premium-demand", label: "Premium Demand", icon: Globe, accent: "primary" },
  { id: "header-bidding", label: "Header Bidding", icon: Layers, accent: "secondary" },
  { id: "ai-pricing", label: "AI Pricing", icon: BrainCircuit, accent: "accent" },
  { id: "video-optimization", label: "Video Optimization", icon: Film, accent: "primary" },
  { id: "dedicated-team", label: "Dedicated Team", icon: Handshake, accent: "secondary" },
  { id: "revenue-reporting", label: "Revenue Reporting", icon: FileBarChart, accent: "accent" },
];

export interface CtvFaqItem {
  question: string;
  answer: string;
}

export const ctvFaqIntro: SectionIntro = {
  kicker: "FAQ",
  kickerIcon: Building2,
  headline: "Questions, Answered",
  headlineEmphasis: "Answered",
  subheadline: "Everything publishers ask before going live on CTV.",
};

export const ctvFaqs: CtvFaqItem[] = [
  {
    question: "What counts as CTV inventory?",
    answer: "Any video served on a connected TV — native OTT apps, FAST channels, and content delivered through Apple TV, Roku, Fire TV, Samsung TV, LG WebOS, Android TV, Google TV, or Hisense.",
  },
  {
    question: "Do I need a minimum amount of viewership?",
    answer: "Requirements scale with your inventory type — the eligibility checker gives an instant read on your specific app or channel.",
  },
  {
    question: "Which ad formats are supported?",
    answer: "Pre-roll, mid-roll, pause ads, home screen placements, interactive and companion ads, overlays, and sponsored channel slots — all through a single integration.",
  },
  {
    question: "How is CTV pricing different from web or app?",
    answer: "CTV commands premium CPMs because inventory is scarcer and completion rates are far higher — our AI engine prices every break accordingly in real time.",
  },
  {
    question: "How fast can I start monetizing?",
    answer: "Most publishers complete integration and go live within one to two weeks of approval, with a dedicated team guiding setup.",
  },
];

export interface CtvFinalCtaContent {
  headline: string;
  headlineEmphasis: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  characterPose: CharacterPoseId;
  trustIcon: LucideIcon;
  trustLabel: string;
}

export const ctvFinalCta: CtvFinalCtaContent = {
  headline: "Ready To Monetize Your Connected TV Inventory?",
  headlineEmphasis: "Connected TV Inventory?",
  subheadline: "Join the streaming apps and FAST channels already earning premium CPMs with Ismael Ads.",
  primaryCta: { label: "Apply Now", href: "/eligibility-checker" },
  secondaryCta: { label: "Talk To Ismael", href: "/about/contact" },
  characterPose: "casualStanding",
  trustIcon: ShieldCheck,
  trustLabel: "No commitment required to apply",
};

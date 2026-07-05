import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  BrainCircuit,
  Cpu,
  CreditCard,
  Compass,
  Flag,
  Gauge,
  Gift,
  Globe,
  ImageIcon,
  Layers,
  LineChart,
  MapPin,
  MonitorPlay,
  Newspaper,
  Play,
  Puzzle,
  Radar,
  Rocket,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  UploadCloud,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import type { Accent } from "@/lib/accent";
import type { CharacterPoseId } from "@/data/assets";
import type { SectionIntro } from "@/data/home";

export interface AppHeroContent {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const appHero: AppHeroContent = {
  kicker: "App Monetization",
  kickerIcon: Smartphone,
  headline: "Turn Every App Session Into Maximum Revenue",
  headlineEmphasis: "Maximum Revenue",
  description:
    "Monetize every impression using AI optimization, mediation, premium SDK demand, and real-time bidding.",
  primaryCta: { label: "Check Eligibility", href: "/eligibility-checker" },
  secondaryCta: { label: "View SDK", href: "#sdk-integration" },
};

export const appTrustBadges: string[] = [
  "Google Ad Manager",
  "AdMob",
  "AppLovin",
  "Unity",
  "IronSource",
  "MAX",
];

export type AdFormatId =
  | "rewarded"
  | "interstitial"
  | "native"
  | "banner"
  | "open-app"
  | "splash"
  | "offerwall"
  | "playable";

export interface AdFormatContent {
  id: AdFormatId;
  label: string;
  icon: LucideIcon;
  accent: Accent;
  tagline: string;
}

/** Drives both the hero's cycling phone screen and the Section 4 device showcase — one definition, two presentations. */
export const appAdFormats: AdFormatContent[] = [
  { id: "rewarded", label: "Rewarded", icon: Gift, accent: "primary", tagline: "Opt-in reward for a completed view" },
  { id: "interstitial", label: "Interstitial", icon: AppWindow, accent: "secondary", tagline: "Full-screen moment between levels" },
  { id: "native", label: "Native", icon: Newspaper, accent: "accent", tagline: "Blends into your app's own feed" },
  { id: "banner", label: "Banner", icon: ImageIcon, accent: "primary", tagline: "Persistent placement, zero friction" },
  { id: "open-app", label: "Open App", icon: Send, accent: "secondary", tagline: "Monetizes the very first frame" },
  { id: "splash", label: "Splash", icon: Sparkles, accent: "accent", tagline: "Premium demand on cold start" },
  { id: "offerwall", label: "Offerwall", icon: Gift, accent: "primary", tagline: "A menu of rewarded actions" },
  { id: "playable", label: "Playable", icon: Puzzle, accent: "secondary", tagline: "Try-before-install mini experience" },
];

export type AppWidgetKind = "metric" | "badge";

interface AppWidgetBase {
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

export interface AppMetricWidget extends AppWidgetBase {
  kind: "metric";
  numericValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export interface AppBadgeWidget extends AppWidgetBase {
  kind: "badge";
  status: string;
}

export type AppHeroWidget = AppMetricWidget | AppBadgeWidget;

/** Scattered, asymmetric placement around the phone stack — deliberately not a uniform ring or orbit. */
export const appHeroWidgets: AppHeroWidget[] = [
  { id: "sdk-connected", kind: "badge", label: "SDK Connected", status: "Live", icon: Cpu, accent: "accent", x: 6, y: 20, depth: 0.5, delay: 0.4 },
  { id: "fill-rate", kind: "metric", label: "Fill Rate", numericValue: 97, suffix: "%", icon: Target, accent: "secondary", x: 90, y: 14, depth: 0.7, delay: 0.55, compact: true },
  { id: "arpdau", kind: "metric", label: "ARPDAU", numericValue: 0.34, decimals: 2, prefix: "$", icon: Wallet, accent: "primary", x: 4, y: 55, depth: 0.4, delay: 0.7, compact: true },
  { id: "ai-optimized", kind: "badge", label: "AI Optimized", status: "Active", icon: BrainCircuit, accent: "accent", x: 92, y: 52, depth: 0.85, delay: 0.85 },
  { id: "revenue-today", kind: "metric", label: "Revenue Today", numericValue: 8420, prefix: "$", icon: TrendingUp, accent: "primary", x: 10, y: 88, depth: 0.6, delay: 1, compact: true },
  { id: "ad-requests", kind: "metric", label: "Ad Requests", numericValue: 6.2, decimals: 1, suffix: "M", icon: Zap, accent: "secondary", x: 88, y: 86, depth: 0.55, delay: 1.15, compact: true },
];

export interface AppComparisonPoint {
  icon: LucideIcon;
  label: string;
}

export const appComparisonIntro: SectionIntro = {
  kicker: "The Gap",
  kickerIcon: Radar,
  headline: "Why Most Apps Lose Revenue",
  headlineEmphasis: "Lose Revenue",
  subheadline: "Two ways to run mediation. Only one of them scales.",
};

export const appComparisonBroken: AppComparisonPoint[] = [
  { icon: TrendingDown, label: "Broken waterfall" },
  { icon: Gauge, label: "Low fill" },
  { icon: Send, label: "Empty requests" },
  { icon: Layers, label: "Poor mediation" },
  { icon: Wallet, label: "Revenue leakage" },
];

export const appComparisonOptimized: AppComparisonPoint[] = [
  { icon: BrainCircuit, label: "AI optimization flow" },
  { icon: Target, label: "Highest bid wins" },
  { icon: Globe, label: "Premium networks" },
  { icon: LineChart, label: "Dynamic CPM" },
  { icon: TrendingUp, label: "Revenue increase" },
];

export interface SdkPipelineNode {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}

export const appSdkIntro: SectionIntro = {
  kicker: "SDK Integration",
  kickerIcon: Cpu,
  headline: "One SDK. Every Demand Source.",
  headlineEmphasis: "Every Demand Source.",
  subheadline: "Drop in a single SDK and let the pipeline handle the rest, end to end.",
};

export const appSdkPipeline: SdkPipelineNode[] = [
  { id: "upload", label: "Developer Uploads SDK", description: "One lightweight SDK, added in minutes.", icon: UploadCloud, accent: "primary" },
  { id: "sdk", label: "Ismael SDK", description: "Wraps every certified mediation network.", icon: Cpu, accent: "secondary" },
  { id: "ai", label: "AI Engine", description: "Learns your users and reprices in real time.", icon: BrainCircuit, accent: "accent" },
  { id: "demand", label: "Premium Demand", description: "Top networks bid on every impression.", icon: Globe, accent: "primary" },
  { id: "dashboard", label: "Revenue Dashboard", description: "Live performance, down to the session.", icon: LineChart, accent: "secondary" },
  { id: "payment", label: "Payment", description: "Payouts on schedule, no chasing invoices.", icon: CreditCard, accent: "accent" },
];

export const appFormatShowcaseIntro: SectionIntro = {
  kicker: "Ad Formats",
  kickerIcon: Layers,
  headline: "Every Format Your App Can Show",
  headlineEmphasis: "Your App Can Show",
  subheadline: "Eight formats, one SDK — each tuned for maximum yield without hurting retention.",
};

export interface AppPartner {
  name: string;
  icon: LucideIcon;
}

export const appPartnersIntro: SectionIntro = {
  kicker: "Mediation Partners",
  kickerIcon: Globe,
  headline: "Every Major Network, One Waterfall",
  headlineEmphasis: "One Waterfall",
  subheadline: "Certified access to the demand sources that actually move CPMs.",
};

export const appPartners: AppPartner[] = [
  { name: "Google AdMob", icon: Smartphone },
  { name: "AppLovin", icon: Rocket },
  { name: "Unity", icon: Play },
  { name: "MAX", icon: Target },
  { name: "IronSource", icon: Layers },
  { name: "Chartboost", icon: Flag },
  { name: "Pangle", icon: Send },
  { name: "Mintegral", icon: Sparkles },
  { name: "Vungle", icon: MonitorPlay },
  { name: "Meta", icon: Globe },
  { name: "Google Ad Manager", icon: Gauge },
];

export const appDashboardIntro: SectionIntro = {
  kicker: "Live Dashboard",
  kickerIcon: LineChart,
  headline: "Your Revenue, Watched by AI",
  headlineEmphasis: "Watched by AI",
  subheadline: "Every auction, every session, every payout — visible in real time.",
};

export const appRevenueTrend: number[] = [24, 30, 28, 40, 38, 52, 61, 58, 70, 78, 88, 100];

export interface AppDashboardMetric {
  icon: LucideIcon;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent: Accent;
}

export const appDashboardMetrics: AppDashboardMetric[] = [
  { icon: Target, label: "Fill Rate", numericValue: 97, suffix: "%", accent: "primary" },
  { icon: Gauge, label: "eCPM", numericValue: 8.6, decimals: 2, prefix: "$", accent: "secondary" },
  { icon: Wallet, label: "ARPDAU", numericValue: 0.34, decimals: 2, prefix: "$", accent: "accent" },
  { icon: Zap, label: "Requests / sec", numericValue: 12.4, decimals: 1, suffix: "K", accent: "primary" },
];

export interface AppRankedRow {
  label: string;
  value: string;
  share: number;
}

export const appTopCountries: AppRankedRow[] = [
  { label: "United States", value: "$18.2K", share: 100 },
  { label: "United Kingdom", value: "$9.6K", share: 62 },
  { label: "Germany", value: "$7.1K", share: 48 },
  { label: "Canada", value: "$5.4K", share: 36 },
];

export const appTopApps: AppRankedRow[] = [
  { label: "Puzzle Quest Go", value: "$6.8K", share: 100 },
  { label: "Fit Tracker Pro", value: "$5.2K", share: 74 },
  { label: "Word Blitz", value: "$4.1K", share: 58 },
  { label: "Runner Legends", value: "$3.3K", share: 45 },
];

export interface AppCaseStudy {
  id: string;
  appName: string;
  initials: string;
  category: string;
  downloads: string;
  revenueBefore: string;
  revenueAfter: string;
  growthPercent: number;
  quote: string;
  trend: number[];
  accent: Accent;
}

export const appTestimonialsIntro: SectionIntro = {
  kicker: "Success Stories",
  kickerIcon: Users,
  headline: "Apps Already Earning More",
  headlineEmphasis: "Earning More",
  subheadline: "A handful of the mobile apps already scaling revenue with Ismael Ads.",
};

export const appCaseStudies: AppCaseStudy[] = [
  {
    id: "puzzle-quest-go",
    appName: "Puzzle Quest Go",
    initials: "PQ",
    category: "Casual Games",
    downloads: "2.4M+",
    revenueBefore: "$11,200",
    revenueAfter: "$41,800",
    growthPercent: 273,
    quote: "Mediation used to be a guessing game. Now the AI just finds the highest bid, every time.",
    trend: [18, 24, 22, 34, 40, 52, 61, 74, 88, 100],
    accent: "primary",
  },
  {
    id: "fit-tracker-pro",
    appName: "Fit Tracker Pro",
    initials: "FT",
    category: "Health & Fitness",
    downloads: "870K+",
    revenueBefore: "$6,400",
    revenueAfter: "$19,100",
    growthPercent: 198,
    quote: "Rewarded and native placements finally feel native — retention didn't drop, revenue tripled.",
    trend: [22, 26, 30, 28, 38, 46, 55, 63, 74, 86],
    accent: "secondary",
  },
  {
    id: "word-blitz",
    appName: "Word Blitz",
    initials: "WB",
    category: "Word Games",
    downloads: "1.1M+",
    revenueBefore: "$8,900",
    revenueAfter: "$24,600",
    growthPercent: 176,
    quote: "Fill rate on our lowest-tier GEOs went from an afterthought to a real revenue line.",
    trend: [30, 34, 32, 40, 48, 54, 62, 70, 80, 92],
    accent: "accent",
  },
];

export interface AppTimelineStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}

export const appTimelineIntro: SectionIntro = {
  kicker: "How We Optimize",
  kickerIcon: Compass,
  headline: "From First Session to Full Scale",
  headlineEmphasis: "Full Scale",
  subheadline: "A continuous loop, not a one-time setup.",
};

export const appTimelineSteps: AppTimelineStep[] = [
  { id: "discovery", title: "Discovery", description: "We map your app's traffic, users, and current ad stack.", icon: Compass, accent: "primary" },
  { id: "sdk", title: "SDK", description: "Integrate the Ismael SDK once, across every ad format.", icon: Cpu, accent: "secondary" },
  { id: "ai-learning", title: "AI Learning", description: "The engine learns session patterns and bid behavior.", icon: BrainCircuit, accent: "accent" },
  { id: "optimization", title: "Optimization", description: "Floors, waterfalls, and placements reprice automatically.", icon: SlidersHorizontal, accent: "primary" },
  { id: "scaling", title: "Scaling", description: "Revenue compounds as demand and data both grow.", icon: Rocket, accent: "secondary" },
];

export interface AppFaqItem {
  question: string;
  answer: string;
}

export const appFaqIntro: SectionIntro = {
  kicker: "FAQ",
  kickerIcon: MapPin,
  headline: "Questions, Answered",
  headlineEmphasis: "Answered",
  subheadline: "Everything developers ask before integrating.",
};

export const appFaqs: AppFaqItem[] = [
  {
    question: "How long does SDK integration take?",
    answer: "Most teams ship the Ismael SDK in under a day — it's a single dependency that wraps every certified mediation network behind one interface.",
  },
  {
    question: "Will this replace my current mediation setup?",
    answer: "You can run it alongside your existing stack or replace it outright. Either way, the AI engine only routes to whichever source wins the auction.",
  },
  {
    question: "Which platforms are supported?",
    answer: "Native iOS, Android, and the major cross-platform frameworks (Unity, React Native, Flutter) are all supported out of the box.",
  },
  {
    question: "Does this affect app performance or retention?",
    answer: "Placements are tuned per format and per session — the AI engine explicitly optimizes for revenue without spiking load times or churn.",
  },
  {
    question: "How and when do I get paid?",
    answer: "Payouts run on a fixed monthly schedule with full visibility into every network's contribution, live in your dashboard.",
  },
];

export interface AppFinalCtaContent {
  headline: string;
  headlineEmphasis: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  characterPose: CharacterPoseId;
  trustIcon: LucideIcon;
  trustLabel: string;
}

export const appFinalCta: AppFinalCtaContent = {
  headline: "Ready To Unlock Higher Mobile Revenue?",
  headlineEmphasis: "Higher Mobile Revenue?",
  subheadline: "Join the app developers already earning more with AI-optimized mediation.",
  primaryCta: { label: "Check Eligibility", href: "/eligibility-checker" },
  secondaryCta: { label: "Talk To Ismael", href: "/about/contact" },
  characterPose: "welcomePose",
  trustIcon: ShieldCheck,
  trustLabel: "No commitment required to check eligibility",
};

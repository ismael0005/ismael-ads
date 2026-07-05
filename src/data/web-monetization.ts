import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  ClipboardCheck,
  Gauge,
  Globe,
  Hourglass,
  LayoutTemplate,
  LineChart,
  Rocket,
  Search,
  Shuffle,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";

import type { Accent } from "@/lib/accent";
import type { CharacterPoseId } from "@/data/assets";
import type { SectionIntro } from "@/data/home";

export interface WebHeroContent {
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

export const webHero: WebHeroContent = {
  kicker: "Solutions / Web Monetization",
  kickerIcon: Globe,
  headline: "Turn Every Page View Into Maximum Revenue",
  headlineEmphasis: "Maximum Revenue",
  subheadline:
    "Adaptive layouts, certified premium demand, and real-time header bidding — Ismael Ads turns your website traffic into predictable, maximized ad revenue without hurting user experience.",
  primaryCta: { label: "Check Eligibility", href: "/eligibility-checker" },
  secondaryCta: { label: "See How It Works", href: "#how-it-works" },
  characterPose: "holdingTablet",
};

export interface WebHeroMetric {
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

/** The hero's compact trust row — same values that appear on the dashboard mockup and stats strip below. */
export const webHeroMetrics: WebHeroMetric[] = [
  { label: "Avg. RPM", numericValue: 24.8, prefix: "$", decimals: 2 },
  { label: "Fill Rate", numericValue: 98, suffix: "%" },
  { label: "Revenue Growth", numericValue: 285, prefix: "+", suffix: "%" },
];

export const webDemandPartners: string[] = ["Google AdX", "PubMatic", "OpenX", "Rubicon"];

export interface WebStat {
  icon: LucideIcon;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent: Accent;
}

export const webStats: WebStat[] = [
  { icon: Gauge, label: "Avg. RPM", numericValue: 24.8, prefix: "$", decimals: 2, accent: "primary" },
  { icon: Target, label: "Fill Rate", numericValue: 98, suffix: "%", accent: "secondary" },
  { icon: TrendingUp, label: "Revenue Growth", numericValue: 285, prefix: "+", suffix: "%", accent: "accent" },
  { icon: Globe, label: "Websites Monetized", numericValue: 350, suffix: "+", accent: "primary" },
];

export interface ProblemPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const webProblemIntro: SectionIntro = {
  kicker: "The Problem",
  kickerIcon: AlertTriangle,
  headline: "Your Ad Stack Is Leaving Money on the Table",
  headlineEmphasis: "Leaving Money on the Table",
  subheadline: "Most publishers are stuck with an outdated setup that caps revenue instead of growing it.",
};

export const webProblems: ProblemPoint[] = [
  {
    icon: TrendingDown,
    title: "Low Fill Rates",
    description: "Unsold inventory means every empty ad slot is revenue that never gets captured.",
  },
  {
    icon: Hourglass,
    title: "Waterfall Latency",
    description: "Sequential waterfalls call one network at a time, slowing pages and missing higher bids.",
  },
  {
    icon: Shuffle,
    title: "Disconnected Demand",
    description: "A handful of demand partners compete instead of the entire market bidding at once.",
  },
  {
    icon: SlidersHorizontal,
    title: "Manual Optimization",
    description: "Price floors and placements get set once and rarely revisited, leaving performance flat.",
  },
];

export const webSolutionIntro: SectionIntro = {
  kicker: "The Solution",
  kickerIcon: Sparkles,
  headline: "One Auction. Every Demand Source. Real Time.",
  headlineEmphasis: "Real Time.",
  subheadline:
    "Ismael Ads replaces your waterfall with a unified header bidding auction — so every impression sells for what it's actually worth.",
};

export interface SolutionPoint {
  title: string;
  description: string;
}

export const webSolutionPoints: SolutionPoint[] = [
  { title: "Real-time header bidding", description: "Every certified partner bids on every impression, simultaneously." },
  { title: "Certified premium partners", description: "Direct, certified access to Google AdX, PubMatic, OpenX, and Rubicon." },
  { title: "AI price optimization", description: "Floors reprice automatically to capture the strongest available bid." },
  { title: "Live revenue reporting", description: "Every auction, fill, and payout visible in your dashboard in real time." },
];

export interface WebFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: Accent;
}

export const webFeaturesIntro: SectionIntro = {
  kicker: "Key Features",
  kickerIcon: LayoutTemplate,
  headline: "Everything Your Site Needs to Earn More",
  headlineEmphasis: "Earn More",
  subheadline: "A complete monetization stack, managed for you end to end.",
};

export const webFeatures: WebFeature[] = [
  {
    icon: Zap,
    title: "Real-Time Header Bidding",
    description: "Every certified demand partner bids simultaneously — no waterfall, no missed revenue.",
    accent: "primary",
  },
  {
    icon: BrainCircuit,
    title: "AI Price Optimization",
    description: "Machine learning adjusts floor prices per impression to squeeze out maximum CPM.",
    accent: "accent",
  },
  {
    icon: LayoutTemplate,
    title: "Adaptive Ad Layouts",
    description: "Placements automatically adjust to device and content to protect UX and viewability.",
    accent: "secondary",
  },
  {
    icon: BadgeCheck,
    title: "Certified Premium Demand",
    description: "Direct, certified access to Google AdX, PubMatic, OpenX, and other top-tier SSPs.",
    accent: "primary",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Consent Ready",
    description: "Built-in GDPR, CCPA, and consent management — compliant everywhere your readers are.",
    accent: "secondary",
  },
  {
    icon: LineChart,
    title: "Live Revenue Dashboard",
    description: "Track RPM, fill rate, and payouts in real time — down to the individual page.",
    accent: "accent",
  },
];

export interface WebProcessStep {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: Accent;
}

export const webHowItWorksIntro: SectionIntro = {
  kicker: "How It Works",
  kickerIcon: Workflow,
  headline: "Live in Days, Not Months",
  headlineEmphasis: "Days, Not Months",
  subheadline: "A guided rollout from application to your first optimized payout.",
};

export const webProcessSteps: WebProcessStep[] = [
  {
    step: 1,
    icon: Search,
    title: "Check Eligibility",
    description: "Tell us about your site and traffic in a two-minute form.",
    accent: "primary",
  },
  {
    step: 2,
    icon: ClipboardCheck,
    title: "Get Approved",
    description: "Our team reviews your site and confirms fit within 48 hours.",
    accent: "secondary",
  },
  {
    step: 3,
    icon: Rocket,
    title: "Add One Tag",
    description: "Drop in a single script — our team handles the header bidding setup.",
    accent: "accent",
  },
  {
    step: 4,
    icon: LineChart,
    title: "Watch Revenue Grow",
    description: "Track RPM and fill rate live as premium demand fills every slot.",
    accent: "primary",
  },
];

export const webResultsIntro: SectionIntro = {
  kicker: "Results",
  kickerIcon: Star,
  headline: "Real Websites, Real Revenue Lifts",
  headlineEmphasis: "Real Revenue Lifts",
  subheadline: "A handful of the 350+ websites already earning more with Ismael Ads.",
};

/** Curated subset of data/home's resultsWallCards — the same publisher network, highlighted for the web solution page. */
export const webResultCardIds = ["northbound", "cookwell", "dailyfeed", "horizon-gaming"];

export interface WebFinalCta {
  headline: string;
  headlineEmphasis: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  characterPose: CharacterPoseId;
  trustIcon: LucideIcon;
  trustLabel: string;
}

export const webFinalCta: WebFinalCta = {
  headline: "Ready to Maximize Your Website Revenue?",
  headlineEmphasis: "Website Revenue?",
  subheadline: "Join 350+ websites already earning more with Ismael Ads. Check your eligibility in under two minutes.",
  primaryCta: { label: "Check Eligibility", href: "/eligibility-checker" },
  secondaryCta: { label: "Talk To Ismael", href: "/about/contact" },
  characterPose: "confidentArms",
  trustIcon: ShieldCheck,
  trustLabel: "No commitment required to check eligibility",
};

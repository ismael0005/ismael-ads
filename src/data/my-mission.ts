import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Building2,
  Compass,
  Eye,
  Gauge,
  Gem,
  Globe,
  Globe2,
  Handshake,
  HeartHandshake,
  Layers,
  LayoutDashboard,
  Lightbulb,
  LineChart,
  Link2,
  Mail,
  MapPin,
  Play,
  Puzzle,
  Radar,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  ThumbsDown,
  TrendingDown,
  TrendingUp,
  Tv,
  UsersRound,
  Wand2,
  Zap,
} from "lucide-react";

import type { Accent } from "@/lib/accent";
import type { CharacterPoseId } from "@/data/assets";
import type { SectionIntro } from "@/data/home";

/* ------------------------------------------------------------------ */
/* Section 1 — Mission Hero                                            */
/* ------------------------------------------------------------------ */

export interface MissionHeroContent {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustBadges: string[];
}

export const missionHero: MissionHeroContent = {
  kicker: "Our Mission",
  kickerIcon: Target,
  headline: "Helping Publishers Build Sustainable Revenue, Not Short-Term Wins",
  headlineEmphasis: "Sustainable Revenue",
  description:
    "At Ismael Ads, our mission is to empower publishers with premium monetization solutions, transparent partnerships and intelligent optimization that creates long-term growth instead of temporary revenue spikes.",
  primaryCta: { label: "Start Growing", href: "/eligibility-checker" },
  secondaryCta: { label: "Talk To Ismael", href: "/about/contact" },
  trustBadges: ["15+ Years", "Global Publishers", "Google Ecosystem", "Premium Demand"],
};

export interface MissionOrbitNode {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: Accent;
}

/** Single-ring orbit around the hero's AI core — same radius/duration for every node. */
export const missionHeroOrbit: MissionOrbitNode[] = [
  { id: "website", label: "Website", icon: Globe, accent: "primary" },
  { id: "mobile-app", label: "Mobile App", icon: Smartphone, accent: "secondary" },
  { id: "ctv", label: "CTV", icon: Tv, accent: "accent" },
  { id: "adx", label: "Google AdX", icon: ShieldCheck, accent: "primary" },
  { id: "dashboard", label: "Publisher Dashboard", icon: LayoutDashboard, accent: "secondary" },
  { id: "revenue", label: "Revenue Graph", icon: LineChart, accent: "accent" },
  { id: "demand", label: "Premium Demand", icon: Gem, accent: "primary" },
];

/* ------------------------------------------------------------------ */
/* Section 2 — Why We Exist                                            */
/* ------------------------------------------------------------------ */

export const whyWeExistIntro: SectionIntro = {
  kicker: "Why We Exist",
  kickerIcon: Lightbulb,
  headline: "Every Product Decision Starts With One Question",
  headlineEmphasis: "One Question",
  subheadline: "Does this actually help the publisher on the other side?",
};

export interface MissionChapter {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
  layout: "orb" | "fan" | "chart" | "compare";
}

export const missionChapters: MissionChapter[] = [
  {
    id: "chapter-1",
    index: "01",
    title: "Publishers Deserve Better Monetization",
    description:
      "For too long, publishers have been handed generic ad tags and left to guess why revenue never matched their traffic. We believe every publisher deserves monetization built around their specific inventory, audience and goals — not a one-size-fits-all script.",
    icon: ThumbsDown,
    accent: "primary",
    layout: "orb",
  },
  {
    id: "chapter-2",
    index: "02",
    title: "Technology Should Work For Publishers",
    description:
      "AI, header bidding and real-time optimization should quietly do the hard work in the background — not add another dashboard to babysit. We build technology that removes complexity from a publisher's day, not one that adds to it.",
    icon: Wand2,
    accent: "secondary",
    layout: "fan",
  },
  {
    id: "chapter-3",
    index: "03",
    title: "Growth Should Be Transparent",
    description:
      "No hidden margins. No black-box reporting. Every publisher we work with sees the same numbers we see — the same auctions, the same fill rates, the same revenue — because trust only survives with full visibility.",
    icon: Eye,
    accent: "accent",
    layout: "chart",
  },
  {
    id: "chapter-4",
    index: "04",
    title: "Long-Term Partnerships Always Outperform Quick Profits",
    description:
      "A short-term spike that damages user experience always costs more than it earns. We optimize for the relationship that lasts years, not the report that looks good for one quarter.",
    icon: HeartHandshake,
    accent: "primary",
    layout: "compare",
  },
];

/* ------------------------------------------------------------------ */
/* Section 3 — Mission Core                                            */
/* ------------------------------------------------------------------ */

export const missionCoreIntro: SectionIntro = {
  kicker: "Mission Core",
  kickerIcon: Sparkles,
  headline: "One Mission, Eight Principles That Never Change",
  headlineEmphasis: "Eight Principles",
  subheadline: "Hover any principle to see how it shapes the way we work.",
};

export interface MissionValue {
  id: string;
  label: string;
  detail: string;
  icon: LucideIcon;
  accent: Accent;
}

export const missionValues: MissionValue[] = [
  { id: "publisher-first", label: "Publisher First", detail: "Every decision is measured by whether it helps the publisher, not just the platform.", icon: UsersRound, accent: "primary" },
  { id: "transparency", label: "Transparency", detail: "The same numbers, the same reporting, visible to you exactly as we see them.", icon: Eye, accent: "secondary" },
  { id: "performance", label: "Performance", detail: "Every optimization is tied to a measurable outcome, tracked continuously.", icon: TrendingUp, accent: "accent" },
  { id: "innovation", label: "Innovation", detail: "AI-driven pricing and yield strategies, always evolving with the market.", icon: BrainCircuit, accent: "primary" },
  { id: "trust", label: "Trust", detail: "Built slowly, through consistent results, and never taken for granted.", icon: ShieldCheck, accent: "secondary" },
  { id: "partnership", label: "Partnership", detail: "We grow when you grow — the incentives are aligned from day one.", icon: Handshake, accent: "accent" },
  { id: "global-reach", label: "Global Reach", detail: "Hands-on experience across LATAM, North America and Europe.", icon: Globe2, accent: "primary" },
  { id: "ai-optimization", label: "AI-Powered Optimization", detail: "Machine-learning pricing layered on top of every account, every day.", icon: Zap, accent: "secondary" },
];

/* ------------------------------------------------------------------ */
/* Section 4 — Problems We Want To Solve                                */
/* ------------------------------------------------------------------ */

export const missionProblemsIntro: SectionIntro = {
  kicker: "The Problems We Solve",
  kickerIcon: Puzzle,
  headline: "Every Publisher Challenge Becomes A Solved Problem",
  headlineEmphasis: "Solved Problem",
  subheadline: "The same friction, over and over — until it isn't anymore.",
};

export interface ProblemSolutionPair {
  id: string;
  problemLabel: string;
  problemIcon: LucideIcon;
  solutionLabel: string;
  solutionIcon: LucideIcon;
  metric: string;
  accent: Accent;
}

export const problemSolutionPairs: ProblemSolutionPair[] = [
  { id: "rpm", problemLabel: "Low RPM", problemIcon: TrendingDown, solutionLabel: "Optimized Floor Pricing", solutionIcon: TrendingUp, metric: "+42% RPM", accent: "primary" },
  { id: "fill-rate", problemLabel: "Poor Fill Rate", problemIcon: Gauge, solutionLabel: "Header Bidding Demand", solutionIcon: Layers, metric: "98% Fill Rate", accent: "secondary" },
  { id: "support", problemLabel: "Slow Support", problemIcon: ThumbsDown, solutionLabel: "Direct Founder Access", solutionIcon: HeartHandshake, metric: "24/7 Response", accent: "accent" },
  { id: "demand", problemLabel: "Low Demand", problemIcon: Search, solutionLabel: "Premium Demand Partners", solutionIcon: Gem, metric: "+60% Demand", accent: "primary" },
  { id: "setup", problemLabel: "Complex Setup", problemIcon: Puzzle, solutionLabel: "Guided Onboarding", solutionIcon: BadgeCheck, metric: "Live In Days", accent: "secondary" },
  { id: "loss", problemLabel: "Revenue Loss", problemIcon: TrendingDown, solutionLabel: "AI Revenue Recovery", solutionIcon: BrainCircuit, metric: "+35% Recovered", accent: "accent" },
];

/* ------------------------------------------------------------------ */
/* Section 5 — Our Vision                                              */
/* ------------------------------------------------------------------ */

export const missionVisionIntro: SectionIntro = {
  kicker: "Our Vision",
  kickerIcon: Radar,
  headline: "The Future Of Publisher Monetization",
  headlineEmphasis: "Publisher Monetization",
  subheadline:
    "We're building toward becoming one of the most trusted monetization partners across LATAM, North America and Europe.",
};

export interface VisionRegionNode {
  id: string;
  label: string;
  stat: string;
  icon: LucideIcon;
  accent: Accent;
  x: number;
  y: number;
}

export const visionRegionNodes: VisionRegionNode[] = [
  { id: "latam", label: "LATAM", stat: "38% of network", icon: MapPin, accent: "primary", x: 18, y: 68 },
  { id: "north-america", label: "North America", stat: "41% of network", icon: Building2, accent: "secondary", x: 50, y: 22 },
  { id: "europe", label: "Europe", stat: "21% of network", icon: Globe, accent: "accent", x: 82, y: 60 },
];

export interface VisionDashboardNode {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  accent: Accent;
  x: number;
  y: number;
}

export const visionDashboardNodes: VisionDashboardNode[] = [
  { id: "revenue-stream", label: "Revenue Streams", value: "Live", icon: LineChart, accent: "primary", x: 34, y: 40 },
  { id: "publisher-nodes", label: "Publisher Nodes", value: "500+", icon: UsersRound, accent: "secondary", x: 66, y: 38 },
  { id: "premium-partners", label: "Premium Demand", value: "Connected", icon: Gem, accent: "accent", x: 50, y: 82 },
];

/* ------------------------------------------------------------------ */
/* Section 6 — Our Principles (compass)                                */
/* ------------------------------------------------------------------ */

export const missionPrinciplesIntro: SectionIntro = {
  kicker: "Our Principles",
  kickerIcon: Compass,
  headline: "The Compass That Guides Every Decision",
  headlineEmphasis: "Guides Every Decision",
  subheadline: "Tap any principle to see what it means in practice.",
};

export interface MissionPrinciple {
  id: string;
  label: string;
  detail: string;
  icon: LucideIcon;
  accent: Accent;
  direction: "N" | "NE" | "E" | "SE" | "S" | "W";
}

export const missionPrinciples: MissionPrinciple[] = [
  { id: "integrity", label: "Integrity", detail: "We do the right thing for the publisher, even when no one is checking.", icon: Scale, accent: "primary", direction: "N" },
  { id: "transparency", label: "Transparency", detail: "Full visibility into every auction, every fee, every report.", icon: Eye, accent: "secondary", direction: "NE" },
  { id: "performance", label: "Performance", detail: "Optimization tied to measurable revenue outcomes, not vanity metrics.", icon: TrendingUp, accent: "accent", direction: "E" },
  { id: "innovation", label: "Innovation", detail: "AI and automation applied where they genuinely help, not for show.", icon: BrainCircuit, accent: "primary", direction: "SE" },
  { id: "education", label: "Education", detail: "Publishers understand their own account — we explain, not just implement.", icon: BookOpen, accent: "secondary", direction: "S" },
  { id: "relationships", label: "Relationships", detail: "Partnerships measured in years, built on consistent, honest results.", icon: Link2, accent: "accent", direction: "W" },
];

/* ------------------------------------------------------------------ */
/* Section 7 — Our Promise                                             */
/* ------------------------------------------------------------------ */

export const missionPromise = {
  lineOne: "We don't measure success by how much revenue we generate.",
  lineTwo: "We measure success by how much our publishers grow.",
};

/* ------------------------------------------------------------------ */
/* Section 8 — Impact                                                  */
/* ------------------------------------------------------------------ */

export const missionImpactIntro: SectionIntro = {
  kicker: "Impact",
  kickerIcon: BarChart3,
  headline: "The Mission, Measured In Real Numbers",
  headlineEmphasis: "Real Numbers",
  subheadline: "Fifteen years of publisher-first monetization, condensed.",
};

export interface MissionImpactStat {
  id: string;
  icon: LucideIcon;
  label: string;
  accent: Accent;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  staticValue?: string;
  trend: number[];
}

export const missionImpactStats: MissionImpactStat[] = [
  { id: "years", icon: Award, label: "Years Experience", numericValue: 15, suffix: "+", accent: "primary", trend: [2, 4, 5, 7, 9, 11, 13, 15] },
  { id: "publishers", icon: UsersRound, label: "Publishers", numericValue: 500, suffix: "+", accent: "secondary", trend: [40, 90, 150, 220, 300, 380, 460, 500] },
  { id: "requests", icon: Globe2, label: "Monthly Ad Requests", numericValue: 3, suffix: "B+", accent: "accent", trend: [0.4, 0.8, 1.2, 1.6, 2.1, 2.5, 2.8, 3] },
  { id: "fill-rate", icon: Gauge, label: "Fill Rate", numericValue: 98, suffix: "%", accent: "primary", trend: [72, 78, 84, 88, 91, 94, 96, 98] },
  { id: "impressions", icon: BarChart3, label: "Optimized Impressions", staticValue: "Millions", accent: "secondary", trend: [10, 22, 35, 48, 60, 74, 88, 100] },
];

/* ------------------------------------------------------------------ */
/* Section 9 — The Journey Ahead                                       */
/* ------------------------------------------------------------------ */

export const missionRoadmapIntro: SectionIntro = {
  kicker: "The Journey Ahead",
  kickerIcon: Rocket,
  headline: "Where We're Headed Next",
  headlineEmphasis: "Headed Next",
  subheadline: "The mission doesn't end here — it compounds.",
};

export interface RoadmapStage {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
  x: number;
  y: number;
}

export const roadmapStages: RoadmapStage[] = [
  { id: "today", label: "Today", description: "Hands-on partnerships across 500+ publishers.", icon: BadgeCheck, accent: "primary", x: 4, y: 86 },
  { id: "growing", label: "Growing", description: "Expanding premium demand relationships every quarter.", icon: TrendingUp, accent: "secondary", x: 19, y: 70 },
  { id: "scaling", label: "Scaling", description: "Systemizing onboarding without losing the personal touch.", icon: Layers, accent: "accent", x: 34, y: 54 },
  { id: "ai", label: "AI", description: "Deeper machine-learning pricing across every ad format.", icon: BrainCircuit, accent: "primary", x: 50, y: 40 },
  { id: "global-expansion", label: "Global Expansion", description: "New publisher hubs across Europe and North America.", icon: Globe2, accent: "secondary", x: 65, y: 28 },
  { id: "premium-partnerships", label: "Premium Partnerships", description: "Direct relationships with the demand sources that pay the most.", icon: Gem, accent: "accent", x: 81, y: 16 },
  { id: "future-innovation", label: "Future Innovation", description: "Whatever helps publishers earn more, built next.", icon: Sparkles, accent: "primary", x: 95, y: 6 },
];

/* ------------------------------------------------------------------ */
/* Section 10 — Publisher Testimonials                                 */
/* ------------------------------------------------------------------ */

export const missionTestimonialsIntro: SectionIntro = {
  kicker: "Publisher Testimonials",
  kickerIcon: HeartHandshake,
  headline: "The Mission, In Their Words",
  headlineEmphasis: "In Their Words",
  subheadline: "Publishers who felt the difference between a vendor and a partner.",
};

export interface MissionTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  accent: Accent;
}

export const missionTestimonials: MissionTestimonial[] = [
  { id: "mt1", quote: "They genuinely act like our growth is their growth. That's rare in this industry.", name: "Renata Alves", role: "Publisher, Rio de Janeiro", accent: "primary" },
  { id: "mt2", quote: "The transparency alone was worth switching. We finally see what everyone else sees.", name: "Marcus Webb", role: "Publisher, Denver", accent: "secondary" },
  { id: "mt3", quote: "No pressure for quick wins — just steady, compounding revenue growth every quarter.", name: "Hannah Kim", role: "Publisher, Seattle", accent: "accent" },
  { id: "mt4", quote: "Ismael Ads treats our site's user experience as seriously as our revenue.", name: "Diego Fuentes", role: "Publisher, Guadalajara", accent: "primary" },
  { id: "mt5", quote: "Every recommendation comes with the data behind it. Nothing is ever just 'trust me.'", name: "Sofia Bianchi", role: "Publisher, Milan", accent: "secondary" },
  { id: "mt6", quote: "This felt like a long-term partnership from the very first call, not a sales pitch.", name: "Ethan Walsh", role: "Publisher, Dublin", accent: "accent" },
  { id: "mt7", quote: "Three years in, the reporting is still exactly as transparent as day one.", name: "Ana Paula Costa", role: "Publisher, Lisbon", accent: "primary" },
  { id: "mt8", quote: "They said no to a short-term tactic because it would hurt our readers. That earned trust instantly.", name: "Jason Park", role: "Publisher, Los Angeles", accent: "secondary" },
  { id: "mt9", quote: "Our fill rate and our user experience both improved. I didn't expect both at once.", name: "Clara Dubois", role: "Publisher, Paris", accent: "accent" },
  { id: "mt10", quote: "The mission isn't just marketing copy — it shows up in how they actually operate.", name: "Ravi Menon", role: "Publisher, Bengaluru", accent: "primary" },
  { id: "mt11", quote: "They explained why our RPM was low instead of just promising to fix it. That mattered.", name: "Ingrid Larsen", role: "Publisher, Oslo", accent: "secondary" },
  { id: "mt12", quote: "Working with a team this transparent changed how we think about ad partners entirely.", name: "Noah Bennett", role: "Publisher, Melbourne", accent: "accent" },
  { id: "mt13", quote: "Every publisher I've referred has had the same experience — that consistency says a lot.", name: "Valeria Torres", role: "Publisher, Monterrey", accent: "primary" },
  { id: "mt14", quote: "AI optimization sounded like a buzzword until I saw our floor prices adjust in real time.", name: "Liam O'Connor", role: "Publisher, Cork", accent: "secondary" },
  { id: "mt15", quote: "They measure their own success by our growth. I've never heard a vendor say that and mean it.", name: "Yuki Tanaka", role: "Publisher, Osaka", accent: "accent" },
  { id: "mt16", quote: "Premium demand access that used to feel out of reach became normal within months.", name: "Grace Adeyemi", role: "Publisher, Lagos", accent: "primary" },
  { id: "mt17", quote: "The partnership survived a slow quarter without a single change in how they treated us.", name: "Peter Schulz", role: "Publisher, Munich", accent: "secondary" },
  { id: "mt18", quote: "This is the first ad partner that made our long-term roadmap part of the conversation.", name: "Camille Laurent", role: "Publisher, Montreal", accent: "accent" },
];

/* ------------------------------------------------------------------ */
/* Section 11 — Mission Video                                          */
/* ------------------------------------------------------------------ */

export interface MissionVideoContent {
  kicker: string;
  kickerIcon: LucideIcon;
  title: string;
  titleEmphasis: string;
  description: string;
  duration: string;
  characterPose: CharacterPoseId;
}

export const missionVideo: MissionVideoContent = {
  kicker: "Mission Video",
  kickerIcon: Play,
  title: "The Story Behind Every Publisher Partnership",
  titleEmphasis: "Every Publisher Partnership",
  description: "A short look at why Ismael Ads exists, and what publisher-first monetization actually looks like in practice.",
  duration: "3:24",
  characterPose: "threeQuarterView",
};

/* ------------------------------------------------------------------ */
/* Section 12 — FAQ                                                    */
/* ------------------------------------------------------------------ */

export const missionFaqIntro: SectionIntro = {
  kicker: "FAQ",
  kickerIcon: Mail,
  headline: "Questions About Our Mission",
  headlineEmphasis: "Our Mission",
  subheadline: "The questions publishers ask most before partnering with us.",
};

export interface MissionFaqItem {
  question: string;
  answer: string;
}

export const missionFaqs: MissionFaqItem[] = [
  {
    question: "What does 'publisher-first' actually mean in practice?",
    answer: "It means every recommendation is measured against one question: does this help the publisher's long-term revenue and user experience? If a short-term tactic would hurt either, we don't recommend it.",
  },
  {
    question: "How is your mission different from a typical ad tech company?",
    answer: "Most ad tech companies are measured by how much revenue they extract. We're measured by how much our publishers grow — which means transparency and long-term thinking are built into the business model, not just the marketing.",
  },
  {
    question: "Why does transparency matter so much to you?",
    answer: "Because publishers can't make good decisions about their own inventory without seeing the same data we see. Hidden margins and black-box reporting break trust the moment they're discovered.",
  },
  {
    question: "How do you balance AI optimization with a personal partnership?",
    answer: "AI handles the repetitive, data-heavy work — real-time pricing, yield tuning — so more human time goes toward the strategic conversations that actually need a person.",
  },
  {
    question: "What markets does this mission apply to?",
    answer: "The same principles apply everywhere we operate — LATAM, North America and Europe — even though the specific demand partners and strategies differ by region.",
  },
  {
    question: "How can I be part of this mission as a publisher?",
    answer: "Check your eligibility or book a direct consultation. Either way, you'll be talking with someone who measures success the same way you do — by your growth.",
  },
];

/* ------------------------------------------------------------------ */
/* Section 13 — Final CTA                                              */
/* ------------------------------------------------------------------ */

export interface MissionFinalCta {
  headline: string;
  headlineEmphasis: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  characterPose: CharacterPoseId;
  trustIcon: LucideIcon;
  trustLabel: string;
}

export const missionFinalCta: MissionFinalCta = {
  headline: "Join A Mission Built Around Publisher Success",
  headlineEmphasis: "Publisher Success",
  description:
    "Let's build sustainable advertising revenue together through premium technology, transparent partnerships and long-term growth.",
  primaryCta: { label: "Check Eligibility", href: "/eligibility-checker" },
  secondaryCta: { label: "Book A Consultation", href: "/about/contact" },
  characterPose: "confidentArms",
  trustIcon: ShieldCheck,
  trustLabel: "No pressure — just an honest look at your revenue",
};

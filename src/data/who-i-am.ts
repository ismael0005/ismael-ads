import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Award,
  BrainCircuit,
  Building2,
  Coffee,
  Compass,
  Flag,
  Globe,
  Globe2,
  Handshake,
  HeartHandshake,
  History,
  Laptop,
  Layers,
  LineChart,
  Mail,
  MapPin,
  Moon,
  PhoneCall,
  PieChart,
  Presentation,
  Rocket,
  Search,
  ShieldCheck,
  Sunrise,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import type { Accent } from "@/lib/accent";
import type { CharacterPoseId } from "@/data/assets";
import type { SectionIntro } from "@/data/home";

export interface FounderHeroContent {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  description: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustRow: string[];
  characterPose: CharacterPoseId;
}

export const founderHero: FounderHeroContent = {
  kicker: "Meet The Founder",
  kickerIcon: UsersRound,
  headline: "Building Publisher Success For More Than 15 Years",
  headlineEmphasis: "15 Years",
  description: [
    "Hi, I'm Ismael Inacio.",
    "I've spent more than fifteen years working with Google AdSense, Google Ad Manager, Google AdX, and publisher monetization.",
    "My mission has always been simple: help publishers earn more without sacrificing user experience.",
  ],
  primaryCta: { label: "My Journey", href: "#my-story" },
  secondaryCta: { label: "Let's Work Together", href: "/about/contact" },
  trustRow: ["15+ Years Experience", "Google Ecosystem", "Global Publishers", "Premium Demand"],
  characterPose: "threeQuarterView",
};

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

export type FounderHeroWidget = HeroMetricWidgetDef | HeroBadgeWidgetDef;

/** Scattered around the founder portrait — fixed positions, never a sweeping orbit, so they never collide with the portrait. */
export const founderHeroWidgets: FounderHeroWidget[] = [
  { id: "gam", kind: "badge", label: "Google Ad Manager", status: "Connected", icon: Building2, accent: "primary", x: 4, y: 14, depth: 0.5, delay: 0.35 },
  { id: "revenue", kind: "metric", label: "Revenue Growth", numericValue: 285, prefix: "+", suffix: "%", icon: TrendingUp, accent: "secondary", x: 93, y: 12, depth: 0.7, delay: 0.5, compact: true },
  { id: "publishers", kind: "metric", label: "Publishers Guided", numericValue: 1000, suffix: "+", icon: UsersRound, accent: "accent", x: 3, y: 52, depth: 0.6, delay: 0.65, compact: true },
  { id: "demand", kind: "badge", label: "Premium Demand", status: "Active", icon: Globe, accent: "primary", x: 94, y: 50, depth: 0.55, delay: 0.8 },
  { id: "experience", kind: "metric", label: "Years Experience", numericValue: 15, suffix: "+", icon: Award, accent: "secondary", x: 6, y: 88, depth: 0.65, delay: 0.95, compact: true },
  { id: "support", kind: "badge", label: "Publisher Support", status: "24/7", icon: HeartHandshake, accent: "accent", x: 90, y: 86, depth: 0.5, delay: 1.1 },
];

export interface StoryChapter {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
  characterPose: CharacterPoseId;
  layout: "image-left" | "image-right";
}

export const storyIntro: SectionIntro = {
  kicker: "My Story",
  kickerIcon: History,
  headline: "Fifteen Years, One Mission",
  headlineEmphasis: "One Mission",
  subheadline: "The chapters that shaped how I work with publishers today.",
};

export const storyChapters: StoryChapter[] = [
  {
    id: "chapter-1",
    year: "2009",
    title: "Where It All Started",
    description:
      "It began with a single website and a Google AdSense account. I was obsessed with one question: why do some pages earn so much more than others? Answering it became the start of everything.",
    icon: Laptop,
    accent: "primary",
    characterPose: "frontView",
    layout: "image-left",
  },
  {
    id: "chapter-2",
    year: "2013",
    title: "Learning Publisher Monetization",
    description:
      "As Google's advertising technology matured, so did I. Google Ad Manager, real-time bidding, and yield management became my daily language — and publisher revenue stopped being a guessing game.",
    icon: LineChart,
    accent: "secondary",
    characterPose: "thinking",
    layout: "image-right",
  },
  {
    id: "chapter-3",
    year: "2017",
    title: "Going International",
    description:
      "Publishers across LATAM, North America, and Europe started asking the same questions I once had. I began working directly with international teams, learning how monetization changes across markets and currencies.",
    icon: Globe2,
    accent: "accent",
    characterPose: "confidentArms",
    layout: "image-left",
  },
  {
    id: "chapter-4",
    year: "2021",
    title: "Building Ismael Ads",
    description:
      "Everything I'd learned came together into Ismael Ads — a partner built to give publishers the same premium demand, AI optimization, and hands-on guidance that once took me years to piece together myself.",
    icon: Rocket,
    accent: "primary",
    characterPose: "celebratingGrowth",
    layout: "image-right",
  },
];

export const timelineIntro: SectionIntro = {
  kicker: "The Timeline",
  kickerIcon: Compass,
  headline: "Fifteen Years Of Growth, Mapped Out",
  headlineEmphasis: "Mapped Out",
  subheadline: "Click any milestone for the story behind it.",
};

export interface TimelineMilestone {
  id: string;
  year: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}

export const timelineMilestones: TimelineMilestone[] = [
  { id: "adsense", year: "2009", label: "Google AdSense", description: "Started managing AdSense inventory for independent publishers.", icon: Laptop, accent: "primary" },
  { id: "gam", year: "2012", label: "Google Ad Manager", description: "Moved into full Google Ad Manager implementations for larger publishers.", icon: Building2, accent: "secondary" },
  { id: "header-bidding", year: "2015", label: "Header Bidding", description: "Adopted header bidding early, well ahead of most of the industry.", icon: Layers, accent: "accent" },
  { id: "adx", year: "2017", label: "Google AdX", description: "Earned certified AdX access for publisher accounts I managed directly.", icon: ShieldCheck, accent: "primary" },
  { id: "premium-demand", year: "2019", label: "Premium Demand", description: "Built direct relationships with premium demand partners beyond Google.", icon: Globe, accent: "secondary" },
  { id: "international", year: "2021", label: "International Expansion", description: "Expanded into LATAM, North America, and Europe as Ismael Ads.", icon: Globe2, accent: "accent" },
  { id: "ai-optimization", year: "2023", label: "AI Optimization", description: "Introduced AI-driven pricing and yield optimization across every account.", icon: BrainCircuit, accent: "primary" },
];

export interface JourneyStat {
  icon: LucideIcon;
  label: string;
  accent: Accent;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  staticValue?: string;
}

export const journeyStatsIntro: SectionIntro = {
  kicker: "By The Numbers",
  kickerIcon: PieChart,
  headline: "The Numbers Behind My Journey",
  headlineEmphasis: "My Journey",
  subheadline: "Fifteen years, condensed into what actually matters.",
};

export const journeyStats: JourneyStat[] = [
  { icon: Award, label: "Years Experience", numericValue: 15, suffix: "+", accent: "primary" },
  { icon: UsersRound, label: "Publisher Consultations", numericValue: 1000, suffix: "+", accent: "secondary" },
  { icon: Activity, label: "Monthly Ad Requests Optimized", staticValue: "Millions", accent: "accent" },
  { icon: Globe2, label: "International Markets", staticValue: "Multiple", accent: "primary" },
  { icon: HeartHandshake, label: "Publisher Support", staticValue: "24/7", accent: "secondary" },
];

export const expertiseIntro: SectionIntro = {
  kicker: "My Expertise",
  kickerIcon: BrainCircuit,
  headline: "Fifteen Years Of Google Expertise, One Core",
  headlineEmphasis: "One Core",
  subheadline: "Hover any area to see how it fits into the bigger picture.",
};

export interface ExpertiseArea {
  id: string;
  label: string;
  detail: string;
  icon: LucideIcon;
  accent: Accent;
}

export const expertiseAreas: ExpertiseArea[] = [
  { id: "adsense", label: "Google AdSense", detail: "Where I started — still the foundation for how I think about publisher-first monetization.", icon: Laptop, accent: "primary" },
  { id: "gam", label: "Google Ad Manager", detail: "Full-stack GAM implementations, from ad units to line item strategy.", icon: Building2, accent: "secondary" },
  { id: "adx", label: "Google AdX", detail: "Certified AdX access and management for premium publisher accounts.", icon: ShieldCheck, accent: "accent" },
  { id: "header-bidding", label: "Header Bidding", detail: "Real-time, parallel auctions that replace slow, sequential waterfalls.", icon: Layers, accent: "primary" },
  { id: "revenue-optimization", label: "Revenue Optimization", detail: "Continuous floor pricing and placement tuning based on real auction data.", icon: TrendingUp, accent: "secondary" },
  { id: "programmatic", label: "Programmatic Advertising", detail: "Automated, data-driven buying and selling across every major exchange.", icon: LineChart, accent: "accent" },
  { id: "publisher-growth", label: "Publisher Growth", detail: "Helping publishers scale traffic and monetization together, not at odds.", icon: Rocket, accent: "primary" },
  { id: "traffic-quality", label: "Traffic Quality", detail: "Protecting long-term account health by keeping traffic clean from day one.", icon: Activity, accent: "secondary" },
  { id: "policy-compliance", label: "Policy Compliance", detail: "Keeping every account safely inside Google's publisher policies.", icon: ShieldCheck, accent: "accent" },
  { id: "ai-optimization", label: "AI Optimization", detail: "Modern machine-learning pricing layered on top of everything above.", icon: BrainCircuit, accent: "primary" },
];

export const regionsIntro: SectionIntro = {
  kicker: "Global Reach",
  kickerIcon: MapPin,
  headline: "A Publisher Network Across Three Continents",
  headlineEmphasis: "Three Continents",
  subheadline: "Different markets, the same hands-on approach.",
};

export interface Region {
  id: string;
  label: string;
  description: string;
  publisherShare: number;
  icon: LucideIcon;
  accent: Accent;
  x: number;
  y: number;
}

export const regions: Region[] = [
  { id: "latam", label: "LATAM", description: "Fast-growing digital markets with huge headroom for premium demand.", publisherShare: 38, icon: Flag, accent: "primary", x: 28, y: 62 },
  { id: "north-america", label: "North America", description: "The deepest premium demand pool and where most AdX relationships start.", publisherShare: 41, icon: Building2, accent: "secondary", x: 22, y: 30 },
  { id: "europe", label: "Europe", description: "Strict privacy rules met with equally strong CPMs for compliant publishers.", publisherShare: 21, icon: Globe, accent: "accent", x: 52, y: 26 },
];

export const dayInLifeIntro: SectionIntro = {
  kicker: "A Day In My Life",
  kickerIcon: Sunrise,
  headline: "What A Normal Working Day Looks Like",
  headlineEmphasis: "Normal Working Day",
  subheadline: "Less glamorous than it sounds — mostly dashboards, coffee, and calls.",
};

export interface DayMoment {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}

export const dayMoments: DayMoment[] = [
  { id: "coffee", time: "6:30 AM", title: "Coffee & Overnight Reports", description: "First coffee, then a scan of overnight revenue and fill rate across every account.", icon: Coffee, accent: "primary" },
  { id: "dashboards", time: "8:00 AM", title: "Google Ad Manager Review", description: "A closer look at anything that moved overnight — floors, demand, and viewability.", icon: Building2, accent: "secondary" },
  { id: "calls", time: "10:00 AM", title: "Publisher Calls", description: "Direct calls with publishers — most days, at least a few new questions worth solving.", icon: PhoneCall, accent: "accent" },
  { id: "optimization", time: "1:00 PM", title: "Optimization Work", description: "Hands-on tuning: header bidding configs, pricing rules, and AI model checks.", icon: BrainCircuit, accent: "primary" },
  { id: "reporting", time: "4:00 PM", title: "Reporting & Strategy", description: "Turning the day's data into next steps for publishers ready to scale further.", icon: LineChart, accent: "secondary" },
  { id: "wrap-up", time: "7:00 PM", title: "Evening Wrap-Up", description: "One last look at the numbers before signing off — tomorrow starts with yesterday's data.", icon: Moon, accent: "accent" },
];

export const galleryIntro: SectionIntro = {
  kicker: "Behind The Scenes",
  kickerIcon: Presentation,
  headline: "Moments From The Journey",
  headlineEmphasis: "The Journey",
  subheadline: "Conferences, publisher meetings, and a lot of screens.",
};

export interface GalleryImage {
  id: string;
  pose: CharacterPoseId;
  caption: string;
  size: "sm" | "md" | "lg";
  rotate: number;
}

export const galleryImages: GalleryImage[] = [
  { id: "g1", pose: "waving", caption: "Opening a publisher workshop", size: "md", rotate: -3 },
  { id: "g2", pose: "holdingTablet", caption: "Reviewing live dashboards on-site", size: "lg", rotate: 2 },
  { id: "g3", pose: "thumbsUp", caption: "Celebrating a publisher's best month", size: "sm", rotate: -2 },
  { id: "g4", pose: "pointingRight", caption: "Walking through a header bidding setup", size: "md", rotate: 3 },
  { id: "g5", pose: "casualStanding", caption: "Between sessions at an industry conference", size: "sm", rotate: 2 },
  { id: "g6", pose: "ctaPose", caption: "Closing a partnership meeting", size: "md", rotate: -2 },
  { id: "g7", pose: "pointingLeft", caption: "Presenting AI optimization results", size: "lg", rotate: -3 },
];

export const philosophyQuote = {
  text: "Publisher success comes before revenue. When publishers grow, everything else follows.",
  attribution: "Ismael Inacio, Founder of Ismael Ads",
};

export const trustIntro: SectionIntro = {
  kicker: "Why Publishers Trust Me",
  kickerIcon: ShieldCheck,
  headline: "Trust Isn't Given, It's Earned",
  headlineEmphasis: "It's Earned",
  subheadline: "Here's what that actually looks like, day to day.",
};

export interface TrustCard {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}

export const trustCards: TrustCard[] = [
  { id: "experience", label: "15 Years Experience", description: "Fifteen years inside Google's advertising ecosystem, not just around it.", icon: Award, accent: "primary" },
  { id: "transparent", label: "Transparent Partnerships", description: "You see the same numbers I see — no hidden margins, no black boxes.", icon: Handshake, accent: "secondary" },
  { id: "real-optimization", label: "Real Optimization", description: "Every change is tied to a measurable outcome, not a generic best practice.", icon: TrendingUp, accent: "accent" },
  { id: "long-term", label: "Long-Term Relationships", description: "Most of the publishers I started with years ago are still with me today.", icon: HeartHandshake, accent: "primary" },
  { id: "google-expertise", label: "Google Expertise", description: "Deep, current knowledge of AdSense, Ad Manager, and AdX policy and product.", icon: ShieldCheck, accent: "secondary" },
  { id: "global-markets", label: "Global Markets", description: "Hands-on experience across LATAM, North America, and European markets.", icon: Globe2, accent: "accent" },
];

export const processIntro: SectionIntro = {
  kicker: "How We Work Together",
  kickerIcon: Handshake,
  headline: "What Happens When We Work Together",
  headlineEmphasis: "Work Together",
  subheadline: "A simple, direct process — no lengthy onboarding maze.",
};

export interface ProcessStep {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}

export const processSteps: ProcessStep[] = [
  { id: "meet", label: "Meet", description: "A direct conversation about your site, traffic, and goals.", icon: Coffee, accent: "primary" },
  { id: "analyze", label: "Analyze", description: "A full review of your current setup, traffic quality, and demand.", icon: Search, accent: "secondary" },
  { id: "optimize", label: "Optimize", description: "Header bidding, pricing, and placements tuned for your inventory.", icon: Target, accent: "accent" },
  { id: "scale", label: "Scale", description: "Premium demand and AI optimization layered on as revenue grows.", icon: Rocket, accent: "primary" },
  { id: "grow", label: "Grow", description: "Ongoing partnership — revenue that keeps compounding, not plateauing.", icon: TrendingUp, accent: "secondary" },
];

export interface PersonalTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  accent: Accent;
}

export const testimonialsIntro: SectionIntro = {
  kicker: "Personal Testimonials",
  kickerIcon: HeartHandshake,
  headline: "What People Say About Working With Me",
  headlineEmphasis: "Working With Me",
  subheadline: "Real words from publishers I've worked with directly.",
};

export const personalTestimonials: PersonalTestimonial[] = [
  { id: "t1", quote: "Ismael personally walked me through our entire header bidding setup — at 11pm his time.", name: "Daniela Ruiz", role: "Publisher, Mexico City", accent: "primary" },
  { id: "t2", quote: "He explains AdX like a teacher, not a vendor. I finally understand my own account.", name: "James Whitfield", role: "Publisher, Toronto", accent: "secondary" },
  { id: "t3", quote: "Fifteen years of experience actually shows. He spots problems before I even notice them.", name: "Marta Nowak", role: "Publisher, Warsaw", accent: "accent" },
  { id: "t4", quote: "I've worked with agencies before. This is the first time it felt like a real partnership.", name: "Carlos Medina", role: "Publisher, Bogotá", accent: "primary" },
  { id: "t5", quote: "Ismael answers his own messages. That alone puts him ahead of every rep I've dealt with.", name: "Priya Nair", role: "Publisher, London", accent: "secondary" },
  { id: "t6", quote: "He didn't just fix our fill rate — he taught our team why it was broken in the first place.", name: "Tom Becker", role: "Publisher, Berlin", accent: "accent" },
  { id: "t7", quote: "Our revenue doubled, but what I remember most is how patient he was with our questions.", name: "Ana Beatriz Silva", role: "Publisher, São Paulo", accent: "primary" },
  { id: "t8", quote: "He genuinely cares whether our site experience stays good, not just whether RPM goes up.", name: "Michael Owusu", role: "Publisher, New York", accent: "secondary" },
  { id: "t9", quote: "Every call with Ismael ends with something concrete to try, not just a status update.", name: "Elena Petrova", role: "Publisher, Barcelona", accent: "accent" },
  { id: "t10", quote: "I've never met someone who knows Google Ad Manager this deeply and still explains it simply.", name: "Lucas Fernandes", role: "Publisher, Lisbon", accent: "primary" },
  { id: "t11", quote: "He remembered details about our site from a call three months earlier. That's rare.", name: "Grace Thompson", role: "Publisher, Chicago", accent: "secondary" },
  { id: "t12", quote: "Working with Ismael feels like having a senior ad ops hire, not an outside vendor.", name: "Diego Alvarez", role: "Publisher, Buenos Aires", accent: "accent" },
  { id: "t13", quote: "He's the only person who's ever made header bidding make sense to me in plain language.", name: "Sofia Castillo", role: "Publisher, Madrid", accent: "primary" },
  { id: "t14", quote: "Ismael flagged an invalid traffic issue before Google did. That saved our account.", name: "Robert Klein", role: "Publisher, Vienna", accent: "secondary" },
  { id: "t15", quote: "He's incredibly direct — if something won't work, he tells you immediately, not after a bad quarter.", name: "Fatima Rahman", role: "Publisher, Dubai", accent: "accent" },
  { id: "t16", quote: "Fifteen years in, and he still gets excited talking through a new optimization idea.", name: "Nathan Brooks", role: "Publisher, Austin", accent: "primary" },
  { id: "t17", quote: "Our AdX approval felt impossible until Ismael walked us through exactly what needed fixing.", name: "Camila Torres", role: "Publisher, Santiago", accent: "secondary" },
  { id: "t18", quote: "He treats a small publisher with the same attention as a much bigger one. That earns loyalty.", name: "Oliver Hayes", role: "Publisher, Manchester", accent: "accent" },
  { id: "t19", quote: "Ismael's advice has been consistent for years — build for the reader first. It keeps working.", name: "Isabella Rossi", role: "Publisher, Milan", accent: "primary" },
  { id: "t20", quote: "He's the rare person in this industry who under-promises and over-delivers, every time.", name: "Kevin Park", role: "Publisher, Seoul", accent: "secondary" },
  { id: "t21", quote: "Three years working together and he still reviews our dashboard personally every month.", name: "Valentina Gomez", role: "Publisher, Lima", accent: "accent" },
];

export const founderFaqIntro: SectionIntro = {
  kicker: "FAQ",
  kickerIcon: Mail,
  headline: "Questions, Answered",
  headlineEmphasis: "Answered",
  subheadline: "The questions I get asked most about working together directly.",
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const founderFaqs: FaqItem[] = [
  {
    question: "Do I work directly with you, or with a team?",
    answer: "You work directly with me. Ismael Ads is built around hands-on, personal partnerships — I review accounts and answer questions myself.",
  },
  {
    question: "Which markets do you have the most experience in?",
    answer: "LATAM, North America, and Europe — I've worked hands-on with publishers in each region for years, not just from a dashboard.",
  },
  {
    question: "How is this different from working with a typical ad agency?",
    answer: "No account handoffs, no junior reps learning on your account. Fifteen years of direct Google Ad Manager and AdX experience, applied to your site specifically.",
  },
  {
    question: "Do you work with publishers of every size?",
    answer: "Yes — from independent sites just getting started to established publishers scaling internationally. The process adjusts to your size, not the other way around.",
  },
  {
    question: "What made you start Ismael Ads?",
    answer: "After more than a decade helping publishers one at a time, I wanted to offer that same hands-on guidance at scale, backed by AI optimization and premium demand.",
  },
  {
    question: "How do I get started working with you?",
    answer: "Check your eligibility or book a direct consultation — either way, you'll hear back from me personally, not an automated system.",
  },
];

export interface FounderFinalCta {
  headline: string;
  headlineEmphasis: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  characterPose: CharacterPoseId;
  trustIcon: LucideIcon;
  trustLabel: string;
}

export const founderFinalCta: FounderFinalCta = {
  headline: "Let's Build Your Publisher Success Story Together",
  headlineEmphasis: "Publisher Success Story Together",
  subheadline: "Fifteen years of experience, applied directly to your site.",
  primaryCta: { label: "Book A Consultation", href: "/about/contact" },
  secondaryCta: { label: "Check Eligibility", href: "/eligibility-checker" },
  characterPose: "waving",
  trustIcon: ShieldCheck,
  trustLabel: "A direct conversation, no obligation",
};

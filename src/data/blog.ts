import type { LucideIcon } from "lucide-react";
import {
  Award,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Building2,
  CalendarClock,
  Database,
  Eye,
  FileBarChart,
  Filter,
  Flag,
  Gauge,
  GitCompare,
  Globe,
  GraduationCap,
  Layers,
  LineChart,
  MousePointerClick,
  Network,
  Newspaper,
  Percent,
  RefreshCw,
  Rocket,
  ScrollText,
  Search,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Tv,
  Users,
  Zap,
} from "lucide-react";

import type { Accent } from "@/lib/accent";
import type { SectionIntro } from "@/data/home";

/* ------------------------------------------------------------------ */
/* Categories                                                           */
/* ------------------------------------------------------------------ */

export type CategoryId =
  | "all"
  | "adsense"
  | "gam"
  | "adx"
  | "header-bidding"
  | "web-monetization"
  | "app-monetization"
  | "ctv"
  | "seo"
  | "ai"
  | "publisher-tips"
  | "policy-updates"
  | "case-studies"
  | "revenue-growth"
  | "programmatic";

export interface BlogCategory {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  accent: Accent;
}

export const blogCategories: BlogCategory[] = [
  { id: "all", label: "All", icon: Sparkles, accent: "primary" },
  { id: "adsense", label: "Google AdSense", icon: BookOpen, accent: "secondary" },
  { id: "gam", label: "Google Ad Manager", icon: Building2, accent: "accent" },
  { id: "adx", label: "Google AdX", icon: ShieldCheck, accent: "primary" },
  { id: "header-bidding", label: "Header Bidding", icon: Layers, accent: "secondary" },
  { id: "web-monetization", label: "Web Monetization", icon: Globe, accent: "accent" },
  { id: "app-monetization", label: "App Monetization", icon: Smartphone, accent: "primary" },
  { id: "ctv", label: "CTV", icon: Tv, accent: "secondary" },
  { id: "seo", label: "SEO", icon: Search, accent: "accent" },
  { id: "ai", label: "AI", icon: BrainCircuit, accent: "primary" },
  { id: "publisher-tips", label: "Publisher Tips", icon: Users, accent: "secondary" },
  { id: "policy-updates", label: "Policy Updates", icon: ScrollText, accent: "accent" },
  { id: "case-studies", label: "Case Studies", icon: Award, accent: "primary" },
  { id: "revenue-growth", label: "Revenue Growth", icon: TrendingUp, accent: "secondary" },
  { id: "programmatic", label: "Programmatic", icon: Network, accent: "accent" },
];

export function getCategory(id: CategoryId): BlogCategory {
  return blogCategories.find((category) => category.id === id) ?? blogCategories[0];
}

/* ------------------------------------------------------------------ */
/* Author                                                                */
/* ------------------------------------------------------------------ */

export const blogAuthor = {
  name: "Ismael Inacio",
  role: "Founder, Ismael Ads",
  initials: "II",
  bio: "15+ years helping publishers across LATAM, North America and Europe grow ad revenue through Google AdSense, Ad Manager, AdX and header bidding. Every article here comes from work inside real publisher accounts, not secondhand research.",
  href: "/about/who-i-am",
};

/* ------------------------------------------------------------------ */
/* Articles                                                              */
/* ------------------------------------------------------------------ */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: CategoryId;
  tags: string[];
  date: string;
  readingTime: number;
  coverIcon: LucideIcon;
  accent: Accent;
  seoScore?: number;
  views?: string;
  level?: "Beginner" | "Advanced";
  featured?: boolean;
  trending?: boolean;
  popular?: boolean;
  editorPick?: boolean;
  editorPickSize?: "lg" | "sm";
}

export const blogPosts: BlogPost[] = [
  {
    id: "p1",
    slug: "complete-guide-google-adsense-optimization-2026",
    title: "The Complete Guide to Google AdSense Optimization in 2026",
    excerpt:
      "Every lever that actually moves AdSense RPM this year — ad unit placement, auto ads, page experience signals and the policy changes publishers keep missing.",
    category: "adsense",
    tags: ["AdSense", "RPM", "Optimization"],
    date: "2026-06-24",
    readingTime: 14,
    coverIcon: BookOpen,
    accent: "secondary",
    seoScore: 96,
    views: "18.2k",
    featured: true,
  },
  {
    id: "p2",
    slug: "google-ad-manager-vs-adsense",
    title: "Google Ad Manager vs AdSense: Which Is Right For Your Site?",
    excerpt: "The real decision point isn't traffic size — it's how much control your inventory actually needs.",
    category: "gam",
    tags: ["Google Ad Manager", "AdSense"],
    date: "2026-06-18",
    readingTime: 13,
    coverIcon: Building2,
    accent: "accent",
    views: "9.4k",
    trending: true,
  },
  {
    id: "p3",
    slug: "how-to-get-approved-google-adx-2026",
    title: "How To Get Approved For Google AdX In 2026",
    excerpt: "What Google's certified partners actually check before approving an AdX account — and how to fix the common rejections.",
    category: "adx",
    tags: ["Google AdX", "Approval"],
    date: "2026-06-10",
    readingTime: 13,
    coverIcon: ShieldCheck,
    accent: "primary",
    views: "14.7k",
    trending: true,
    popular: true,
    level: "Beginner",
  },
  {
    id: "p4",
    slug: "header-bidding-explained-complete-guide",
    title: "Header Bidding Explained: A Publisher's Complete Guide",
    excerpt: "From waterfalls to real-time parallel auctions — how header bidding actually works, in plain language.",
    category: "header-bidding",
    tags: ["Header Bidding", "Programmatic"],
    date: "2026-05-29",
    readingTime: 14,
    coverIcon: Layers,
    accent: "secondary",
    views: "21.3k",
    popular: true,
    level: "Beginner",
    editorPick: true,
    editorPickSize: "sm",
  },
  {
    id: "p5",
    slug: "signs-website-ready-premium-demand",
    title: "5 Signs Your Website Is Ready For Premium Demand",
    excerpt: "Premium demand partners look for specific signals before they'll bid on your inventory. Here's what they check.",
    category: "revenue-growth",
    tags: ["Premium Demand", "Revenue Growth"],
    date: "2026-05-21",
    readingTime: 12,
    coverIcon: TrendingUp,
    accent: "primary",
    views: "7.1k",
    editorPick: true,
    editorPickSize: "sm",
  },
  {
    id: "p6",
    slug: "app-monetization-strategies-increase-ecpm",
    title: "App Monetization Strategies That Actually Increase eCPM",
    excerpt: "Interstitials, rewarded video and mediation waterfalls — what raises eCPM and what quietly kills retention.",
    category: "app-monetization",
    tags: ["App Monetization", "eCPM"],
    date: "2026-05-14",
    readingTime: 15,
    coverIcon: Smartphone,
    accent: "accent",
    views: "11.6k",
    popular: true,
    level: "Advanced",
  },
  {
    id: "p7",
    slug: "ctv-advertising-fastest-growing-format-2026",
    title: "CTV Advertising: The Fastest Growing Ad Format in 2026",
    excerpt: "Connected TV inventory is outpacing every other format. Here's how publishers are positioning for it.",
    category: "ctv",
    tags: ["CTV", "Streaming"],
    date: "2026-05-06",
    readingTime: 15,
    coverIcon: Tv,
    accent: "secondary",
    views: "8.9k",
    trending: true,
  },
  {
    id: "p8",
    slug: "ai-powered-yield-optimization",
    title: "AI-Powered Yield Optimization: How Machine Learning Changes Pricing",
    excerpt: "Static floor prices are obsolete. Inside the machine-learning models that reprice every auction in real time.",
    category: "ai",
    tags: ["AI", "Yield Optimization"],
    date: "2026-04-28",
    readingTime: 15,
    coverIcon: BrainCircuit,
    accent: "primary",
    seoScore: 94,
    views: "16.4k",
    editorPick: true,
    editorPickSize: "lg",
  },
  {
    id: "p9",
    slug: "technical-seo-for-publishers-checklist",
    title: "Technical SEO For Publishers: A Practical Checklist",
    excerpt: "Core Web Vitals, crawl budget and ad-load performance — the technical SEO items that also protect revenue.",
    category: "seo",
    tags: ["SEO", "Core Web Vitals"],
    date: "2026-04-19",
    readingTime: 14,
    coverIcon: Search,
    accent: "accent",
    seoScore: 92,
    views: "13.2k",
    popular: true,
    level: "Advanced",
  },
  {
    id: "p10",
    slug: "publisher-tips-improve-ux-without-losing-revenue",
    title: "10 Publisher Tips To Improve User Experience Without Losing Revenue",
    excerpt: "Ad density, load timing and layout stability — small changes that improve UX without touching RPM.",
    category: "publisher-tips",
    tags: ["Publisher Tips", "UX"],
    date: "2026-04-11",
    readingTime: 14,
    coverIcon: Users,
    accent: "secondary",
    views: "6.8k",
  },
  {
    id: "p11",
    slug: "google-policy-updates-q2-2026",
    title: "Google Policy Updates: What Changed In Q2 2026",
    excerpt: "A plain-language breakdown of this quarter's policy changes and what publishers need to update.",
    category: "policy-updates",
    tags: ["Policy", "Compliance"],
    date: "2026-06-30",
    readingTime: 15,
    coverIcon: ScrollText,
    accent: "accent",
    views: "5.3k",
  },
  {
    id: "p12",
    slug: "case-study-rpm-increase-42-percent-90-days",
    title: "Case Study: How One Publisher Increased RPM By 42% In 90 Days",
    excerpt: "The exact sequence of header bidding, floor pricing and demand changes behind a 42% RPM increase.",
    category: "case-studies",
    tags: ["Case Study", "RPM"],
    date: "2026-03-22",
    readingTime: 14,
    coverIcon: Award,
    accent: "primary",
    views: "19.5k",
    editorPick: true,
    editorPickSize: "sm",
  },
  {
    id: "p13",
    slug: "waterfall-vs-header-bidding-revenue-comparison",
    title: "Waterfall vs Header Bidding: A Revenue Comparison",
    excerpt: "Real auction data comparing sequential waterfalls against parallel header bidding auctions.",
    category: "header-bidding",
    tags: ["Header Bidding", "Waterfall"],
    date: "2026-03-15",
    readingTime: 14,
    coverIcon: LineChart,
    accent: "secondary",
    views: "10.1k",
  },
  {
    id: "p14",
    slug: "fill-rate-rpm-cpm-publisher-glossary",
    title: "Understanding Fill Rate, RPM and CPM: A Publisher's Glossary",
    excerpt: "The metrics every publisher hears constantly, explained clearly with real examples.",
    category: "publisher-tips",
    tags: ["RPM", "CPM", "Glossary"],
    date: "2026-03-04",
    readingTime: 14,
    coverIcon: Gauge,
    accent: "accent",
    views: "22.8k",
    popular: true,
    level: "Beginner",
  },
  {
    id: "p15",
    slug: "transparent-ad-partnerships-outperform-black-box",
    title: "Why Transparent Ad Partnerships Outperform Black-Box Networks",
    excerpt: "Hidden margins always cost more than they earn eventually. Here's the data behind that claim.",
    category: "revenue-growth",
    tags: ["Transparency", "Revenue Growth"],
    date: "2026-02-20",
    readingTime: 14,
    coverIcon: TrendingUp,
    accent: "primary",
    views: "8.4k",
  },
  {
    id: "p16",
    slug: "scaling-10k-to-1m-pageviews-without-breaking-monetization",
    title: "Scaling From 10K To 1M Monthly Pageviews Without Breaking Monetization",
    excerpt: "What actually breaks when traffic scales fast, and how to rebuild monetization architecture ahead of it.",
    category: "case-studies",
    tags: ["Case Study", "Scaling"],
    date: "2026-02-08",
    readingTime: 12,
    coverIcon: Rocket,
    accent: "secondary",
    views: "12.9k",
    editorPick: true,
    editorPickSize: "sm",
  },
  {
    id: "p17",
    slug: "programmatic-advertising-explained-guide-for-publishers",
    title: "Programmatic Advertising Explained: A Complete Guide For Publishers",
    excerpt: "Every programmatic term publishers hear but rarely get explained plainly — RTB, DSPs, SSPs, and how the auction actually works end to end.",
    category: "programmatic",
    tags: ["Programmatic", "RTB", "SSP"],
    date: "2026-07-04",
    readingTime: 14,
    coverIcon: Network,
    accent: "accent",
    seoScore: 95,
    views: "4.2k",
    trending: true,
  },
  {
    id: "p18",
    slug: "what-is-rpm-how-to-increase-it",
    title: "What Is RPM In Advertising, And How Publishers Can Increase It",
    excerpt: "RPM is the one number that actually tells you whether your site is monetized well. Here's how to read it and what actually moves it.",
    category: "revenue-growth",
    tags: ["RPM", "Revenue Growth"],
    date: "2026-07-01",
    readingTime: 14,
    coverIcon: Gauge,
    accent: "primary",
    views: "3.6k",
    popular: true,
    level: "Beginner",
  },
  {
    id: "p19",
    slug: "cpm-vs-cpc-vs-cpa-publisher-pricing-models",
    title: "CPM vs CPC vs CPA: Understanding Publisher Pricing Models",
    excerpt: "Three pricing models, three completely different risk profiles. Here's which one is actually paying you, and why.",
    category: "publisher-tips",
    tags: ["CPM", "Pricing Models"],
    date: "2026-06-27",
    readingTime: 15,
    coverIcon: Percent,
    accent: "secondary",
    views: "3.1k",
    level: "Beginner",
  },
  {
    id: "p20",
    slug: "improve-click-through-rate-without-hurting-ux",
    title: "How To Improve Click-Through Rate Without Hurting User Experience",
    excerpt: "Higher CTR is only worth it if it doesn't cost you the reader. The placement and design changes that lift CTR honestly.",
    category: "publisher-tips",
    tags: ["CTR", "UX"],
    date: "2026-06-23",
    readingTime: 14,
    coverIcon: MousePointerClick,
    accent: "accent",
    views: "2.8k",
  },
  {
    id: "p21",
    slug: "traffic-quality-signals-monetization",
    title: "Traffic Quality Signals That Make Or Break Your Monetization",
    excerpt: "The exact signals demand partners check before they'll pay full price for your inventory, and how to fix the ones that are quietly capping your rates.",
    category: "publisher-tips",
    tags: ["Traffic Quality", "Fraud Prevention"],
    date: "2026-06-16",
    readingTime: 15,
    coverIcon: Filter,
    accent: "primary",
    views: "4.5k",
    trending: true,
  },
  {
    id: "p22",
    slug: "google-algorithm-updates-ad-revenue-impact",
    title: "Google Algorithm Updates And What They Mean For Ad Revenue",
    excerpt: "Rankings and revenue are more connected than most publishers assume. What each type of update actually threatens.",
    category: "seo",
    tags: ["SEO", "Google Updates"],
    date: "2026-06-09",
    readingTime: 13,
    coverIcon: Search,
    accent: "secondary",
    views: "5.7k",
    popular: true,
  },
  {
    id: "p23",
    slug: "ad-viewability-explained-why-it-matters",
    title: "Ad Viewability Explained: Why It Matters More Than Raw Impressions",
    excerpt: "An impression nobody saw pays like one, until the buyer notices. Why viewability quietly sets your ceiling on CPMs.",
    category: "revenue-growth",
    tags: ["Viewability", "CPM"],
    date: "2026-06-02",
    readingTime: 15,
    coverIcon: Eye,
    accent: "accent",
    views: "2.4k",
  },
  {
    id: "p24",
    slug: "programmatic-direct-vs-open-exchange",
    title: "Programmatic Direct vs Open Exchange: Which Should Publishers Use",
    excerpt: "Two very different ways to sell the same impression. When negotiated deals beat the open auction, and when they don't.",
    category: "programmatic",
    tags: ["Programmatic", "Direct Deals"],
    date: "2026-05-26",
    readingTime: 14,
    coverIcon: GitCompare,
    accent: "primary",
    views: "2.1k",
  },
  {
    id: "p25",
    slug: "diversify-ad-demand-beyond-google",
    title: "How Publishers Can Diversify Ad Demand Beyond Google",
    excerpt: "Relying on one demand source is a single point of failure. Where the real second and third demand paths come from.",
    category: "revenue-growth",
    tags: ["Demand Partners", "Revenue Growth"],
    date: "2026-05-19",
    readingTime: 14,
    coverIcon: Globe,
    accent: "secondary",
    views: "3.9k",
  },
  {
    id: "p26",
    slug: "lazy-loading-ads-speed-vs-revenue",
    title: "Lazy Loading Ads: Balancing Page Speed And Revenue",
    excerpt: "Lazy loading can help Core Web Vitals or quietly gut your fill rate, depending entirely on how it's configured.",
    category: "seo",
    tags: ["Page Speed", "Core Web Vitals"],
    date: "2026-05-12",
    readingTime: 15,
    coverIcon: Zap,
    accent: "accent",
    views: "2.6k",
  },
  {
    id: "p27",
    slug: "first-party-data-strategies-publishers",
    title: "First-Party Data Strategies For Publishers After Third-Party Cookies",
    excerpt: "The cookie is gone. What publishers are actually building instead, and what it takes to make it valuable to buyers.",
    category: "policy-updates",
    tags: ["First-Party Data", "Privacy"],
    date: "2026-05-05",
    readingTime: 15,
    coverIcon: Database,
    accent: "primary",
    views: "4.8k",
    trending: true,
  },
  {
    id: "p28",
    slug: "ad-refresh-strategies-how-often-is-too-often",
    title: "Ad Refresh Strategies: How Often Is Too Often",
    excerpt: "Refreshing ad slots can lift RPM or trigger a policy strike depending entirely on the rules you follow. Here's where the line is.",
    category: "publisher-tips",
    tags: ["Ad Refresh", "Policy"],
    date: "2026-04-25",
    readingTime: 11,
    coverIcon: RefreshCw,
    accent: "secondary",
    views: "3.3k",
  },
  {
    id: "p29",
    slug: "mediation-vs-bidding-app-monetization",
    title: "Mediation vs Bidding In App Monetization: What's The Difference",
    excerpt: "Waterfall mediation and in-app bidding solve the same problem in opposite ways. Which one is leaving eCPM on the table.",
    category: "app-monetization",
    tags: ["App Monetization", "In-App Bidding"],
    date: "2026-04-15",
    readingTime: 15,
    coverIcon: Smartphone,
    accent: "accent",
    views: "2.9k",
  },
  {
    id: "p30",
    slug: "ctv-ad-fraud-what-publishers-need-to-know",
    title: "CTV Ad Fraud: What Publishers Need To Know",
    excerpt: "Connected TV's fastest-growing problem is the fraud riding along with its fastest-growing revenue. How to spot it before it costs you demand.",
    category: "ctv",
    tags: ["CTV", "Ad Fraud"],
    date: "2026-04-05",
    readingTime: 14,
    coverIcon: ShieldAlert,
    accent: "primary",
    views: "2.3k",
  },
  {
    id: "p31",
    slug: "seasonal-revenue-planning-for-publishers",
    title: "Seasonal Revenue Planning For Publishers",
    excerpt: "Q4 isn't luck — it's preparation. How to plan inventory, floors and demand months ahead of the seasons that actually pay.",
    category: "revenue-growth",
    tags: ["Seasonality", "Revenue Growth"],
    date: "2026-03-28",
    readingTime: 14,
    coverIcon: CalendarClock,
    accent: "secondary",
    views: "3.4k",
  },
  {
    id: "p32",
    slug: "google-ad-manager-reporting-metrics-that-matter",
    title: "Google Ad Manager Reporting: Metrics That Actually Matter",
    excerpt: "GAM's reporting UI surfaces dozens of metrics. Here are the handful that actually explain what's happening to your revenue.",
    category: "gam",
    tags: ["Google Ad Manager", "Reporting"],
    date: "2026-03-11",
    readingTime: 13,
    coverIcon: FileBarChart,
    accent: "accent",
    views: "2.7k",
  },
];

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((post) => post.featured) ?? blogPosts[0];
}

/* ------------------------------------------------------------------ */
/* Section 1 — Editorial Hero                                           */
/* ------------------------------------------------------------------ */

export interface BlogHeroContent {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustBadges: string[];
}

export const blogHero: BlogHeroContent = {
  kicker: "Publisher Knowledge Hub",
  kickerIcon: Newspaper,
  headline: "Publisher Insights & Revenue Growth",
  headlineEmphasis: "Revenue Growth",
  description:
    "Expert articles about Google AdSense, Google Ad Manager, Google AdX, Header Bidding, App Monetization, CTV Monetization, AI Optimization and publisher growth.",
  primaryCta: { label: "Explore Articles", href: "#latest-articles" },
  secondaryCta: { label: "Subscribe", href: "#newsletter" },
  trustBadges: ["15+ Years", "100+ Articles", "Global Publishers", "Google Ecosystem"],
};

/* ------------------------------------------------------------------ */
/* Section 3 — Category Explorer / Section 4 — Latest Articles          */
/* ------------------------------------------------------------------ */

export const articlesIntro: SectionIntro = {
  kicker: "Browse By Topic",
  kickerIcon: Layers,
  headline: "Every Category Publishers Actually Search For",
  headlineEmphasis: "Actually Search For",
  subheadline: "Filter by exactly what you're trying to fix right now.",
};

/* ------------------------------------------------------------------ */
/* Section 5 — Popular Guides                                           */
/* ------------------------------------------------------------------ */

export const popularGuidesIntro: SectionIntro = {
  kicker: "Popular Guides",
  kickerIcon: GraduationCap,
  headline: "The Guides Publishers Come Back To",
  headlineEmphasis: "Come Back To",
  subheadline: "Most viewed, highest ranking, and worth bookmarking.",
};

/* ------------------------------------------------------------------ */
/* Section 6 — Editor's Picks                                          */
/* ------------------------------------------------------------------ */

export const editorPicksIntro: SectionIntro = {
  kicker: "Editor's Picks",
  kickerIcon: Sparkles,
  headline: "What I'd Read First",
  headlineEmphasis: "Read First",
  subheadline: "Hand-picked, not algorithm-picked.",
};

/* ------------------------------------------------------------------ */
/* Section 7 — Revenue Learning Path                                   */
/* ------------------------------------------------------------------ */

export const learningPathIntro: SectionIntro = {
  kicker: "Revenue Learning Path",
  kickerIcon: Rocket,
  headline: "Go From Zero To Optimized Revenue, In Order",
  headlineEmphasis: "In Order",
  subheadline: "The exact sequence I walk new publishers through.",
};

export interface LearningPathStep {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
  href: string;
}

export const learningPathSteps: LearningPathStep[] = [
  { id: "start", label: "Start", description: "Understand how publisher monetization actually works.", icon: Flag, accent: "primary", href: "#latest-articles" },
  { id: "adsense", label: "Google AdSense", description: "Set the foundation with your first optimized ad units.", icon: BookOpen, accent: "secondary", href: "/blog/complete-guide-google-adsense-optimization-2026" },
  { id: "gam", label: "Google Ad Manager", description: "Move to full inventory control as traffic grows.", icon: Building2, accent: "accent", href: "/blog/google-ad-manager-vs-adsense" },
  { id: "adx", label: "Google AdX", description: "Unlock certified premium demand for your account.", icon: ShieldCheck, accent: "primary", href: "/blog/how-to-get-approved-google-adx-2026" },
  { id: "header-bidding", label: "Header Bidding", description: "Replace waterfalls with real-time parallel auctions.", icon: Layers, accent: "secondary", href: "/blog/header-bidding-explained-complete-guide" },
  { id: "ai", label: "AI Optimization", description: "Layer machine-learning pricing on top of everything.", icon: BrainCircuit, accent: "accent", href: "/blog/ai-powered-yield-optimization" },
  { id: "scale", label: "Scale Revenue", description: "Compound growth across every format and market.", icon: Rocket, accent: "primary", href: "#newsletter" },
];

/* ------------------------------------------------------------------ */
/* Section 8 — Newsletter                                              */
/* ------------------------------------------------------------------ */

export const newsletterContent = {
  kicker: "Newsletter",
  kickerIcon: Target,
  headline: "Never Miss Publisher Insights",
  headlineEmphasis: "Publisher Insights",
  description: "One email, roughly twice a month. No fluff — just what's actually changing in publisher monetization.",
};

/* ------------------------------------------------------------------ */
/* Section 9 — Related Topics                                          */
/* ------------------------------------------------------------------ */

export const relatedTopicsIntro: SectionIntro = {
  kicker: "Related Topics",
  kickerIcon: BarChart3,
  headline: "Keep Exploring What Matters To Your Revenue",
  headlineEmphasis: "Your Revenue",
  subheadline: "Every topic publishers search alongside these articles.",
};

export const relatedTopics: string[] = [
  "Google AdSense",
  "Google Ad Manager",
  "Google AdX",
  "Publisher",
  "RPM",
  "CPM",
  "Header Bidding",
  "SEO",
  "AI",
  "Apps",
  "CTV",
];

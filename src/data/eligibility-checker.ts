import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  FileCheck,
  FileText,
  Folder,
  Gamepad2,
  Gauge,
  Globe,
  Handshake,
  Layers,
  Link as LinkIcon,
  Lock,
  Mail,
  MapPin,
  Percent,
  Radar,
  Rocket,
  ScanEye,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Target,
  TrendingUp,
  Wallet,
  Wand2,
  XCircle,
} from "lucide-react";

import type { Accent } from "@/lib/accent";
import type { CharacterPoseId } from "@/data/assets";
import type { SectionIntro } from "@/data/home";

export interface EligibilityHeroContent {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const eligibilityHero: EligibilityHeroContent = {
  kicker: "AI Eligibility Checker",
  kickerIcon: BrainCircuit,
  headline: "See If Your Website Qualifies For Google AdX",
  headlineEmphasis: "Qualifies",
  description:
    "Our AI reviews your account health, recent payouts, traffic quality, content standards, and Google Ad Manager setup before onboarding.",
  primaryCta: { label: "Check Eligibility", href: "#eligibility-checker" },
  secondaryCta: { label: "View Requirements", href: "#requirements" },
};

export const eligibilityTrustBadges: string[] = ["Google Ad Manager", "Google AdX", "AI Review", "MCM Ready"];

export interface HeroChecklistItem {
  label: string;
  icon: LucideIcon;
}

export const heroScore = 89;

export const heroChecklist: HeroChecklistItem[] = [
  { label: "Approved GAM", icon: ShieldCheck },
  { label: "Traffic Quality", icon: Activity },
  { label: "Policy Safe", icon: ShieldCheck },
  { label: "Content Quality", icon: FileText },
  { label: "Payment History", icon: Wallet },
  { label: "Ads.txt", icon: FileCheck },
  { label: "HTTPS", icon: Lock },
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

export type EligibilityHeroWidget = HeroMetricWidgetDef | HeroBadgeWidgetDef;

/** Scattered around the holographic browser — fixed positions, never a sweeping orbit, so they never collide with the browser window. */
export const eligibilityHeroWidgets: EligibilityHeroWidget[] = [
  { id: "revenue", kind: "metric", label: "Revenue", numericValue: 24800, prefix: "$", icon: TrendingUp, accent: "primary", x: 4, y: 12, depth: 0.5, delay: 0.35, compact: true },
  { id: "rpm", kind: "metric", label: "RPM", numericValue: 22.4, decimals: 2, prefix: "$", icon: Gauge, accent: "secondary", x: 92, y: 10, depth: 0.7, delay: 0.5, compact: true },
  { id: "ai-analysis", kind: "badge", label: "AI Analysis", status: "Complete", icon: BrainCircuit, accent: "accent", x: 3, y: 50, depth: 0.6, delay: 0.65 },
  { id: "mcm-status", kind: "badge", label: "MCM Status", status: "Ready", icon: ShieldCheck, accent: "primary", x: 94, y: 48, depth: 0.55, delay: 0.8 },
  { id: "traffic", kind: "metric", label: "Traffic", numericValue: 1.8, decimals: 1, suffix: "M", icon: Activity, accent: "secondary", x: 6, y: 88, depth: 0.65, delay: 0.95, compact: true },
  { id: "policy", kind: "badge", label: "Policy", status: "Safe", icon: ShieldCheck, accent: "accent", x: 90, y: 86, depth: 0.5, delay: 1.1 },
];

export const timelineIntro: SectionIntro = {
  kicker: "How It Works",
  kickerIcon: Radar,
  headline: "From Submission To Optimization",
  headlineEmphasis: "To Optimization",
  subheadline: "Five steps, one continuous AI-guided review.",
};

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}

export const timelineSteps: TimelineStep[] = [
  { id: "submit", title: "Submit Website", description: "Share your site and Google Ad Manager details.", icon: Send, accent: "primary" },
  { id: "ai-review", title: "AI Reviews Account", description: "Our engine scans traffic, content, and policy signals.", icon: BrainCircuit, accent: "secondary" },
  { id: "manual", title: "Manual Verification", description: "A specialist confirms the AI's findings by hand.", icon: Search, accent: "accent" },
  { id: "mcm", title: "MCM Invitation", description: "Approved publishers receive a Multiple Customer Management invite.", icon: Mail, accent: "primary" },
  { id: "optimize", title: "Optimization Begins", description: "Header bidding and AI pricing go live on your inventory.", icon: Rocket, accent: "secondary" },
];

export const checkerIntro: SectionIntro = {
  kicker: "Try It Now",
  kickerIcon: ScanEye,
  headline: "Check Your Eligibility Instantly",
  headlineEmphasis: "Instantly",
  subheadline: "The detailed check — payout history, traffic quality, content and policy — scored the way a real review would.",
};

export type ScoreStatus = "pass" | "warn" | "fail";

export interface ScoreOption {
  id: string;
  label: string;
  points: number;
}

export const payoutOptions: ScoreOption[] = [
  { id: "under-100", label: "Under $100", points: 5 },
  { id: "100-249", label: "$100 – $249", points: 10 },
  { id: "250-999", label: "$250 – $999", points: 16 },
  { id: "1000-plus", label: "$1,000+", points: 20 },
];

export const gamStatusOptions: ScoreOption[] = [
  { id: "approved", label: "Approved", points: 35 },
  { id: "pending", label: "Pending Approval", points: 15 },
  { id: "none", label: "Not Set Up", points: 0 },
];

export const trafficQualityOptions: ScoreOption[] = [
  { id: "organic", label: "Mostly Organic / Direct", points: 20 },
  { id: "mixed", label: "Mixed Sources", points: 12 },
  { id: "paid", label: "Mostly Paid / Social", points: 6 },
  { id: "bot-heavy", label: "Bot-Heavy / Incentivized", points: 0 },
];

export const contentTypeOptions: ScoreOption[] = [
  { id: "original", label: "Original Content", points: 15 },
  { id: "mixed", label: "Original + Curated Mix", points: 9 },
  { id: "curated", label: "Mostly Curated", points: 4 },
  { id: "ai-thin", label: "AI-Generated / Thin", points: 0 },
];

export const countryTierOptions: ScoreOption[] = [
  { id: "tier1", label: "US, UK, Canada, Australia", points: 10 },
  { id: "tier2", label: "Europe & Other Western Markets", points: 6 },
  { id: "tier3", label: "Rest Of World", points: 3 },
];

export const scoreMax =
  gamStatusOptions[0].points + payoutOptions[3].points + trafficQualityOptions[0].points + contentTypeOptions[0].points + countryTierOptions[0].points;

export function getScoreStatus(score: number): { label: string; status: ScoreStatus } {
  if (score >= 80) return { label: "Ready", status: "pass" };
  if (score >= 50) return { label: "Almost Ready", status: "warn" };
  return { label: "Needs Improvement", status: "fail" };
}

export const requirementsIntro: SectionIntro = {
  kicker: "Requirements",
  kickerIcon: ShieldCheck,
  headline: "What It Takes To Get Approved",
  headlineEmphasis: "Get Approved",
  subheadline: "Eight signals feed the AI core — click any node for the full detail.",
};

export interface RequirementNode {
  id: string;
  label: string;
  detail: string;
  icon: LucideIcon;
  accent: Accent;
}

export const requirementNodes: RequirementNode[] = [
  {
    id: "gam-approved",
    label: "Approved GAM Account",
    detail: "Your Google Ad Manager account must be fully approved, not just created — pending or restricted accounts can't be onboarded yet.",
    icon: ShieldCheck,
    accent: "primary",
  },
  {
    id: "min-payout",
    label: "$250+ Payouts (Last 3 Months)",
    detail: "We look for at least $250 in Google payouts across the last three months as a sign of consistent, monetizable traffic.",
    icon: Wallet,
    accent: "secondary",
  },
  {
    id: "original-content",
    label: "Original Content",
    detail: "Your site should publish content you created or have rights to — not scraped, spun, or mass-produced AI text.",
    icon: FileText,
    accent: "accent",
  },
  {
    id: "clean-traffic",
    label: "Clean Traffic",
    detail: "Traffic should come from real visitors through organic, direct, or legitimate referral sources — not incentivized or bot traffic.",
    icon: Activity,
    accent: "primary",
  },
  {
    id: "policy-safe",
    label: "Policy Safe",
    detail: "No content that violates Google's publisher policies — no adult, violent, counterfeit, or otherwise restricted material.",
    icon: ShieldAlert,
    accent: "secondary",
  },
  {
    id: "https",
    label: "HTTPS",
    detail: "Your entire site must be served over HTTPS with a valid certificate — no mixed content or insecure pages.",
    icon: Lock,
    accent: "accent",
  },
  {
    id: "ads-txt",
    label: "Updated ads.txt",
    detail: "An accurate, up-to-date ads.txt file authorizing your sellers is required before any demand can bid on your inventory.",
    icon: FileCheck,
    accent: "primary",
  },
  {
    id: "reviewable",
    label: "Reviewable Website",
    detail: "Your site needs to be publicly reachable, free of construction placeholders, and stable enough for a full manual review.",
    icon: Globe,
    accent: "secondary",
  },
];

export interface EligibilityListItem {
  label: string;
  icon: LucideIcon;
}

export const whoCanJoinIntro: SectionIntro = {
  kicker: "Who Can Join",
  kickerIcon: Handshake,
  headline: "Built For Publishers Who Play It Straight",
  headlineEmphasis: "Play It Straight",
  subheadline: "A quick read on who typically gets approved — and who doesn't, yet.",
};

export const eligibleItems: EligibilityListItem[] = [
  { label: "Approved Google Ad Manager account", icon: ShieldCheck },
  { label: "Recent, consistent Google payouts", icon: Wallet },
  { label: "Original content", icon: FileText },
  { label: "Low invalid traffic (IVT)", icon: Activity },
  { label: "Policy compliant", icon: ShieldCheck },
  { label: "Served entirely over HTTPS", icon: Lock },
];

export const notEligibleItems: EligibilityListItem[] = [
  { label: "Freshly created account", icon: Clock },
  { label: "Pending GAM approval", icon: XCircle },
  { label: "Duplicate account", icon: Copy },
  { label: "High invalid traffic (IVT)", icon: ShieldX },
  { label: "Bot or incentivized traffic", icon: Bot },
  { label: "Mirror or copycat sites", icon: Layers },
  { label: "Thin or minimal content", icon: FileText },
  { label: "AI-generated, low-value sites", icon: Wand2 },
  { label: "HTML5 gaming portals", icon: Gamepad2 },
];

export const simulationIntro: SectionIntro = {
  kicker: "Live Simulation",
  kickerIcon: Radar,
  headline: "Watch Ismael Ads Review Your Site",
  headlineEmphasis: "Review Your Site",
  subheadline: "The exact sequence our AI runs the moment you submit your URL.",
};

export interface ScanStep {
  id: string;
  label: string;
  result: string;
  icon: LucideIcon;
}

export const scanSteps: ScanStep[] = [
  { id: "website", label: "Website Scanned", result: "HTTPS verified · ads.txt found", icon: Globe },
  { id: "traffic", label: "Traffic Analyzed", result: "94% organic & direct", icon: Activity },
  { id: "content", label: "Content Scanned", result: "Original content detected", icon: FileText },
  { id: "policy", label: "Policy Scanned", result: "0 policy violations found", icon: ShieldCheck },
  { id: "revenue", label: "Revenue Verified", result: "$1,240 in the last 90 days", icon: Wallet },
  { id: "mcm", label: "MCM Readiness", result: "Eligible for MCM invitation", icon: CheckCircle2 },
];

export const documentsIntro: SectionIntro = {
  kicker: "Documents You'll Need",
  kickerIcon: Folder,
  headline: "Have These Ready Before You Apply",
  headlineEmphasis: "Before You Apply",
  subheadline: "Nothing exotic — just what any serious review needs to verify.",
};

export interface DocumentItem {
  id: string;
  label: string;
  detail: string;
  icon: LucideIcon;
  accent: Accent;
}

export const documentItems: DocumentItem[] = [
  { id: "network-code", label: "GAM Network Code", detail: "Your Google Ad Manager network code so we can confirm account standing.", icon: CreditCard, accent: "primary" },
  { id: "website-url", label: "Website URL", detail: "The exact domain you want reviewed for AdX access.", icon: LinkIcon, accent: "secondary" },
  { id: "contact-details", label: "Contact Details", detail: "A direct contact for verification and onboarding updates.", icon: Mail, accent: "accent" },
  { id: "payment-history", label: "Recent Payment History", detail: "Your last 3 months of Google payout records.", icon: Wallet, accent: "primary" },
  { id: "traffic-sources", label: "Traffic Sources", detail: "A breakdown of where your visitors come from.", icon: MapPin, accent: "secondary" },
  { id: "ads-txt", label: "Ads.txt", detail: "Your current ads.txt file, ready to be updated with our sellers.", icon: FileCheck, accent: "accent" },
  { id: "privacy-policy", label: "Privacy Policy", detail: "A published privacy policy covering ads and data use.", icon: FileText, accent: "primary" },
];

export const calculatorIntro: SectionIntro = {
  kicker: "Qualification Score",
  kickerIcon: Percent,
  headline: "Calculate Your Approval Odds",
  headlineEmphasis: "Approval Odds",
  subheadline: "A 10-second gut-check, not a substitute for the detailed score above — move the sliders to estimate where you stand right now.",
};

export interface CalculatorFactor {
  id: string;
  label: string;
  icon: LucideIcon;
  defaultValue: number;
}

export const calculatorFactors: CalculatorFactor[] = [
  { id: "revenue", label: "Revenue", icon: TrendingUp, defaultValue: 60 },
  { id: "traffic", label: "Traffic", icon: Activity, defaultValue: 60 },
  { id: "payouts", label: "Google Payouts", icon: Wallet, defaultValue: 50 },
  { id: "policy", label: "Policy", icon: ShieldCheck, defaultValue: 70 },
  { id: "content", label: "Content", icon: FileText, defaultValue: 65 },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const eligibilityFaqIntro: SectionIntro = {
  kicker: "FAQ",
  kickerIcon: Target,
  headline: "Questions, Answered",
  headlineEmphasis: "Answered",
  subheadline: "Everything publishers ask before starting the review.",
};

export const eligibilityFaqs: FaqItem[] = [
  {
    question: "What counts as a recent Google payout?",
    answer: "We look at Google Ad Manager or AdSense payouts from the last three months — consistent payouts of $250 or more in that window is a strong signal.",
  },
  {
    question: "Can I apply if my GAM account is still pending?",
    answer: "Yes, but approval typically waits until Google finishes reviewing your account — a pending status counts toward your score but caps how ready you are.",
  },
  {
    question: "Do you accept newly launched websites?",
    answer: "Brand new sites usually don't have the traffic or payout history we look for yet. We recommend applying once you have a few months of consistent traffic.",
  },
  {
    question: "Is HTML5 gaming content accepted?",
    answer: "Not currently — HTML5 gaming portals fall outside the inventory types we're able to onboard under our current demand agreements.",
  },
  {
    question: "How long does the AI and manual review take?",
    answer: "The AI review is instant. Manual verification typically finishes within 48 hours, with MCM invitations following shortly after approval.",
  },
  {
    question: "What is MCM and do I need it before applying?",
    answer: "Multiple Customer Management (MCM) links your Google Ad Manager account to ours. You don't need it to apply — we send an invite once you're approved.",
  },
];

export interface EligibilityFinalCta {
  headline: string;
  headlineEmphasis: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  characterPose: CharacterPoseId;
  trustIcon: LucideIcon;
  trustLabel: string;
}

export const eligibilityFinalCta: EligibilityFinalCta = {
  headline: "Ready To Unlock Premium Google AdX Revenue?",
  headlineEmphasis: "Google AdX Revenue?",
  subheadline: "Already ran the check above? Let's talk through your results and next steps.",
  primaryCta: { label: "Book A Consultation", href: "/about/contact" },
  secondaryCta: { label: "Re-Check My Score", href: "#eligibility-checker" },
  characterPose: "pointingLeft",
  trustIcon: ShieldCheck,
  trustLabel: "No commitment required to check eligibility",
};

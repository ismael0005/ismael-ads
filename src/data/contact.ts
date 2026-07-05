import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Calendar,
  Flag,
  Globe,
  Globe2,
  HeartHandshake,
  Layers,
  LayoutDashboard,
  LineChart,
  Mail,
  MapPin,
  MessageCircle,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import type { Accent } from "@/lib/accent";
import type { CharacterPoseId } from "@/data/assets";
import type { SectionIntro } from "@/data/home";

/* ------------------------------------------------------------------ */
/* Contact information                                                  */
/* ------------------------------------------------------------------ */

export const contactInfo = {
  founder: "Ismael Inacio",
  email: "publisher@ismaelads.com",
  whatsappDisplay: "+55 84 99166-3869",
  whatsappHref: "https://wa.me/5584991663869",
  linkedin: "https://www.linkedin.com/in/ismaelinacio/",
  markets: ["LATAM", "North America", "Europe"],
};

/* ------------------------------------------------------------------ */
/* Section 1 — Contact Hero                                            */
/* ------------------------------------------------------------------ */

export interface ContactHeroContent {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustBadges: string[];
}

export const contactHero: ContactHeroContent = {
  kicker: "Contact Ismael Ads",
  kickerIcon: MessageCircle,
  headline: "Let's Build Your Revenue Growth Together",
  headlineEmphasis: "Revenue Growth",
  description:
    "Whether you're looking to increase RPM, unlock premium Google AdX demand, optimize your inventory or simply explore your monetization opportunities, I'm here to help.",
  primaryCta: { label: "Start Conversation", href: "#send-a-message" },
  secondaryCta: { label: "Check Eligibility", href: "/eligibility-checker" },
  trustBadges: ["15+ Years", "Global Publishers", "Premium Demand", "Google Ecosystem"],
};

export interface ChatMessage {
  id: string;
  from: "them" | "me";
  text: string;
}

export const heroChatMessages: ChatMessage[] = [
  { id: "m1", from: "them", text: "Hi Ismael, can you review my website?" },
  {
    id: "m2",
    from: "me",
    text: "Absolutely! Send me your website URL and I'll personally review your monetization opportunities.",
  },
];

export interface ContactHeroWidget {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: Accent;
  x: number;
  y: number;
  delay: number;
}

/** Fixed, non-orbiting positions around the phone — generous spacing so widgets never collide with the tall phone bezel. */
export const contactHeroWidgets: ContactHeroWidget[] = [
  { id: "gam", label: "Google Ad Manager", icon: Building2, accent: "primary", x: 4, y: 16, delay: 0.3 },
  { id: "adx", label: "Google AdX", icon: ShieldCheck, accent: "secondary", x: 94, y: 14, delay: 0.45 },
  { id: "dashboard", label: "Publisher Dashboard", icon: LayoutDashboard, accent: "accent", x: 2, y: 50, delay: 0.6 },
  { id: "revenue", label: "Revenue Chart", icon: LineChart, accent: "primary", x: 96, y: 48, delay: 0.75 },
  { id: "rpm", label: "RPM", icon: TrendingUp, accent: "secondary", x: 6, y: 84, delay: 0.9 },
  { id: "fill-rate", label: "Fill Rate", icon: Layers, accent: "accent", x: 92, y: 82, delay: 1.05 },
];

/* ------------------------------------------------------------------ */
/* Section 2 — Communication portals                                   */
/* ------------------------------------------------------------------ */

export const portalsIntro: SectionIntro = {
  kicker: "Pick Your Channel",
  kickerIcon: Sparkles,
  headline: "Choose How You Want To Connect",
  headlineEmphasis: "Connect",
  subheadline: "Every channel opens directly to me — no ticket queue, no chatbot.",
};

export type PortalType = "whatsapp" | "email" | "linkedin" | "calendar";

export interface CommunicationPortal {
  id: string;
  type: PortalType;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
  href: string;
  ctaLabel: string;
}

export const communicationPortals: CommunicationPortal[] = [
  {
    id: "whatsapp",
    type: "whatsapp",
    label: "WhatsApp",
    description: "The fastest way to reach me directly.",
    icon: MessageCircle,
    accent: "primary",
    href: contactInfo.whatsappHref,
    ctaLabel: "Open Chat",
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    description: "For detailed questions or sharing documents.",
    icon: Mail,
    accent: "secondary",
    href: `mailto:${contactInfo.email}`,
    ctaLabel: "Send Email",
  },
  {
    id: "linkedin",
    type: "linkedin",
    label: "LinkedIn",
    description: "Connect with me professionally first.",
    icon: UsersRound,
    accent: "accent",
    href: contactInfo.linkedin,
    ctaLabel: "View Profile",
  },
  {
    id: "calendar",
    type: "calendar",
    label: "Book Consultation",
    description: "Grab a slot on my calendar directly.",
    icon: Calendar,
    accent: "primary",
    href: contactInfo.whatsappHref,
    ctaLabel: "Book A Call",
  },
];

/* ------------------------------------------------------------------ */
/* Section 3 — Send A Message                                          */
/* ------------------------------------------------------------------ */

export const formIntro: SectionIntro = {
  kicker: "Send A Message",
  kickerIcon: Send,
  headline: "Tell Me About Your Website",
  headlineEmphasis: "Your Website",
  subheadline: "The more detail you share, the faster I can bring real recommendations.",
};

export const monthlyRevenueOptions = ["Under $1,000", "$1,000 – $10,000", "$10,000 – $50,000", "$50,000+"];

export const gamOptions = [
  "Yes, already using Google Ad Manager",
  "Not yet, but interested",
  "Not sure",
];

/* ------------------------------------------------------------------ */
/* Section 4 — Meet Ismael                                              */
/* ------------------------------------------------------------------ */

export interface MeetIsmaelContent {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  bio: string[];
  chips: string[];
  characterPose: CharacterPoseId;
}

export const meetIsmael: MeetIsmaelContent = {
  kicker: "Meet Ismael",
  kickerIcon: UsersRound,
  headline: "The Person You'll Actually Be Talking To",
  headlineEmphasis: "Actually Be Talking To",
  bio: [
    "I'm Ismael Inacio, founder of Ismael Ads. For more than fifteen years I've helped publishers grow revenue through Google AdSense, Google Ad Manager, Google AdX and header bidding.",
    "Every message that comes through this page reaches me personally — not a support queue. I work hands-on with publishers across LATAM, North America and Europe.",
  ],
  chips: ["LATAM", "North America", "Europe", "Premium Demand", "Google AdX", "Header Bidding", "AI Optimization"],
  characterPose: "casualStanding",
};

/* ------------------------------------------------------------------ */
/* Section 5 — What Happens Next                                       */
/* ------------------------------------------------------------------ */

export const nextStepsIntro: SectionIntro = {
  kicker: "What Happens Next",
  kickerIcon: Rocket,
  headline: "From First Message To Real Growth",
  headlineEmphasis: "Real Growth",
  subheadline: "A simple, direct process — every step handled personally.",
};

export interface NextStep {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}

export const nextSteps: NextStep[] = [
  { id: "sent", label: "Message Sent", description: "Your message reaches me directly, not a support queue.", icon: Send, accent: "primary" },
  { id: "review", label: "Review", description: "I personally review your site, traffic and current setup.", icon: Search, accent: "secondary" },
  { id: "call", label: "Discovery Call", description: "A direct conversation about your goals and opportunities.", icon: MessageCircle, accent: "accent" },
  { id: "strategy", label: "Strategy", description: "A monetization plan built around your specific inventory.", icon: Target, accent: "primary" },
  { id: "growth", label: "Growth", description: "Ongoing optimization as your revenue compounds.", icon: TrendingUp, accent: "secondary" },
];

/* ------------------------------------------------------------------ */
/* Section 6 — Global Availability                                     */
/* ------------------------------------------------------------------ */

export const globalIntro: SectionIntro = {
  kicker: "Global Availability",
  kickerIcon: Globe,
  headline: "Working Hands-On Across Three Continents",
  headlineEmphasis: "Three Continents",
  subheadline: "Based in Brazil, working with publishers everywhere that matters.",
};

export interface GlobalNode {
  id: string;
  label: string;
  stat: string;
  icon: LucideIcon;
  accent: Accent;
  x: number;
  y: number;
  isHome?: boolean;
}

export const globalNodes: GlobalNode[] = [
  { id: "brazil", label: "Brazil", stat: "Home Base", icon: Flag, accent: "primary", x: 24, y: 74, isHome: true },
  { id: "latam", label: "LATAM", stat: "38% of network", icon: MapPin, accent: "primary", x: 14, y: 46 },
  { id: "north-america", label: "North America", stat: "41% of network", icon: Building2, accent: "secondary", x: 50, y: 20 },
  { id: "europe", label: "Europe", stat: "21% of network", icon: Globe2, accent: "accent", x: 84, y: 42 },
];

export interface GlobalCounter {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  accent: Accent;
}

export const globalCounters: GlobalCounter[] = [
  { id: "countries", label: "Countries", value: "20+", icon: Globe2, accent: "primary" },
  { id: "publishers", label: "Publishers", value: "500+", icon: UsersRound, accent: "secondary" },
  { id: "support", label: "Support", value: "24/7", icon: HeartHandshake, accent: "accent" },
];

/* ------------------------------------------------------------------ */
/* Section 7 — FAQ                                                     */
/* ------------------------------------------------------------------ */

export const contactFaqIntro: SectionIntro = {
  kicker: "FAQ",
  kickerIcon: Mail,
  headline: "Questions Before You Reach Out",
  headlineEmphasis: "Before You Reach Out",
  subheadline: "The things publishers usually ask before their first message.",
};

export interface ContactFaqItem {
  question: string;
  answer: string;
}

export const contactFaqs: ContactFaqItem[] = [
  {
    question: "How quickly do you reply?",
    answer: "Usually within a few hours, often faster on WhatsApp. Every message reaches me personally, not a support queue.",
  },
  {
    question: "Do you review websites for free?",
    answer: "Yes. Send me your website URL and I'll personally review your current monetization setup before we talk about anything else.",
  },
  {
    question: "Which countries do you support?",
    answer: "I work hands-on with publishers across LATAM, North America and Europe, with deep experience in each region's demand landscape.",
  },
  {
    question: "Do you help with Google Ad Manager?",
    answer: "Yes — full-stack Google Ad Manager implementation, from ad units to line item strategy, is one of my core areas of expertise.",
  },
  {
    question: "Can I schedule a meeting?",
    answer: "Absolutely. Use the Book Consultation option above, or just message me directly and we'll find a time that works.",
  },
  {
    question: "What information should I prepare?",
    answer: "Your website URL, approximate monthly traffic and current monetization setup are enough to get started — I'll ask for anything else I need.",
  },
];

/* ------------------------------------------------------------------ */
/* Section 8 — Floating Testimonials                                   */
/* ------------------------------------------------------------------ */

export interface BubbleTestimonial {
  id: string;
  text: string;
  size: "sm" | "md" | "lg";
  x: number;
  y: number;
  accent: Accent;
  duration: number;
  delay: number;
}

export const bubbleTestimonialsIntro: SectionIntro = {
  kicker: "Publisher Feedback",
  kickerIcon: HeartHandshake,
  headline: "What Publishers Say After Reaching Out",
  headlineEmphasis: "Reaching Out",
  subheadline: "Real replies, not staged reviews.",
};

export const bubbleTestimonials: BubbleTestimonial[] = [
  { id: "b1", text: "Thanks Ismael, our RPM increased 42%.", size: "lg", x: 14, y: 18, accent: "primary", duration: 7, delay: 0 },
  { id: "b2", text: "Fast support.", size: "sm", x: 78, y: 12, accent: "secondary", duration: 6, delay: 0.6 },
  { id: "b3", text: "Best Google AdX onboarding experience.", size: "md", x: 50, y: 8, accent: "accent", duration: 8, delay: 0.3 },
  { id: "b4", text: "He replied on a Sunday. Who does that?", size: "sm", x: 6, y: 40, accent: "secondary", duration: 6.5, delay: 1 },
  { id: "b5", text: "Our fill rate finally makes sense.", size: "md", x: 86, y: 48, accent: "primary", duration: 7.5, delay: 0.5 },
  { id: "b6", text: "Onboarding took two days, not two months.", size: "lg", x: 26, y: 60, accent: "accent", duration: 9, delay: 0.8 },
  { id: "b7", text: "Straight answers, every time.", size: "sm", x: 58, y: 68, accent: "primary", duration: 6, delay: 1.2 },
  { id: "b8", text: "Header bidding finally set up correctly.", size: "md", x: 12, y: 90, accent: "secondary", duration: 7, delay: 0.9 },
  { id: "b9", text: "Felt like talking to a real person, not a vendor.", size: "md", x: 78, y: 92, accent: "accent", duration: 8.5, delay: 0.4 },
];

/* ------------------------------------------------------------------ */
/* Section 9 — Final CTA                                                */
/* ------------------------------------------------------------------ */

export interface ContactFinalCta {
  headline: string;
  headlineEmphasis: string;
  subheadline: string;
  whatsappLabel: string;
  emailLabel: string;
  linkedinLabel: string;
  characterPose: CharacterPoseId;
}

export const contactFinalCta: ContactFinalCta = {
  headline: "Ready To Start The Conversation?",
  headlineEmphasis: "Start The Conversation",
  subheadline: "Pick whichever channel feels most natural — I'll be the one replying.",
  whatsappLabel: "Message On WhatsApp",
  emailLabel: "Send Email",
  linkedinLabel: "LinkedIn Profile",
  characterPose: "waving",
};

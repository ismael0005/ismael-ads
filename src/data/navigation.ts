export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Web Monetization",
        href: "/solutions/web-monetization",
        description: "Maximize ad revenue on your website.",
      },
      {
        label: "App Monetization",
        href: "/solutions/app-monetization",
        description: "Turn app inventory into revenue.",
      },
      {
        label: "CTV Monetization",
        href: "/solutions/ctv-monetization",
        description: "Monetize connected TV audiences.",
      },
    ],
  },
  { label: "Ad Formats", href: "/ad-formats" },
  { label: "Eligibility Checker", href: "/eligibility-checker" },
  { label: "Blog", href: "/blog" },
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "Who I Am",
        href: "/about/who-i-am",
        description: "Meet the founder behind Ismael Ads.",
      },
      {
        label: "My Mission",
        href: "/about/my-mission",
        description: "Why Ismael Ads exists.",
      },
      {
        label: "Contact Me",
        href: "/about/contact",
        description: "Get in touch directly.",
      },
    ],
  },
];

export interface FooterLink {
  label: string;
  href: string;
}

export const footerQuickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Eligibility Checker", href: "/eligibility-checker" },
  { label: "Blog", href: "/blog" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contact Us", href: "/about/contact" },
];

export const footerSolutionsLinks: FooterLink[] = [
  { label: "Web Monetization", href: "/solutions/web-monetization" },
  { label: "App Monetization", href: "/solutions/app-monetization" },
  { label: "CTV Monetization", href: "/solutions/ctv-monetization" },
  { label: "Ad Formats", href: "/ad-formats" },
];

export const footerLegalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-of-service" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "Contact", href: "/about/contact" },
];

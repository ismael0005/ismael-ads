import { siteConfig } from "@/lib/site-config";
import { contactInfo } from "@/data/contact";

export const ORG_ID = `${siteConfig.url}/#organization`;
export const PERSON_ID = `${siteConfig.url}/#ismael-inacio`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Reference an already-emitted entity (e.g. Person/Organization from the root layout) by @id instead of duplicating the full node on every page. */
export function ref(id: string) {
  return { "@id": id };
}

/** Only real, actually-linked profile URLs belong here — schema.org `sameAs` claims identity, so it must not include unused placeholder socials. */
const SAME_AS = [contactInfo.linkedin];

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/logos/logo-icon.png`,
    description: siteConfig.description,
    email: contactInfo.email,
    sameAs: SAME_AS,
    founder: { "@id": PERSON_ID },
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: contactInfo.founder,
    jobTitle: "Founder",
    description:
      "Founder of Ismael Ads with 15+ years helping publishers across LATAM, North America, and Europe grow ad revenue through Google AdSense, Ad Manager, AdX, and header bidding.",
    worksFor: { "@id": ORG_ID },
    url: `${siteConfig.url}/about/who-i-am`,
    image: `${siteConfig.url}/assets/characters/34-view.png`,
    sameAs: SAME_AS,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
  imagePath?: string;
}

export function articleSchema({ title, description, path, datePublished, dateModified, tags, imagePath }: ArticleSchemaInput) {
  return {
    "@type": "BlogPosting",
    "@id": `${siteConfig.url}${path}/#article`,
    headline: title,
    description,
    url: `${siteConfig.url}${path}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    ...(imagePath && { image: `${siteConfig.url}${imagePath}` }),
    ...(tags?.length && { keywords: tags.join(", ") }),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${path}` },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** Wraps one or more schema nodes in a single `@graph` — use one `<script>` tag per page, not one per schema type. */
export function jsonLdGraph(...nodes: Array<Record<string, unknown> | null | undefined>) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}

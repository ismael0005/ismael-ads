import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

interface PageSeoInput {
  /** Page title — rendered through the root layout's `%s | Ismael Ads` template. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/solutions/web-monetization". */
  path: string;
  /** Open Graph type — "article" for blog posts, "website" for everything else. */
  type?: "website" | "article";
  /** Article-only fields, used when type is "article". */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    authorName: string;
    tags?: string[];
  };
  /** Set to disable indexing (placeholder/thin-content pages). */
  noindex?: boolean;
  /** Skip the root layout's `%s | Ismael Ads` title template — for the homepage, which is the brand root. */
  absoluteTitle?: boolean;
}

/**
 * Builds the full Metadata object (title, description, canonical, Open Graph,
 * Twitter Card) for a single page. Every real page on the site should call
 * this instead of hand-rolling `export const metadata` — it's the single
 * place that keeps canonical URLs, OG type, and Twitter card settings
 * consistent across ~25 routes.
 */
export function buildPageMetadata({ title, description, path, type = "website", article, noindex, absoluteTitle }: PageSeoInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    ...(noindex && {
      robots: { index: false, follow: true },
    }),
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: "en_US",
      ...(type === "article" &&
        article && {
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime ?? article.publishedTime,
          authors: [article.authorName],
          tags: article.tags,
        }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

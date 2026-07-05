import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { blogPosts } from "@/data/blog";

/** Placeholder shells (dashboard, about hub, solutions hub) are intentionally omitted — they're noindex'd until real content ships. */
const STATIC_PAGES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/solutions/web-monetization", changeFrequency: "monthly", priority: 0.9 },
  { path: "/solutions/app-monetization", changeFrequency: "monthly", priority: 0.9 },
  { path: "/solutions/ctv-monetization", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ad-formats", changeFrequency: "monthly", priority: 0.9 },
  { path: "/eligibility-checker", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/about/who-i-am", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about/my-mission", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about/contact", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}

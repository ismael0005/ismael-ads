import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph, ORG_ID, ref } from "@/lib/json-ld";
import { blogPosts } from "@/data/blog";
import { BlogBackground } from "@/components/blog-background";
import { BlogHero } from "@/components/sections/blog/hero";
import { BlogFeaturedStorySection } from "@/components/sections/blog/featured-story";
import { BlogArticlesExplorerSection } from "@/components/sections/blog/articles-explorer";
import { BlogPopularGuidesSection } from "@/components/sections/blog/popular-guides";
import { BlogEditorsPicksSection } from "@/components/sections/blog/editors-picks";
import { BlogLearningPathSection } from "@/components/sections/blog/learning-path";
import { BlogNewsletterSection } from "@/components/sections/blog/newsletter";
import { BlogRelatedTopicsSection } from "@/components/sections/blog/related-topics";
import { JsonLdScript } from "@/components/common/json-ld-script";

const PAGE_TITLE = "Blog — Publisher Insights & Revenue Growth";
const PAGE_DESCRIPTION =
  "Expert articles about Google AdSense, Google Ad Manager, Google AdX, Header Bidding, App Monetization, CTV Monetization and AI-powered publisher revenue growth.";
const PAGE_PATH = "/blog";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
});

const JSON_LD = jsonLdGraph(
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: PAGE_PATH },
  ]),
  {
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description: PAGE_DESCRIPTION,
    url: `${siteConfig.url}${PAGE_PATH}`,
    publisher: ref(ORG_ID),
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    })),
  }
);

export default function BlogPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />

      <BlogBackground />
      <BlogHero />
      <BlogFeaturedStorySection />
      <BlogArticlesExplorerSection />
      <BlogPopularGuidesSection />
      <BlogEditorsPicksSection />
      <BlogLearningPathSection />
      <BlogNewsletterSection />
      <BlogRelatedTopicsSection />
    </>
  );
}

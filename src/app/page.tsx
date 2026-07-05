import type { Metadata } from "next";

import { HomeBackground } from "@/components/home-background";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { SolutionsOverview } from "@/components/sections/solutions-overview";
import { GrowthJourney } from "@/components/sections/growth-journey";
import { AdFormatsPreview } from "@/components/sections/ad-formats-preview";
import { SuccessStories } from "@/components/sections/success-stories";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

const baseMetadata = buildPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

/** Page-level `openGraph`/`twitter` fully replace the layout's (Next merges Metadata shallowly), so the homepage — the URL actually shared — must restate the exact OG/Twitter copy and image here rather than inherit it. */
export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.ogTitle }],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: siteConfig.twitterTitle,
    description: siteConfig.twitterDescription,
    images: [siteConfig.ogImage],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={{ "@context": "https://schema.org", "@type": "WebPage", name: siteConfig.title, url: siteConfig.url, description: siteConfig.description }} />
      <HomeBackground />
      <Hero />
      <TrustBar />
      <SolutionsOverview />
      <GrowthJourney />
      <AdFormatsPreview />
      <SuccessStories />
      <FinalCtaSection />
    </>
  );
}

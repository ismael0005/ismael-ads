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

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

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

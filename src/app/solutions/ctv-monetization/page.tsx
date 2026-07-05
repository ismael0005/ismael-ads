import type { Metadata } from "next";

import { CtvMonetizationBackground } from "@/components/ctv-monetization-background";
import { CtvHero } from "@/components/sections/ctv-monetization/hero";
import { CtvGrowthSection } from "@/components/sections/ctv-monetization/growth";
import { CtvPipelineSection } from "@/components/sections/ctv-monetization/pipeline";
import { CtvPlatformsSection } from "@/components/sections/ctv-monetization/platforms";
import { CtvFormatShowcaseSection } from "@/components/sections/ctv-monetization/format-showcase";
import { CtvDashboardSection } from "@/components/sections/ctv-monetization/dashboard";
import { CtvTestimonialsSection } from "@/components/sections/ctv-monetization/testimonials";
import { CtvEcosystemSection } from "@/components/sections/ctv-monetization/ecosystem";
import { CtvFaqSection } from "@/components/sections/ctv-monetization/faq";
import { CtvFinalCtaSection } from "@/components/sections/ctv-monetization/final-cta";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/json-ld";
import { ctvFaqs } from "@/data/ctv-monetization";

const PAGE_PATH = "/solutions/ctv-monetization";
const PAGE_TITLE = "CTV Monetization";
const PAGE_DESCRIPTION =
  "Monetize Smart TVs, OTT apps, and FAST channels with Ismael Ads — premium video demand, AI-powered optimization, and real-time bidding across every connected TV platform.";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
});

const JSON_LD = jsonLdGraph(
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: PAGE_TITLE, path: PAGE_PATH },
  ]),
  faqSchema(ctvFaqs)
);

export default function CtvMonetizationPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <CtvMonetizationBackground />
      <CtvHero />
      <CtvGrowthSection />
      <CtvPipelineSection />
      <CtvPlatformsSection />
      <CtvFormatShowcaseSection />
      <CtvDashboardSection />
      <CtvTestimonialsSection />
      <CtvEcosystemSection />
      <CtvFaqSection />
      <CtvFinalCtaSection />
    </>
  );
}

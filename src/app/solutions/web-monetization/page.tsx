import type { Metadata } from "next";

import { HomeBackground } from "@/components/home-background";
import { WebHero } from "@/components/sections/web-monetization/hero";
import { WebStatsBar } from "@/components/sections/web-monetization/stats-bar";
import { WebProblemSection } from "@/components/sections/web-monetization/problem";
import { WebSolutionSection } from "@/components/sections/web-monetization/solution";
import { WebFeaturesSection } from "@/components/sections/web-monetization/features";
import { WebHowItWorksSection } from "@/components/sections/web-monetization/how-it-works";
import { WebResultsSection } from "@/components/sections/web-monetization/results";
import { WebFinalCtaSection } from "@/components/sections/web-monetization/final-cta";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/json-ld";

const PAGE_PATH = "/solutions/web-monetization";
const PAGE_TITLE = "Web Monetization";
const PAGE_DESCRIPTION =
  "Maximize ad revenue on your website with Ismael Ads' web monetization solutions — real-time header bidding, certified premium demand, and AI-powered optimization.";

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
  ])
);

export default function WebMonetizationPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <HomeBackground />
      <WebHero />
      <WebStatsBar />
      <WebProblemSection />
      <WebSolutionSection />
      <WebFeaturesSection />
      <WebHowItWorksSection />
      <WebResultsSection />
      <WebFinalCtaSection />
    </>
  );
}

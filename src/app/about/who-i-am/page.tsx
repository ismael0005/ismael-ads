import type { Metadata } from "next";

import { WhoIAmBackground } from "@/components/who-i-am-background";
import { FounderHero } from "@/components/sections/who-i-am/hero";
import { WhoIAmStorySection } from "@/components/sections/who-i-am/story";
import { WhoIAmTimelineSection } from "@/components/sections/who-i-am/timeline";
import { WhoIAmJourneyStatsSection } from "@/components/sections/who-i-am/journey-stats";
import { WhoIAmExpertiseSection } from "@/components/sections/who-i-am/expertise";
import { WhoIAmGlobalNetworkSection } from "@/components/sections/who-i-am/global-network";
import { WhoIAmDayInLifeSection } from "@/components/sections/who-i-am/day-in-life";
import { WhoIAmGallerySection } from "@/components/sections/who-i-am/gallery";
import { WhoIAmPhilosophySection } from "@/components/sections/who-i-am/philosophy";
import { WhoIAmTrustSection } from "@/components/sections/who-i-am/trust";
import { WhoIAmProcessSection } from "@/components/sections/who-i-am/process";
import { WhoIAmTestimonialsSection } from "@/components/sections/who-i-am/testimonials";
import { WhoIAmFaqSection } from "@/components/sections/who-i-am/faq";
import { WhoIAmFinalCtaSection } from "@/components/sections/who-i-am/final-cta";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, jsonLdGraph, PERSON_ID, ref } from "@/lib/json-ld";
import { founderFaqs } from "@/data/who-i-am";

const PAGE_PATH = "/about/who-i-am";
const PAGE_TITLE = "Who I Am";
const PAGE_DESCRIPTION =
  "Meet Ismael Inacio, founder of Ismael Ads — 15+ years helping publishers across LATAM, North America, and Europe grow their ad revenue.";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
});

const JSON_LD = jsonLdGraph(
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: PAGE_TITLE, path: PAGE_PATH },
  ]),
  { "@type": "WebPage", mainEntity: ref(PERSON_ID) },
  faqSchema(founderFaqs)
);

export default function WhoIAmPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <WhoIAmBackground />
      <FounderHero />
      <WhoIAmStorySection />
      <WhoIAmTimelineSection />
      <WhoIAmJourneyStatsSection />
      <WhoIAmExpertiseSection />
      <WhoIAmGlobalNetworkSection />
      <WhoIAmDayInLifeSection />
      <WhoIAmGallerySection />
      <WhoIAmPhilosophySection />
      <WhoIAmTrustSection />
      <WhoIAmProcessSection />
      <WhoIAmTestimonialsSection />
      <WhoIAmFaqSection />
      <WhoIAmFinalCtaSection />
    </>
  );
}

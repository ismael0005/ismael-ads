import type { Metadata } from "next";

import { AppMonetizationBackground } from "@/components/app-monetization-background";
import { AppHero } from "@/components/sections/app-monetization/hero";
import { AppComparisonSection } from "@/components/sections/app-monetization/comparison";
import { AppSdkPipelineSection } from "@/components/sections/app-monetization/sdk-pipeline";
import { AppFormatShowcaseSection } from "@/components/sections/app-monetization/format-showcase";
import { AppPartnerCloudSection } from "@/components/sections/app-monetization/partner-cloud";
import { AppDashboardSection } from "@/components/sections/app-monetization/dashboard";
import { AppTestimonialsSection } from "@/components/sections/app-monetization/testimonials";
import { AppTimelineSection } from "@/components/sections/app-monetization/timeline";
import { AppFaqSection } from "@/components/sections/app-monetization/faq";
import { AppFinalCtaSection } from "@/components/sections/app-monetization/final-cta";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/json-ld";
import { appFaqs } from "@/data/app-monetization";

const PAGE_PATH = "/solutions/app-monetization";
const PAGE_TITLE = "App Monetization";
const PAGE_DESCRIPTION =
  "Turn your app's inventory into revenue with Ismael Ads — AI-optimized mediation, real-time bidding, and every major demand network behind a single SDK.";

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
  faqSchema(appFaqs)
);

export default function AppMonetizationPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <AppMonetizationBackground />
      <AppHero />
      <AppComparisonSection />
      <AppSdkPipelineSection />
      <AppFormatShowcaseSection />
      <AppPartnerCloudSection />
      <AppDashboardSection />
      <AppTestimonialsSection />
      <AppTimelineSection />
      <AppFaqSection />
      <AppFinalCtaSection />
    </>
  );
}

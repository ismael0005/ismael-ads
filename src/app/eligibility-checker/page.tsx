import type { Metadata } from "next";

import { EligibilityCheckerBackground } from "@/components/eligibility-checker-background";
import { EligibilityHero } from "@/components/sections/eligibility/hero";
import { EligibilityTimelineSection } from "@/components/sections/eligibility/timeline";
import { EligibilityInteractiveChecker } from "@/components/sections/eligibility/interactive-checker";
import { EligibilityRequirementsSection } from "@/components/sections/eligibility/requirements";
import { EligibilityWhoCanJoinSection } from "@/components/sections/eligibility/who-can-join";
import { EligibilityAiSimulationSection } from "@/components/sections/eligibility/ai-simulation";
import { EligibilityDocumentsSection } from "@/components/sections/eligibility/documents";
import { EligibilityCalculatorSection } from "@/components/sections/eligibility/calculator";
import { EligibilityFaqSection } from "@/components/sections/eligibility/faq";
import { EligibilityFinalCtaSection } from "@/components/sections/eligibility/final-cta";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/json-ld";
import { eligibilityFaqs } from "@/data/eligibility-checker";

const PAGE_PATH = "/eligibility-checker";
const PAGE_TITLE = "Eligibility Checker";
const PAGE_DESCRIPTION =
  "Find out instantly if your website qualifies for Google AdX with Ismael Ads' AI-powered eligibility checker — account health, traffic quality, and content standards reviewed in real time.";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
});

const JSON_LD = jsonLdGraph(
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: PAGE_TITLE, path: PAGE_PATH },
  ]),
  faqSchema(eligibilityFaqs)
);

export default function EligibilityCheckerPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <EligibilityCheckerBackground />
      <EligibilityHero />
      <EligibilityTimelineSection />
      <EligibilityInteractiveChecker />
      <EligibilityRequirementsSection />
      <EligibilityWhoCanJoinSection />
      <EligibilityAiSimulationSection />
      <EligibilityDocumentsSection />
      <EligibilityCalculatorSection />
      <EligibilityFaqSection />
      <EligibilityFinalCtaSection />
    </>
  );
}

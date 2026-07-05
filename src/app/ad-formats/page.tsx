import type { Metadata } from "next";

import { AdFormatsBackground } from "@/components/ad-formats-background";
import { AdFormatsHero } from "@/components/sections/ad-formats/hero";
import { AdFormatsShowroomSection } from "@/components/sections/ad-formats/showroom";
import { AdFormatsDesktopSection } from "@/components/sections/ad-formats/desktop-experience";
import { AdFormatsMobileSection } from "@/components/sections/ad-formats/mobile-experience";
import { AdFormatsCtvSection } from "@/components/sections/ad-formats/ctv-experience";
import { AdFormatsComparisonSection } from "@/components/sections/ad-formats/comparison";
import { AdFormatsAdvantagesSection } from "@/components/sections/ad-formats/advantages";
import { AdFormatsRevenueSimulatorSection } from "@/components/sections/ad-formats/revenue-simulator";
import { AdFormatsCaseStudiesSection } from "@/components/sections/ad-formats/case-studies";
import { AdFormatsFaqSection } from "@/components/sections/ad-formats/faq";
import { AdFormatsFinalCtaSection } from "@/components/sections/ad-formats/final-cta";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/json-ld";
import { adFormatsFaqs } from "@/data/ad-formats";

const PAGE_PATH = "/ad-formats";
const PAGE_TITLE = "Ad Formats";
const PAGE_DESCRIPTION =
  "Explore every premium ad format Ismael Ads supports across web, app, and CTV — display, native, video, rewarded, interstitial, and more.";

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
  faqSchema(adFormatsFaqs)
);

export default function AdFormatsPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <AdFormatsBackground />
      <AdFormatsHero />
      <AdFormatsShowroomSection />
      <AdFormatsDesktopSection />
      <AdFormatsMobileSection />
      <AdFormatsCtvSection />
      <AdFormatsComparisonSection />
      <AdFormatsAdvantagesSection />
      <AdFormatsRevenueSimulatorSection />
      <AdFormatsCaseStudiesSection />
      <AdFormatsFaqSection />
      <AdFormatsFinalCtaSection />
    </>
  );
}

import type { Metadata } from "next";

import { MyMissionBackground } from "@/components/my-mission-background";
import { MissionHero } from "@/components/sections/my-mission/hero";
import { MissionWhyWeExistSection } from "@/components/sections/my-mission/why-we-exist";
import { MissionCoreSection } from "@/components/sections/my-mission/mission-core";
import { MissionProblemsSection } from "@/components/sections/my-mission/problems";
import { MissionVisionSection } from "@/components/sections/my-mission/vision";
import { MissionPrinciplesSection } from "@/components/sections/my-mission/principles";
import { MissionPromiseSection } from "@/components/sections/my-mission/promise";
import { MissionImpactSection } from "@/components/sections/my-mission/impact";
import { MissionRoadmapSection } from "@/components/sections/my-mission/roadmap";
import { MissionTestimonialsSection } from "@/components/sections/my-mission/testimonials";
import { MissionVideoSection } from "@/components/sections/my-mission/video";
import { MissionFaqSection } from "@/components/sections/my-mission/faq";
import { MissionFinalCtaSection } from "@/components/sections/my-mission/final-cta";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/json-ld";
import { missionFaqs } from "@/data/my-mission";

const PAGE_PATH = "/about/my-mission";
const PAGE_TITLE = "My Mission";
const PAGE_DESCRIPTION =
  "Why Ismael Ads exists — helping publishers build sustainable advertising revenue through transparency, premium demand and long-term partnerships.";

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
  faqSchema(missionFaqs)
);

export default function MyMissionPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <MyMissionBackground />
      <MissionHero />
      <MissionWhyWeExistSection />
      <MissionCoreSection />
      <MissionProblemsSection />
      <MissionVisionSection />
      <MissionPrinciplesSection />
      <MissionPromiseSection />
      <MissionImpactSection />
      <MissionRoadmapSection />
      <MissionTestimonialsSection />
      <MissionVideoSection />
      <MissionFaqSection />
      <MissionFinalCtaSection />
    </>
  );
}

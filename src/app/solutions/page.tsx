import type { Metadata } from "next";

import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { SectionPlaceholder } from "@/components/common/section-placeholder";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Solutions",
  description: "Explore Ismael Ads' monetization solutions across Web, App, and CTV.",
  path: "/solutions",
  noindex: true,
});

const sections = [
  { name: "Hero" },
  { name: "Web Monetization Overview" },
  { name: "App Monetization Overview" },
  { name: "CTV Monetization Overview" },
  { name: "Comparison Overview" },
  { name: "Call to Action" },
];

export default function SolutionsPage() {
  return (
    <>
      <Section spacing="xl">
        <Badge variant="outline">Solutions</Badge>
        <Heading as="h1" size="2xl" className="mt-4">
          One partner for <GradientText>every screen</GradientText>
        </Heading>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Whichever surface your audience lives on, Ismael Ads has a
          monetization solution built for it. Full page content is coming in
          a later phase — this is a clean page shell.
        </p>
      </Section>

      <Section spacing="lg" tone="muted">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <SectionPlaceholder key={section.name} name={section.name} />
          ))}
        </div>
      </Section>
    </>
  );
}

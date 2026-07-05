import type { Metadata } from "next";

import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { SectionPlaceholder } from "@/components/common/section-placeholder";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description: "Learn about Ismael Ads, the founder behind it, and the mission driving the company.",
  path: "/about",
  noindex: true,
});

const sections = [
  { name: "Hero" },
  { name: "Company Story" },
  { name: "Who I Am Preview" },
  { name: "My Mission Preview" },
  { name: "Values" },
  { name: "Call to Action" },
];

export default function AboutPage() {
  return (
    <>
      <Section spacing="xl">
        <Badge variant="outline">About Us</Badge>
        <Heading as="h1" size="2xl" className="mt-4">
          The story behind <GradientText>Ismael Ads</GradientText>
        </Heading>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A closer look at why Ismael Ads exists and who&apos;s building it.
          Full
          page content is coming in a later phase — this is a clean page
          shell.
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

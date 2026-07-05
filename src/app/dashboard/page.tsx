import type { Metadata } from "next";

import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { SectionPlaceholder } from "@/components/common/section-placeholder";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Dashboard",
  description: "Track your ad revenue, traffic, and performance in one place.",
  path: "/dashboard",
  noindex: true,
});

const sections = [
  { name: "Overview Header" },
  { name: "Key Metrics" },
  { name: "Revenue Chart", description: "Recharts revenue trend — added in a later phase." },
  { name: "Traffic Breakdown", description: "Recharts traffic-by-source — added in a later phase." },
  { name: "Recent Activity Table" },
];

export default function DashboardPage() {
  return (
    <>
      <Section spacing="xl">
        <Badge variant="outline">Dashboard</Badge>
        <Heading as="h1" size="2xl" className="mt-4">
          Your <GradientText>revenue</GradientText>, at a glance
        </Heading>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Monitor performance across every monetized surface. Full page
          content is coming in a later phase — this is a clean page shell.
        </p>
      </Section>

      <Section spacing="lg" tone="muted">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <SectionPlaceholder
              key={section.name}
              name={section.name}
              description={section.description}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

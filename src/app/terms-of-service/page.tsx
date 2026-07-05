import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/json-ld";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { LegalPage } from "@/components/sections/legal/legal-page";

const PAGE_PATH = "/terms-of-service";
const PAGE_TITLE = "Terms of Service";
const PAGE_DESCRIPTION = "The terms that govern your use of the Ismael Ads website and publisher-facing services.";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
});

const JSON_LD = jsonLdGraph(
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: PAGE_TITLE, path: PAGE_PATH },
  ])
);

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <LegalPage
        title={PAGE_TITLE}
        lastUpdated="July 4, 2026"
        intro="These terms govern your use of ismaelads.com and any tools, checkers, or forms on it. By using the site, you agree to these terms. If you're evaluating or entering a monetization partnership with us, a separate partner agreement governs that relationship — these terms cover the website itself."
        sections={[
          {
            heading: "Use Of This Site",
            paragraphs: [
              "You may browse this site and use its tools, including the eligibility checker, for the purpose of evaluating our publisher monetization services. You agree not to misuse the site — including attempting to disrupt its operation, scrape it at scale without permission, or submit false information through our forms.",
            ],
          },
          {
            heading: "No Guarantee Of Results",
            paragraphs: [
              "Articles, guides, and figures published on this site — including in our [publisher blog](/blog) — reflect general patterns we've observed across publisher accounts and are provided for educational purposes. They are not a guarantee of any specific revenue outcome, approval, or timeline for your site, which depends on factors specific to your traffic, content, and account history.",
            ],
          },
          {
            heading: "Intellectual Property",
            paragraphs: [
              "The content, design, and branding on this site belong to Ismael Ads unless otherwise noted. You may reference or link to our published articles with attribution, but you may not republish substantial portions of our content without permission.",
            ],
          },
          {
            heading: "Third-Party Links And Services",
            paragraphs: [
              "This site links to third-party services (including Google's advertising products) and may reference platforms we don't control. We aren't responsible for the content, policies, or practices of third-party sites you reach through links on ours.",
            ],
          },
          {
            heading: "Eligibility Checker Disclaimer",
            paragraphs: [
              "The eligibility checker provides an informal, preliminary read on your site's readiness for our monetization programs based on the information you submit. It is not a formal approval, and final eligibility for any program is determined through direct review, not the checker alone.",
            ],
          },
          {
            heading: "Limitation Of Liability",
            paragraphs: [
              "This site and its content are provided on an \"as is\" basis. To the fullest extent permitted by law, Ismael Ads isn't liable for any indirect, incidental, or consequential damages arising from your use of the site or reliance on information published on it.",
            ],
          },
          {
            heading: "Changes To These Terms",
            paragraphs: [
              "We may update these terms from time to time. Continued use of the site after a change means you accept the updated terms. We'll reflect the current version's date at the top of this page.",
            ],
          },
          {
            heading: "Governing Law",
            paragraphs: [
              "These terms are governed by the laws applicable to Ismael Ads' place of business, without regard to conflict-of-law principles, except where local consumer protection law in your jurisdiction requires otherwise.",
            ],
          },
        ]}
      />
    </>
  );
}

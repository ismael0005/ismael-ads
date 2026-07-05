import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/json-ld";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { LegalPage } from "@/components/sections/legal/legal-page";

const PAGE_PATH = "/cookie-policy";
const PAGE_TITLE = "Cookie Policy";
const PAGE_DESCRIPTION = "What cookies and similar technologies Ismael Ads uses on this site, and how to control them.";

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

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <LegalPage
        title={PAGE_TITLE}
        lastUpdated="July 4, 2026"
        intro="This page explains the cookies and similar local-storage technologies this site uses, why we use them, and how you can control them. It's a companion to our [Privacy Policy](/privacy-policy)."
        sections={[
          {
            heading: "What Cookies Are",
            paragraphs: [
              "Cookies are small text files a website stores on your device to remember information between visits or requests. Some are essential to how a site functions; others support analytics or personalization. This site keeps its use deliberately minimal.",
            ],
          },
          {
            heading: "What We Actually Use",
            paragraphs: [
              "We use a small local-storage entry to remember your light/dark theme preference across visits, so the site doesn't reset your display choice every time you come back. This is functional, not tracking-based, and doesn't identify you personally.",
              "If we add analytics in the future to understand aggregate site usage, this page will be updated first, and any cookie requiring consent under applicable law will be gated behind a consent banner before it's set.",
            ],
            list: [
              "Theme preference (light/dark mode) — stored locally in your browser, not shared with us",
              "No advertising or cross-site tracking cookies are set by this marketing site itself",
              "No third-party ad tags run on ismaelads.com's own pages",
            ],
          },
          {
            heading: "Cookies On Publisher Sites We Work With",
            paragraphs: [
              "This policy covers ismaelads.com only. If you're a publisher partner, the ad tags and consent management setup running on your own site are governed by your site's own privacy and cookie policy, and by the terms of your monetization partnership with us — not by this page.",
            ],
          },
          {
            heading: "How To Control Cookies",
            paragraphs: [
              "Most browsers let you block or delete cookies and local storage through their settings. Since this site's own cookie footprint is limited to a functional theme preference, clearing it simply means the site will default to your system's light/dark preference on your next visit.",
            ],
          },
          {
            heading: "Changes To This Policy",
            paragraphs: [
              "If our use of cookies changes — for example, if we add analytics or marketing pixels — we'll update this page and, where required, request your consent before setting anything beyond strictly necessary cookies.",
            ],
          },
        ]}
      />
    </>
  );
}

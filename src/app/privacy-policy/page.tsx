import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/json-ld";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { LegalPage } from "@/components/sections/legal/legal-page";

const PAGE_PATH = "/privacy-policy";
const PAGE_TITLE = "Privacy Policy";
const PAGE_DESCRIPTION = "How Ismael Ads collects, uses, and protects information across this site and our publisher-facing services.";

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

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <LegalPage
        title={PAGE_TITLE}
        lastUpdated="July 4, 2026"
        intro="This policy explains what information Ismael Ads collects when you visit this site or work with us as a publisher, how we use it, and the choices you have. It applies to ismaelads.com and any tools, forms, or dashboards linked from it."
        sections={[
          {
            heading: "Information We Collect",
            paragraphs: [
              "We collect information you provide directly — for example, your name, email address, website URL, and traffic details when you submit the eligibility checker or contact form. We also collect standard technical data automatically when you browse the site: IP address, browser and device type, pages visited, referring URL, and approximate location derived from your IP.",
            ],
            list: [
              "Contact details you submit (name, email, company, website)",
              "Site and traffic information you share for eligibility review",
              "Technical and usage data collected automatically (device, browser, pages viewed)",
              "Cookie and similar identifiers described in our Cookie Policy",
            ],
          },
          {
            heading: "How We Use Information",
            paragraphs: [
              "We use the information you provide to respond to inquiries, evaluate eligibility for our monetization programs, and communicate about your account if you become a partner. Technical and usage data helps us understand how the site is used, fix issues, and improve page performance and content.",
              "We do not sell personal information. We do not share the details you submit through our forms with third parties for their own marketing purposes.",
            ],
          },
          {
            heading: "Cookies And Similar Technologies",
            paragraphs: [
              "This site uses a small number of cookies for essential functionality (such as remembering your theme preference) and, where applicable, analytics. Full detail on what we use and how to control it lives in our [Cookie Policy](/cookie-policy), which is incorporated into this policy by reference.",
            ],
          },
          {
            heading: "How We Share Information",
            paragraphs: [
              "We share information with service providers who help us run this site and our publisher programs — for example, hosting, analytics, and email delivery providers — under agreements that limit their use of your data to the services they provide us. We may also disclose information if required by law or to protect the rights, safety, or property of Ismael Ads or others.",
            ],
          },
          {
            heading: "Data Retention",
            paragraphs: [
              "We retain contact and eligibility-check submissions for as long as needed to respond to your inquiry and, if you become a publisher partner, for the duration of that relationship plus a reasonable period afterward for recordkeeping. You can request deletion at any time using the contact details below.",
            ],
          },
          {
            heading: "Your Rights",
            paragraphs: [
              "Depending on where you're located, you may have the right to access, correct, export, or delete personal information we hold about you, and to object to or restrict certain processing. To exercise any of these rights, contact us using the details below and we'll respond within a reasonable timeframe.",
            ],
          },
          {
            heading: "International Transfers",
            paragraphs: [
              "We work with publishers and service providers across LATAM, North America, and Europe. Where information is transferred across borders, we take reasonable steps to ensure it continues to receive an appropriate level of protection consistent with this policy.",
            ],
          },
          {
            heading: "Changes To This Policy",
            paragraphs: [
              "We may update this policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We'll update the \"Last updated\" date above when we do, and material changes will be highlighted on this page.",
            ],
          },
        ]}
      />
    </>
  );
}

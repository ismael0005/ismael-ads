import type { Metadata } from "next";

import { ContactBackground } from "@/components/contact-background";
import { ContactHero } from "@/components/sections/contact/hero";
import { ContactPortalsSection } from "@/components/sections/contact/portals";
import { ContactMessageFormSection } from "@/components/sections/contact/message-form";
import { ContactMeetIsmaelSection } from "@/components/sections/contact/meet-ismael";
import { ContactNextStepsSection } from "@/components/sections/contact/next-steps";
import { ContactGlobalAvailabilitySection } from "@/components/sections/contact/global-availability";
import { ContactFaqSection } from "@/components/sections/contact/faq";
import { ContactTestimonialBubblesSection } from "@/components/sections/contact/testimonial-bubbles";
import { ContactFinalCtaSection } from "@/components/sections/contact/final-cta";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/json-ld";
import { contactFaqs } from "@/data/contact";

const PAGE_PATH = "/about/contact";
const PAGE_TITLE = "Contact";
const PAGE_DESCRIPTION =
  "Message Ismael Inacio directly — WhatsApp, email, LinkedIn or book a consultation to start growing your publisher revenue.";

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
  faqSchema(contactFaqs)
);

export default function ContactPage() {
  return (
    <>
      <JsonLdScript data={JSON_LD} />
      <ContactBackground />
      <ContactHero />
      <ContactPortalsSection />
      <ContactMessageFormSection />
      <ContactMeetIsmaelSection />
      <ContactNextStepsSection />
      <ContactGlobalAvailabilitySection />
      <ContactFaqSection />
      <ContactTestimonialBubblesSection />
      <ContactFinalCtaSection />
    </>
  );
}

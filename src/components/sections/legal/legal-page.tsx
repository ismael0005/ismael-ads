import Link from "next/link";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { RichText } from "@/components/sections/blog/rich-text";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

/** Shared prose layout for legal/compliance pages (privacy, terms, cookies) — deliberately simple, no marketing chrome. */
export function LegalPage({ title, lastUpdated, intro, sections }: LegalPageProps) {
  return (
    <Section spacing="lg">
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-foreground" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <Heading as="h1" size="2xl" className="mt-4 text-balance">
          {title}
        </Heading>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        <p className="mt-6 text-lg text-foreground">{intro}</p>

        <article>
          {sections.map((section) => (
            <div key={section.heading} className="mt-10">
              <Heading as="h2" size="md" className="text-balance">
                {section.heading}
              </Heading>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="mt-4 text-base leading-relaxed text-muted-foreground">
                  <RichText text={paragraph} />
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-2.5">
                  {section.list.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-base text-muted-foreground">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        <div className={cn(glass.base, glass.light, "mt-10 rounded-2xl p-6")}>
          <p className="text-sm text-muted-foreground">
            Questions about this policy? Reach out any time at{" "}
            <a href="mailto:publisher@ismaelads.com" className="font-medium text-primary-text hover:text-secondary-text">
              publisher@ismaelads.com
            </a>{" "}
            or through the{" "}
            <Link href="/about/contact" className="font-medium text-primary-text hover:text-secondary-text">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}

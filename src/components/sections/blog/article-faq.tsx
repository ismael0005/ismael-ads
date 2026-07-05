"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Heading } from "@/components/ui/heading";
import { RichText } from "@/components/sections/blog/rich-text";
import type { ArticleFaq } from "@/data/blog-articles";

export function ArticleFaqSection({ faqs }: { faqs: ArticleFaq[] }) {
  if (!faqs.length) return null;

  return (
    <div className="mt-10">
      <Heading as="h2" size="md" className="text-balance">
        Frequently Asked Questions
      </Heading>
      <Accordion.Root className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <Accordion.Item
            key={faq.question}
            value={faq.question}
            className={cn(glass.base, glass.light, "group overflow-hidden rounded-2xl")}
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="text-sm font-semibold text-foreground">{faq.question}</span>
                <ChevronDown
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[open]:rotate-180 group-data-[open]:text-primary-text"
                  aria-hidden="true"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden px-5 text-sm text-muted-foreground transition-[height] duration-300 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
              <p className="pb-4 leading-relaxed">
                <RichText text={faq.answer} />
              </p>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

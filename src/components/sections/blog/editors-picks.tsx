"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ArticleCoverArt } from "@/components/sections/blog/article-cover-art";
import { blogPosts, editorPicksIntro, getCategory } from "@/data/blog";

const editorPicks = blogPosts.filter((post) => post.editorPick);
const mainPick = editorPicks.find((post) => post.editorPickSize === "lg") ?? editorPicks[0];
const sidePicks = editorPicks.filter((post) => post.id !== mainPick.id);
const mainCategory = getCategory(mainPick.category);

export function BlogEditorsPicksSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...editorPicksIntro} className="mx-auto mb-12 max-w-2xl" />

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.3fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={`/blog/${mainPick.slug}`}
            className={cn(glass.base, glass.light, "group block h-full overflow-hidden rounded-3xl transition-shadow duration-300 hover:shadow-2xl")}
          >
            <ArticleCoverArt post={mainPick} className="h-64 w-full sm:h-80" iconClassName="size-14" />
            <div className="p-6 sm:p-8">
              <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase", accentChipClasses[mainCategory.accent])}>
                {mainCategory.label}
              </span>
              <h3 className="mt-4 font-heading text-xl font-bold text-balance text-foreground transition-colors duration-300 group-hover:text-primary-text sm:text-2xl">
                {mainPick.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">{mainPick.excerpt}</p>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" aria-hidden="true" />
                {mainPick.readingTime} min read
              </p>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          {sidePicks.map((post) => {
            const category = getCategory(post.category);
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={cn(glass.base, glass.light, "group flex items-center gap-4 rounded-2xl p-3 transition-shadow duration-300 hover:shadow-lg")}
              >
                <ArticleCoverArt post={post} className="size-16 shrink-0 rounded-xl" iconClassName="size-6" />
                <div className="min-w-0">
                  <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase", accentChipClasses[category.accent])}>
                    {category.label}
                  </span>
                  <p className="mt-1.5 truncate text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary-text">
                    {post.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3" aria-hidden="true" />
                    {post.readingTime} min read
                  </p>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}

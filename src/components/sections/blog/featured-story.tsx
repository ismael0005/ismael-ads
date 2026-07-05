"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Gauge } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArticleCoverArt } from "@/components/sections/blog/article-cover-art";
import { blogAuthor, getCategory, getFeaturedPost } from "@/data/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function BlogFeaturedStorySection() {
  const post = getFeaturedPost();
  const category = getCategory(post.category);

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-6xl"
      >
        <TiltCard maxTilt={3}>
          <Link
            href={`/blog/${post.slug}`}
            className={cn(glass.base, glass.light, "group grid overflow-hidden rounded-[2rem] transition-shadow duration-300 hover:shadow-2xl lg:grid-cols-2")}
          >
            <ArticleCoverArt post={post} className="h-64 lg:h-full" iconClassName="size-16" />

            <div className="flex flex-col justify-center p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase", accentChipClasses[category.accent])}>
                  {category.label}
                </span>
                {post.seoScore && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <Gauge className="size-3" aria-hidden="true" />
                    SEO Score {post.seoScore}
                  </span>
                )}
              </div>

              <h2 className="mt-4 font-heading text-2xl font-bold text-balance text-foreground transition-colors duration-300 group-hover:text-primary-text sm:text-3xl">
                {post.title}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">{post.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[9px] font-bold text-white">
                    {blogAuthor.initials}
                  </span>
                  {blogAuthor.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" aria-hidden="true" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {post.readingTime} min read
                </span>
              </div>

              <span className={cn("mt-6 flex items-center gap-1.5 text-sm font-bold", accentTextClasses[category.accent])}>
                Read The Full Story
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </TiltCard>
      </motion.div>
    </Section>
  );
}

"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Clock, Gauge, GraduationCap, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ArticleCoverArt } from "@/components/sections/blog/article-cover-art";
import { blogPosts, getCategory, popularGuidesIntro, type BlogPost } from "@/data/blog";

const popularPosts = blogPosts.filter((post) => post.popular);
const mostViewedId = [...popularPosts].sort((a, b) => Number.parseFloat(b.views ?? "0") - Number.parseFloat(a.views ?? "0"))[0]?.id;

function guideBadge(post: BlogPost): { label: string; icon: LucideIcon } {
  if (post.id === mostViewedId) return { label: "Most Viewed", icon: TrendingUp };
  if (post.seoScore) return { label: "Highest Ranking", icon: Gauge };
  return { label: post.level ?? "Guide", icon: GraduationCap };
}

export function BlogPopularGuidesSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...popularGuidesIntro} className="mx-auto mb-12 max-w-2xl" />

      <div
        role="region"
        aria-label="Popular guides, scroll horizontally to see all"
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {popularPosts.map((post, index) => {
          const category = getCategory(post.category);
          const badge = guideBadge(post);
          const BadgeIcon = badge.icon;
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="w-72 shrink-0 snap-center sm:w-80"
            >
              <Link
                href={`/blog/${post.slug}`}
                className={cn(glass.base, glass.light, "group block h-full overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-xl")}
              >
                <div className="relative">
                  <ArticleCoverArt post={post} className="h-36 w-full" iconClassName="size-8" />
                  <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold text-foreground shadow-sm">
                    <BadgeIcon className="size-3" aria-hidden="true" />
                    {badge.label}
                  </span>
                </div>
                <div className="p-5">
                  <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase", accentChipClasses[category.accent])}>
                    {category.label}
                  </span>
                  <h3 className="mt-3 font-heading text-sm font-bold text-balance text-foreground transition-colors duration-300 group-hover:text-primary-text">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3" aria-hidden="true" />
                    {post.readingTime} min read
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

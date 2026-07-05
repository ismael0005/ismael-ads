"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { motionVariants } from "@/styles/animations";
import { ArticleCoverArt } from "@/components/sections/blog/article-cover-art";
import { articlesIntro, blogAuthor, blogCategories, blogPosts, getCategory, getFeaturedPost, type CategoryId } from "@/data/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BlogArticlesExplorerSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const featuredId = getFeaturedPost().id;

  const posts = useMemo(() => {
    return blogPosts
      .filter((post) => post.id !== featuredId)
      .filter((post) => activeCategory === "all" || post.category === activeCategory);
  }, [activeCategory, featuredId]);

  return (
    <>
      <Section spacing="md" className="relative overflow-hidden">
        <SectionHeading {...articlesIntro} className="mx-auto mb-10 max-w-2xl" />

        <div
          role="region"
          aria-label="Article category filters, scroll horizontally to see all"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {blogCategories.map((category) => {
            const Icon = category.icon;
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  glass.base,
                  "relative shrink-0 overflow-hidden rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-300",
                  isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="category-active-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-accent"
                  />
                )}
                <span className="flex items-center gap-1.5">
                  <Icon className="size-3.5" aria-hidden="true" />
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section id="latest-articles" spacing="lg" className="relative scroll-mt-24 overflow-hidden">
        {posts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">No articles in this category yet — check back soon.</p>
        ) : (
          <motion.div
            key={activeCategory}
            variants={motionVariants.staggerContainer}
            initial="hidden"
            animate="visible"
            className="columns-1 gap-6 sm:columns-2 lg:columns-3"
          >
            {posts.map((post) => {
              const category = getCategory(post.category);
              return (
                <motion.div key={post.id} variants={motionVariants.fadeInUp} className="mb-6 break-inside-avoid">
                  <Link
                    href={`/blog/${post.slug}`}
                    className={cn(glass.base, glass.light, "group block overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-xl")}
                  >
                    <ArticleCoverArt post={post} className="h-40 w-full" iconClassName="size-9" />
                    <div className="p-5">
                      <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase", accentChipClasses[category.accent])}>
                        {category.label}
                      </span>
                      <h3 className="mt-3 font-heading text-base font-bold text-balance text-foreground transition-colors duration-300 group-hover:text-primary-text">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>

                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5 truncate">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[7px] font-bold text-white">
                            {blogAuthor.initials}
                          </span>
                          <span className={cn("truncate", accentTextClasses[category.accent])}>{blogAuthor.name}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" aria-hidden="true" />
                            {post.readingTime}m
                          </span>
                          <span className="hidden items-center gap-1 sm:flex">
                            <Calendar className="size-3" aria-hidden="true" />
                            {formatDate(post.date)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </Section>
    </>
  );
}

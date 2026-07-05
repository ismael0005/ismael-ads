"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Clock, Flame, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentTextClasses } from "@/lib/accent";
import { ArticleCoverArt } from "@/components/sections/blog/article-cover-art";
import { blogCategories, blogPosts, getFeaturedPost, type BlogPost } from "@/data/blog";

const trendingPost = blogPosts.find((post) => post.trending) ?? blogPosts[1];
const latestPost = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1))[0];

const FLOATING_CHIPS = blogCategories.slice(1, 5);
/** Clear of the Trending (top-left), Featured (center) and Latest (bottom-right) mini-cards below. */
const CHIP_POSITIONS = [
  { x: 96, y: 4, delay: 0.3 },
  { x: 2, y: 50, delay: 0.5 },
  { x: 4, y: 97, delay: 0.7 },
  { x: 97, y: 52, delay: 0.9 },
];

function MiniCard({
  kicker,
  kickerIcon: KickerIcon,
  title,
  readingTime,
  accentClass,
  post,
  className,
  rotate,
}: {
  kicker: string;
  kickerIcon: LucideIcon;
  title: string;
  readingTime: number;
  accentClass: string;
  post: BlogPost;
  className?: string;
  rotate: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(glass.base, glass.light, "absolute flex w-56 items-center gap-3 rounded-2xl p-3 shadow-xl sm:w-64", className)}
    >
      <ArticleCoverArt post={post} className="size-12 shrink-0 rounded-xl" iconClassName="size-5" />
      <div className="min-w-0">
        <p className={cn("flex items-center gap-1 text-[10px] font-bold tracking-wide uppercase", accentClass)}>
          <KickerIcon className="size-3" aria-hidden="true" />
          {kicker}
        </p>
        <p className="mt-0.5 truncate text-xs font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="size-2.5" aria-hidden="true" />
          {readingTime} min read
        </p>
      </div>
    </motion.div>
  );
}

export function BlogHeroStage() {
  const featured = getFeaturedPost();

  return (
    <div className="relative w-full">
      {/* Desktop: layered editorial dashboard */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-lg lg:block">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />

        {FLOATING_CHIPS.map((category, index) => {
          const pos = CHIP_POSITIONS[index];
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: pos.delay },
                scale: { duration: 0.6, delay: pos.delay },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: pos.delay },
              }}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <div className={cn(glass.base, glass.light, "flex items-center gap-1.5 rounded-full px-3 py-1.5")}>
                <Icon className={cn("size-3", accentTextClasses[category.accent])} aria-hidden="true" />
                <span className="text-[10px] font-semibold whitespace-nowrap text-foreground">{category.label}</span>
              </div>
            </motion.div>
          );
        })}

        <MiniCard
          kicker="Trending"
          kickerIcon={Flame}
          title={trendingPost.title}
          readingTime={trendingPost.readingTime}
          accentClass="text-accent-text"
          post={trendingPost}
          rotate={-6}
          className="top-[8%] left-[2%] z-[5]"
        />
        <MiniCard
          kicker="Latest"
          kickerIcon={Clock}
          title={latestPost.title}
          readingTime={latestPost.readingTime}
          accentClass="text-secondary-text"
          post={latestPost}
          rotate={5}
          className="right-[0%] bottom-[10%] z-[8]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
          }}
          className={cn(glass.base, glass.light, "absolute top-1/2 left-1/2 z-10 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl p-4 shadow-2xl")}
        >
          <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-primary-text uppercase">
            <Sparkles className="size-3" aria-hidden="true" />
            Featured
          </p>
          <ArticleCoverArt post={featured} className="mt-2 h-28 w-full rounded-xl" iconClassName="size-9" />
          <p className="mt-3 text-sm font-bold text-balance text-foreground">{featured.title}</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
          <p className="mt-1.5 text-[10px] text-muted-foreground">{featured.readingTime} min read · Reading progress</p>
        </motion.div>
      </div>

      {/* Tablet / mobile: single featured preview, no absolute ecosystem */}
      <div className="relative mx-auto max-w-sm lg:hidden">
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.8 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          className={cn(glass.base, glass.light, "overflow-hidden rounded-3xl p-4 shadow-2xl")}
        >
          <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-primary-text uppercase">
            <Sparkles className="size-3" aria-hidden="true" />
            Featured
          </p>
          <ArticleCoverArt post={featured} className="mt-2 h-32 w-full rounded-xl" iconClassName="size-10" />
          <p className="mt-3 text-sm font-bold text-balance text-foreground">{featured.title}</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
          <p className="mt-1.5 text-[10px] text-muted-foreground">{featured.readingTime} min read · Reading progress</p>
        </motion.div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
        {FLOATING_CHIPS.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className={cn(glass.base, glass.light, "flex items-center gap-1.5 rounded-full px-3 py-1.5")}>
              <Icon className={cn("size-3", accentTextClasses[category.accent])} aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground">{category.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

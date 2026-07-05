import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentGlowClasses } from "@/lib/accent";
import { buildPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/json-ld";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ArticleCoverArt } from "@/components/sections/blog/article-cover-art";
import { ArticleFaqSection } from "@/components/sections/blog/article-faq";
import { RichText } from "@/components/sections/blog/rich-text";
import { blogAuthor, blogPosts, getCategory, type CategoryId } from "@/data/blog";
import { articleBodies } from "@/data/blog-articles";

/** Sends the reader to the most relevant product page for the article's category — the highest-value internal link on the page. */
const CATEGORY_PRODUCT_LINK: Record<CategoryId, { label: string; href: string }> = {
  all: { label: "Explore Solutions", href: "/solutions" },
  adsense: { label: "Explore Web Monetization", href: "/solutions/web-monetization" },
  gam: { label: "Explore Web Monetization", href: "/solutions/web-monetization" },
  adx: { label: "Check Your Eligibility", href: "/eligibility-checker" },
  "header-bidding": { label: "Explore Web Monetization", href: "/solutions/web-monetization" },
  "web-monetization": { label: "Explore Web Monetization", href: "/solutions/web-monetization" },
  "app-monetization": { label: "Explore App Monetization", href: "/solutions/app-monetization" },
  ctv: { label: "Explore CTV Monetization", href: "/solutions/ctv-monetization" },
  seo: { label: "Explore Web Monetization", href: "/solutions/web-monetization" },
  ai: { label: "See Ad Formats", href: "/ad-formats" },
  "publisher-tips": { label: "Check Your Eligibility", href: "/eligibility-checker" },
  "policy-updates": { label: "Check Your Eligibility", href: "/eligibility-checker" },
  "case-studies": { label: "Check Your Eligibility", href: "/eligibility-checker" },
  "revenue-growth": { label: "Check Your Eligibility", href: "/eligibility-checker" },
  programmatic: { label: "Explore Web Monetization", href: "/solutions/web-monetization" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    article: {
      publishedTime: post.date,
      authorName: blogAuthor.name,
      tags: post.tags,
    },
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const body = articleBodies[slug];

  if (!post || !body) {
    notFound();
  }

  const category = getCategory(post.category);
  const productLink = CATEGORY_PRODUCT_LINK[post.category];
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);
  const path = `/blog/${post.slug}`;

  const jsonLd = jsonLdGraph(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: category.label, path: "/blog" },
      { name: post.title, path },
    ]),
    articleSchema({
      title: post.title,
      description: post.excerpt,
      path,
      datePublished: post.date,
      tags: post.tags,
    }),
    faqSchema(body.faqs)
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />

      <Section spacing="lg">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="max-w-[16rem] truncate font-medium text-foreground" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 max-w-3xl">
          <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase", accentChipClasses[category.accent])}>
            {category.label}
          </span>

          <Heading as="h1" size="2xl" className="mt-4 text-balance">
            {post.title}
          </Heading>

          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

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
        </div>

        <ArticleCoverArt post={post} className="mx-auto mt-10 h-64 max-w-3xl rounded-3xl sm:h-80" iconClassName="size-16" />

        <article className="mx-auto mt-10 max-w-3xl">
          <p className="text-lg text-foreground">
            <RichText text={body.intro} />
          </p>

          {body.sections.map((section) => (
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
                      <span className={cn("mt-2.5 size-1.5 shrink-0 rounded-full", accentGlowClasses[category.accent])} aria-hidden="true" />
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className={cn(glass.base, glass.light, "mt-10 rounded-2xl p-6")}>
            <p className="text-base font-medium text-foreground">
              <RichText text={body.takeaway} />
            </p>
          </div>

          <ArticleFaqSection faqs={body.faqs} />

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="gradient" size="lg" nativeButton={false} render={<Link href={productLink.href}>{productLink.label}</Link>} />
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href="/about/contact">Have A Question? Contact Ismael</Link>}
            />
          </div>

          <Link href="/blog" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back To Blog
          </Link>

          <div className={cn(glass.base, glass.light, "mt-10 flex items-start gap-4 rounded-2xl p-6")}>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
              {blogAuthor.initials}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Written by{" "}
                <Link href={blogAuthor.href} className="text-primary-text hover:text-secondary-text">
                  {blogAuthor.name}
                </Link>
              </p>
              <p className="text-xs font-medium text-muted-foreground">{blogAuthor.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{blogAuthor.bio}</p>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-10">
            <Heading as="h2" size="sm">
              More In {category.label}
            </Heading>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className={cn(glass.base, glass.light, "group flex flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-xl")}
                >
                  <ArticleCoverArt post={related} className="h-28 w-full" iconClassName="size-8" />
                  <div className="flex flex-1 flex-col p-4">
                    <p className="line-clamp-2 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary-text">
                      {related.title}
                    </p>
                    <span className="mt-auto flex items-center gap-1 pt-3 text-xs font-bold text-muted-foreground">
                      Read More
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}

import { blogPosts, getCategory } from "@/data/blog";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ismael Ads Blog article";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const category = post ? getCategory(post.category) : null;

  return renderOgImage({
    kicker: category?.label ?? "Ismael Ads Blog",
    title: post?.title ?? "Publisher Insights & Revenue Growth",
    accent: post?.accent ?? "primary",
  });
}

import { cn } from "@/lib/utils";
import type { Accent } from "@/lib/accent";
import type { BlogPost } from "@/data/blog";

const ACCENT_GRADIENT: Record<Accent, string> = {
  primary: "from-primary via-primary/60 to-secondary",
  secondary: "from-secondary via-secondary/60 to-accent",
  accent: "from-accent via-accent/60 to-primary",
};

const DOT_GRID = "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)";

interface ArticleCoverArtProps {
  post: Pick<BlogPost, "coverIcon" | "accent">;
  className?: string;
  iconClassName?: string;
}

/**
 * Abstract gradient + icon "cover art" — the site has no stock photography,
 * so every article card gets a deterministic, accent-driven illustration
 * instead of a placeholder image. Callers wrap this in a `group` element and
 * add `group-hover:scale-105` here for the zoom-on-hover effect.
 */
export function ArticleCoverArt({ post, className, iconClassName }: ArticleCoverArtProps) {
  const Icon = post.coverIcon;
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", ACCENT_GRADIENT[post.accent], className)}>
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: DOT_GRID, backgroundSize: "14px 14px" }} />
      <Icon aria-hidden="true" className="absolute -right-3 -bottom-3 size-24 rotate-[-12deg] text-white/15" />
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
        <Icon aria-hidden="true" className={cn("size-12 text-white drop-shadow-lg", iconClassName)} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
    </div>
  );
}

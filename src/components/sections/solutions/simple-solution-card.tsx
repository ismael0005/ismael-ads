import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentHoverClasses, type Accent } from "@/lib/accent";
import { GlassIcon3D } from "@/components/ui/glass-icon";

interface SimpleSolutionCardProps {
  icon: LucideIcon;
  accent: Accent;
  title: string;
  description: string;
  stat: { value: string; label: string };
  href: string;
}

/** Below `lg:` the rich device mockups don't have room to breathe — this is the honest fallback. */
export function SimpleSolutionCard({
  icon: Icon,
  accent,
  title,
  description,
  stat,
  href,
}: SimpleSolutionCardProps) {
  return (
    <div
      className={cn(
        glass.base,
        glass.light,
        accentHoverClasses[accent],
        "flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <GlassIcon3D icon={Icon} accent={accent} size="md" />
        <span className="text-right">
          <span className="block font-heading text-lg font-bold text-foreground">{stat.value}</span>
          <span className="block text-[10px] text-muted-foreground">{stat.label}</span>
        </span>
      </div>
      <h3 className="mt-5 font-heading text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-primary-text"
      >
        Explore
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

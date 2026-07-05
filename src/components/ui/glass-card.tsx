import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";

export function GlassCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card"
      className={cn(glass.base, glass.light, "rounded-2xl p-6", className)}
      {...props}
    />
  );
}

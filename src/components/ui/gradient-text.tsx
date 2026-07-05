import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface GradientTextProps extends ComponentProps<"span"> {
  from?: string;
  to?: string;
}

export function GradientText({
  from = "from-primary",
  to = "to-accent",
  className,
  ...props
}: GradientTextProps) {
  return (
    <span
      data-slot="gradient-text"
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        to,
        className
      )}
      {...props}
    />
  );
}

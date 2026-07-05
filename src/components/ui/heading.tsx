import type { ComponentProps, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-heading text-foreground tracking-tight", {
  variants: {
    size: {
      sm: "text-xl md:text-2xl",
      md: "text-2xl md:text-3xl",
      lg: "text-3xl md:text-4xl",
      xl: "text-4xl md:text-5xl",
      "2xl": "text-5xl md:text-6xl",
      "3xl": "text-6xl md:text-7xl",
      hero: "text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.05] tracking-tighter",
    },
    weight: {
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  defaultVariants: {
    size: "lg",
    weight: "bold",
  },
});

interface HeadingProps
  extends Omit<ComponentProps<"h1">, "color">,
    VariantProps<typeof headingVariants> {
  as?: ElementType;
}

export function Heading({
  as: Tag = "h2",
  size,
  weight,
  className,
  ...props
}: HeadingProps) {
  return (
    <Tag
      data-slot="heading"
      className={cn(headingVariants({ size, weight }), className)}
      {...props}
    />
  );
}

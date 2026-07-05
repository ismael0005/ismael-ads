import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import type { ContainerSize } from "@/styles/containers";

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      sm: "py-12 md:py-16",
      md: "py-16 md:py-24",
      lg: "py-24 md:py-32",
      xl: "py-32 md:py-40",
    },
    tone: {
      default: "bg-transparent",
      light: "bg-brand-light text-brand-dark",
      dark: "bg-brand-dark text-brand-light",
      muted: "bg-muted text-foreground",
    },
  },
  defaultVariants: {
    spacing: "md",
    tone: "default",
  },
});

interface SectionProps
  extends ComponentProps<"section">,
    VariantProps<typeof sectionVariants> {
  container?: boolean;
  containerSize?: ContainerSize;
}

export function Section({
  spacing,
  tone,
  container = true,
  containerSize,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ spacing, tone }), className)}
      {...props}
    >
      {container ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}

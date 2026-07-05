import type { ComponentProps, CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { containerWidth, type ContainerSize } from "@/styles/containers";

interface ContainerProps extends ComponentProps<"div"> {
  size?: ContainerSize;
}

export function Container({
  size = "content",
  className,
  style,
  ...props
}: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", className)}
      style={{ maxWidth: containerWidth[size], ...(style as CSSProperties) }}
      {...props}
    />
  );
}

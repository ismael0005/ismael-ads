export const containerWidth = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "88rem",
  content: "80rem",
} as const;

export type ContainerSize = keyof typeof containerWidth;

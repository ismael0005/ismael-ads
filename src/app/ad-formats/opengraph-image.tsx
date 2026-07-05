import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ad Formats — Ismael Ads";

export default function Image() {
  return renderOgImage({ kicker: "Ad Formats", title: "Every Premium Format, Web To CTV", accent: "primary" });
}

import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ismael Ads Cookie Policy";

export default function Image() {
  return renderOgImage({ kicker: "Legal", title: "Cookie Policy", accent: "accent" });
}

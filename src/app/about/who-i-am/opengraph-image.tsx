import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Who I Am — Ismael Inacio, Founder of Ismael Ads";

export default function Image() {
  return renderOgImage({ kicker: "Who I Am", title: "15+ Years Growing Publisher Revenue", accent: "accent" });
}

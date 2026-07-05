import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ismael Ads Privacy Policy";

export default function Image() {
  return renderOgImage({ kicker: "Legal", title: "Privacy Policy", accent: "primary" });
}

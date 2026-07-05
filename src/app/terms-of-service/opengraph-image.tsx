import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ismael Ads Terms of Service";

export default function Image() {
  return renderOgImage({ kicker: "Legal", title: "Terms of Service", accent: "secondary" });
}

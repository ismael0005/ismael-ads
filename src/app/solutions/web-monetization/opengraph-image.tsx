import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Web Monetization — Ismael Ads";

export default function Image() {
  return renderOgImage({ kicker: "Web Monetization", title: "Maximize Ad Revenue On Your Website", accent: "primary" });
}

import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "App Monetization — Ismael Ads";

export default function Image() {
  return renderOgImage({ kicker: "App Monetization", title: "Turn App Inventory Into Revenue", accent: "secondary" });
}

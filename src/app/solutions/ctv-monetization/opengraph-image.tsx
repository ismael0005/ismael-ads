import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "CTV Monetization — Ismael Ads";

export default function Image() {
  return renderOgImage({ kicker: "CTV Monetization", title: "Monetize Every Connected TV Screen", accent: "accent" });
}

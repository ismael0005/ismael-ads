import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Eligibility Checker — Ismael Ads";

export default function Image() {
  return renderOgImage({ kicker: "Eligibility Checker", title: "Find Out If You Qualify For Google AdX", accent: "secondary" });
}

import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "My Mission — Ismael Ads";

export default function Image() {
  return renderOgImage({ kicker: "My Mission", title: "Sustainable Revenue, Not Short-Term Wins", accent: "primary" });
}

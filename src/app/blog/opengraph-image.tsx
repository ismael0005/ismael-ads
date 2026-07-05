import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ismael Ads Blog — Publisher Insights & Revenue Growth";

export default function Image() {
  return renderOgImage({ kicker: "Publisher Knowledge Hub", title: "Publisher Insights & Revenue Growth", accent: "accent" });
}

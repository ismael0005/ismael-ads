import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ismael Ads — AdTech Monetization Platform";

export default function Image() {
  return renderOgImage({
    kicker: "AdTech Monetization Platform",
    title: "Turn Every Impression Into Maximum Revenue",
  });
}

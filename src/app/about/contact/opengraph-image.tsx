import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Contact Ismael Ads";

export default function Image() {
  return renderOgImage({ kicker: "Contact", title: "Let's Build Your Revenue Growth Together", accent: "secondary" });
}

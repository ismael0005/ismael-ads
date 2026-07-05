import { ImageResponse } from "next/og";

import type { Accent } from "@/lib/accent";

export const ogImageSize = { width: 1200, height: 630 } as const;
export const ogImageContentType = "image/png";

const ACCENT_GRADIENT: Record<Accent, string> = {
  primary: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 45%, #2563eb 100%)",
  secondary: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #2563eb 100%)",
  accent: "linear-gradient(135deg, #0c1a2e 0%, #0e7490 45%, #22d3ee 100%)",
};

interface RenderOgImageInput {
  kicker: string;
  title: string;
  accent?: Accent;
}

/**
 * Shared branded OG/Twitter card renderer — every route's thin
 * `opengraph-image.tsx` calls this with its own kicker/title/accent so social
 * previews are distinct per page instead of one generic site-wide banner.
 */
export function renderOgImage({ kicker, title, accent = "primary" }: RenderOgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: ACCENT_GRADIENT[accent],
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              display: "flex",
              background: "linear-gradient(135deg, #6d28d9, #22d3ee)",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, color: "white", letterSpacing: 1 }}>
            ISMAEL<span style={{ color: "#67e8f9", marginLeft: 10 }}>ADS</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: "#a5b4fc" }}>
            {kicker}
          </div>
          <div style={{ display: "flex", fontSize: 62, fontWeight: 800, lineHeight: 1.15, color: "white" }}>{title}</div>
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}

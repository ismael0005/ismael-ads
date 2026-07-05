import { ImageResponse } from "next/og";

/** Shared brand-mark renderer for favicon/apple-touch-icon/PWA icons — same gradient chip used in the OG image wordmark, scaled to whatever size the caller needs. */
export function renderAppIcon(sizePx: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6d28d9, #22d3ee)",
          borderRadius: sizePx * 0.22,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: sizePx * 0.56,
            fontWeight: 800,
            fontFamily: "sans-serif",
          }}
        >
          I
        </div>
      </div>
    ),
    { width: sizePx, height: sizePx }
  );
}

// One-off/regenerate script: renders the premium, brand-accurate default
// Open Graph share image to public/og-image.png using next/og's ImageResponse
// (same satori-based renderer the per-route opengraph-image.tsx files use),
// so it stays a static file rather than a request-time render.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og.js";

const ROOT = process.cwd();
const LOGO_ICON = path.join(ROOT, "public/assets/logos/logo-icon.png");
const OUT = path.join(ROOT, "public/og-image.png");

const WIDTH = 1200;
const HEIGHT = 630;

function h(type, props = {}, children) {
  return { type, props: { ...props, ...(children !== undefined ? { children } : {}) } };
}

async function loadFont(family, weight) {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`).then((r) => r.text());
  const url = css.match(/url\(([^)]+)\)/)[1];
  const buf = await fetch(url).then((r) => r.arrayBuffer());
  return { name: family, data: buf, weight, style: "normal" };
}

async function main() {
  const [sora800, sora700, geist400, geist600] = await Promise.all([
    loadFont("Sora", 800),
    loadFont("Sora", 700),
    loadFont("Geist", 400),
    loadFont("Geist", 600),
  ]);

  const logoMeta = await sharp(LOGO_ICON).metadata();
  const logoDisplayWidth = 52;
  const logoDisplayHeight = Math.round((logoDisplayWidth * logoMeta.height) / logoMeta.width);
  const logoBuffer = await sharp(LOGO_ICON).resize(logoDisplayWidth * 3, logoDisplayHeight * 3).png().toBuffer();
  const logoDataUri = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  const glow = (top, left, size, color) =>
    h("div", {
      style: {
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 50%, ${color} 0%, rgba(0,0,0,0) 68%)`,
        display: "flex",
      },
    });

  const bar = (height, gradient) =>
    h("div", {
      style: {
        display: "flex",
        width: 26,
        height,
        borderRadius: "8px 8px 3px 3px",
        background: gradient,
      },
    });

  const barHeights = [38, 58, 46, 84, 66, 104, 90];
  const barGradients = barHeights.map((_, i) =>
    i >= 5 ? "linear-gradient(180deg, #22D3EE, #0E7490)" : "linear-gradient(180deg, #A78BFA, #5B21B6)"
  );

  const dashboardCard = h(
    "div",
    {
      style: {
        position: "absolute",
        top: 92,
        right: 60,
        width: 380,
        height: 244,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 28,
        borderRadius: 30,
        background: "rgba(255,255,255,0.055)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        transform: "rotate(3deg)",
      },
    },
    [
      h(
        "div",
        { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
        [
          h("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, [
            h("div", { style: { display: "flex", fontSize: 15, color: "rgba(255,255,255,0.55)", fontFamily: "Geist", fontWeight: 400 } }, "Publisher Revenue"),
            h("div", { style: { display: "flex", fontSize: 32, color: "white", fontFamily: "Sora", fontWeight: 800 } }, "$482,940"),
          ]),
          h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                background: "rgba(74,222,128,0.16)",
                color: "#4ADE80",
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 15,
                fontFamily: "Geist",
                fontWeight: 600,
              },
            },
            "+248%"
          ),
        ]
      ),
      h(
        "div",
        { style: { display: "flex", alignItems: "flex-end", gap: 12, height: 112 } },
        barHeights.map((height, i) => bar(height, barGradients[i]))
      ),
    ]
  );

  const statCard = h(
    "div",
    {
      style: {
        position: "absolute",
        top: 356,
        right: 78,
        width: 216,
        height: 118,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 8,
        padding: 22,
        borderRadius: 24,
        background: "rgba(255,255,255,0.065)",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        transform: "rotate(-4deg)",
      },
    },
    [
      h("div", { style: { display: "flex", fontSize: 14, color: "rgba(255,255,255,0.55)", fontFamily: "Geist", fontWeight: 400 } }, "Fill Rate"),
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 8 } },
        [
          h("div", { style: { display: "flex", fontSize: 27, color: "white", fontFamily: "Sora", fontWeight: 800 } }, "98.6%"),
          h("div", {
            style: {
              display: "flex",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderBottom: "10px solid #4ADE80",
            },
          }),
        ]
      ),
    ]
  );

  const vignette = h("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 260,
      background: "linear-gradient(180deg, rgba(9,11,24,0) 0%, rgba(6,7,17,0.6) 100%)",
      display: "flex",
    },
  });

  const brandRow = h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 16 } },
    [
      h("img", { src: logoDataUri, width: logoDisplayWidth, height: logoDisplayHeight, style: { display: "flex" } }),
      h(
        "div",
        { style: { display: "flex", fontSize: 26, fontFamily: "Sora", fontWeight: 800, color: "white", letterSpacing: 2 } },
        [
          h("span", {}, "ISMAEL"),
          h("span", { style: { color: "#B9AEFF", marginLeft: 10 } }, "ADS"),
        ]
      ),
    ]
  );

  const headline = h(
    "div",
    { style: { display: "flex", flexDirection: "column", fontFamily: "Sora", fontWeight: 800, fontSize: 50, lineHeight: 1.2, color: "white", width: 660 } },
    "Turn Every Impression Into Maximum Revenue"
  );

  const subtitle = h(
    "div",
    { style: { display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 28, color: "#B9AEFF", marginTop: 22, width: 660 } },
    "Premium Publisher Monetization Platform"
  );

  const footer = h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 12 } },
    [
      h("div", { style: { display: "flex", width: 7, height: 7, borderRadius: 4, background: "#6D4AFF" } }),
      h(
        "div",
        { style: { display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 22, color: "rgba(255,255,255,0.62)", letterSpacing: 0.5 } },
        "www.ismaelads.com"
      ),
    ]
  );

  const content = h(
    "div",
    {
      style: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 76px",
      },
    },
    [brandRow, h("div", { style: { display: "flex", flexDirection: "column" } }, [headline, subtitle]), footer]
  );

  const root = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "linear-gradient(135deg, #060714 0%, #0B0D1F 48%, #0A0E20 100%)",
      },
    },
    [glow(-180, -180, 560, "rgba(109,74,255,0.5)"), glow(180, 760, 520, "rgba(37,99,235,0.4)"), dashboardCard, statCard, vignette, content]
  );

  const response = new ImageResponse(root, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [sora800, sora700, geist400, geist600],
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(OUT, buffer);
  console.log("OG image written:", OUT, buffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

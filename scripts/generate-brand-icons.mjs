// One-off/regenerate script: builds the full favicon/PWA icon set from the
// official logo mark (public/assets/logos/logo-icon.png). Re-run this any
// time the source logo changes — outputs are static files, not runtime routes.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const LOGO_ICON = path.join(ROOT, "public/assets/logos/logo-icon.png");
const PUBLIC = path.join(ROOT, "public");
const APP = path.join(ROOT, "src/app");

const BRAND_PURPLE = "#6D4AFF";
const BRAND_DEEP = "#2A1470";
const BRAND_INK = "#0E0A1F";

function tileSvg() {
  return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${BRAND_PURPLE}"/>
        <stop offset="55%" stop-color="${BRAND_DEEP}"/>
        <stop offset="100%" stop-color="${BRAND_INK}"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="100" height="100" rx="22" fill="url(#g)"/>
  </svg>`;
}

/** Rounded gradient tile with the logo mark centered on top — the shared "app icon" look used for every favicon/PWA size. */
async function makeTile(size, logoScale = 0.64) {
  const bg = await sharp(Buffer.from(tileSvg())).resize(size, size).png().toBuffer();

  const logoMeta = await sharp(LOGO_ICON).metadata();
  const logoWidth = Math.round(size * logoScale);
  const logoHeight = Math.round((logoWidth * logoMeta.height) / logoMeta.width);
  const logo = await sharp(LOGO_ICON).resize(logoWidth, logoHeight).png().toBuffer();

  return sharp(bg)
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toBuffer();
}

/** Minimal ICO encoder — modern ICO frames can just be embedded PNGs (supported since Vista), so no bitmap conversion needed. */
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  const imageData = [];
  let offset = headerSize + dirSize;

  for (const { size, buffer } of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 == 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    imageData.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageData]);
}

async function main() {
  const [favicon16, favicon32, favicon48, apple180, android192, android512, mstile150] = await Promise.all([
    makeTile(16),
    makeTile(32),
    makeTile(48),
    makeTile(180),
    makeTile(192),
    makeTile(512),
    makeTile(150),
  ]);

  await writeFile(path.join(PUBLIC, "favicon-16x16.png"), favicon16);
  await writeFile(path.join(PUBLIC, "favicon-32x32.png"), favicon32);
  await writeFile(path.join(PUBLIC, "apple-touch-icon.png"), apple180);
  await writeFile(path.join(PUBLIC, "android-chrome-192x192.png"), android192);
  await writeFile(path.join(PUBLIC, "android-chrome-512x512.png"), android512);
  await writeFile(path.join(PUBLIC, "mstile-150x150.png"), mstile150);

  const ico = buildIco([
    { size: 16, buffer: favicon16 },
    { size: 32, buffer: favicon32 },
    { size: 48, buffer: favicon48 },
  ]);
  await writeFile(path.join(APP, "favicon.ico"), ico);

  // favicon.svg — scalable wrapper embedding the high-res tile. No true vector
  // source exists for the logo mark, so this is a raster-in-SVG best effort
  // (still fully valid as a scalable favicon; sharp at any display size).
  const svgTile512 = await makeTile(512);
  const svgTileB64 = svgTile512.toString("base64");
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${svgTileB64}" width="512" height="512"/>
</svg>
`;
  await writeFile(path.join(PUBLIC, "favicon.svg"), faviconSvg);

  // safari-pinned-tab.svg — black silhouette of the logo mark. Safari deprecated
  // per-tab tinted-mask-icon support after Safari 12, but the file is still
  // requested by legacy tooling/link-checkers, so we ship a best-effort silhouette.
  const logoMeta = await sharp(LOGO_ICON).metadata();
  const silhouetteWidth = 400;
  const silhouetteHeight = Math.round((silhouetteWidth * logoMeta.height) / logoMeta.width);
  // dest-in: keep the solid-black base, masked by the logo's own alpha shape —
  // this is a flat silhouette, unlike tint() which recolors while preserving
  // the original luminance (so light strokes would stay light, not solid black).
  const blackBase = await sharp({
    create: { width: logoMeta.width, height: logoMeta.height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } },
  })
    .composite([{ input: LOGO_ICON, blend: "dest-in" }])
    .png()
    .toBuffer();
  const silhouette = await sharp(blackBase).resize(silhouetteWidth, silhouetteHeight).png().toBuffer();
  const silhouetteB64 = silhouette.toString("base64");
  const pinnedTabSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${silhouetteWidth} ${silhouetteHeight}" width="${silhouetteWidth}" height="${silhouetteHeight}">
  <image href="data:image/png;base64,${silhouetteB64}" width="${silhouetteWidth}" height="${silhouetteHeight}"/>
</svg>
`;
  await writeFile(path.join(PUBLIC, "safari-pinned-tab.svg"), pinnedTabSvg);

  const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>${BRAND_PURPLE}</TileColor>
    </tile>
  </msapplication>
</browserconfig>
`;
  await writeFile(path.join(PUBLIC, "browserconfig.xml"), browserconfig);

  const manifest = {
    name: "Ismael Ads",
    short_name: "Ismael Ads",
    description:
      "Helping publishers maximize revenue across Web, Apps, and CTV through premium Google Ad Manager, Header Bidding, Ad Optimization, and data-driven monetization strategies.",
    start_url: "/",
    display: "standalone",
    background_color: "#090B18",
    theme_color: BRAND_PURPLE,
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
  await writeFile(path.join(PUBLIC, "site.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");

  console.log("Brand icon set generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

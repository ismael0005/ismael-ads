import type { NextConfig } from "next";

/**
 * Deliberately permissive enough not to break Next's own inline hydration
 * script, the site-wide JSON-LD <script> tags, and the (currently disabled
 * unless NEXT_PUBLIC_GA_ID is set) GA4 loader — tighten to nonce-based
 * script-src once none of those need 'unsafe-inline' anymore.
 *
 * 'unsafe-eval' is only added in development — Next/Turbopack's dev-mode
 * HMR runtime uses eval() for fast refresh. Production never needs it.
 */
const isDev = process.env.NODE_ENV === "development";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Browsers ignore this over plain HTTP in local dev, so it's safe to always send.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // 31 days — brand/character assets essentially never change
  },
  async headers() {
    return [
      {
        // Applies to every route — security headers should be global, not opt-in per page.
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      {
        // Static brand/character/icon assets under public/assets — Next doesn't
        // set long-lived cache headers for public/ files automatically, only for
        // hashed /_next/static output, so this has to be explicit.
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Static favicon/PWA/manifest assets at the public root — same rationale
        // as /assets above; these are brand files that only change when the logo does.
        source: "/(favicon.ico|favicon.svg|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|android-chrome-192x192.png|android-chrome-512x512.png|mstile-150x150.png|safari-pinned-tab.svg|browserconfig.xml|site.webmanifest|og-image.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, immutable",
          },
        ],
      },
      {
        // Sitemap/robots change when content is published — cache briefly at the
        // edge instead of either the default no-store or a year-long immutable cache.
        source: "/(sitemap.xml|robots.txt)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

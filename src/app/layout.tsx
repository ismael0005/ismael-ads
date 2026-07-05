import type { Metadata, Viewport } from "next";
import { MotionConfig } from "framer-motion";

import { ThemeProvider } from "@/components/common/theme-provider";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll-provider";
import { PageTransition } from "@/components/animations/page-transition";
import { CustomCursor } from "@/components/animations/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLdScript } from "@/components/common/json-ld-script";
import { GoogleAnalytics } from "@/components/common/google-analytics";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import { jsonLdGraph, organizationSchema, personSchema, websiteSchema } from "@/lib/json-ld";

import "./globals.css";

/** Organization + Person + WebSite are true site-wide entities, so they're emitted once here rather than per-page. */
const SITE_JSON_LD = jsonLdGraph(organizationSchema(), personSchema(), websiteSchema());

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author }],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  // Populated from hosting env vars once real Search Console / Bing Webmaster
  // properties exist — omitted (not rendered) when unset rather than shipping
  // a placeholder verification code.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#070b1a" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:no-underline focus:shadow-lg focus:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Skip to main content
        </a>
        <JsonLdScript data={SITE_JSON_LD} />
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* reducedMotion="user" makes every motion.* component site-wide respect the OS prefers-reduced-motion setting automatically. */}
          <MotionConfig reducedMotion="user">
            <SmoothScrollProvider>
              <CustomCursor />
              <Navbar />
              <main id="main-content" className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </SmoothScrollProvider>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}

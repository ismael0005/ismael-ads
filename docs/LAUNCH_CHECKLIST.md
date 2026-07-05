# Pre-Launch Checklist

Things to confirm or finish before this site goes live at its real domain.
Checked items are already done in the codebase as of this pass; unchecked
items need a decision or action from you before launch.

## Done in this pass

- [x] `robots.txt` (`src/app/robots.ts`) — allows all crawlers plus AI search
      bots (GPTBot, PerplexityBot, ClaudeBot, etc.), points at the sitemap
- [x] `sitemap.xml` (`src/app/sitemap.ts`) — auto-includes every static page
      and all 32 blog posts from `blogPosts`
- [x] Favicon, app icon, Apple touch icon, and PWA icons (192/512) — all
      generated from the brand mark, no external dependency
- [x] `manifest.webmanifest` (`src/app/manifest.ts`)
- [x] OG image + Twitter card image per route (`opengraph-image.tsx` files)
- [x] Browser theme-color (light/dark aware, matches actual background colors)
- [x] Custom 404 page (`src/app/not-found.tsx`)
- [x] Loading state (`src/app/loading.tsx`)
- [x] Analytics integration point (GA4, env-gated — off until configured)
- [x] Search Console / Bing verification meta tags (env-gated — off until configured)
- [x] Security headers (CSP, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy)
- [x] Compression enabled explicitly, cache headers tuned per asset type
- [x] Legal pages: Privacy Policy, Terms of Service, Cookie Policy
- [x] Full accessibility (WCAG 2.1 AA, axe-core), SEO metadata, and broken-link sweep — zero issues

## Needs a decision before launch

- [ ] **Real domain confirmed.** `src/lib/site-config.ts`'s `url` is
      `https://www.ismaelads.com` — confirm this is the actual production
      domain before launch, since it's baked into `metadataBase`, the
      sitemap, JSON-LD, and canonical URLs.
- [ ] **Contact form and eligibility checker have no backend yet.** Both
      forms currently render and validate client-side but don't submit
      anywhere. Decide on a submission path (an API route + email service,
      or a third-party form backend) before launch — right now, submitting
      either form does nothing.
- [ ] **Analytics.** Set `NEXT_PUBLIC_GA_ID` once you have a GA4 property, or
      swap in a different analytics provider if you'd rather not use Google
      Analytics. The Cookie Policy currently states no analytics cookies are
      set — update that page's content in the same change you enable analytics.
- [ ] **Google Search Console property.** Create the property for the real
      domain, get the HTML-tag verification code, set
      `GOOGLE_SITE_VERIFICATION`.
- [ ] **Bing Webmaster Tools property.** Same as above; set
      `BING_SITE_VERIFICATION`. Bing also lets you import directly from an
      already-verified Search Console property, which is faster than
      re-verifying manually.
- [ ] **Social profile links.** `siteConfig.links` (twitter, linkedin) and
      `contactInfo.linkedin` — confirm these point at real, live profiles
      before launch; `organizationSchema()`'s `sameAs` field publishes
      whatever's there as a machine-readable identity claim.
- [ ] **Real contact email deliverability.** Confirm `hello@ismaelads.com`
      and `publisher@ismaelads.com` are live inboxes someone is actually
      monitoring before launch, since they're printed on every legal page
      and the contact page.

## Recommended but not blocking

- [ ] Run Lighthouse (or PageSpeed Insights against the real deployed URL,
      not localhost) once DNS is live — CDN/edge latency changes real-world
      numbers versus a local build.
- [ ] Decide whether to tighten the CSP's `script-src`/`style-src` away from
      `'unsafe-inline'` toward a nonce-based policy — left permissive for
      launch to avoid breaking Next's hydration script and the JSON-LD tags;
      see the comment in `next.config.ts`.
- [ ] If you want a cookie-consent banner ahead of enabling analytics in
      EU-facing traffic, build that before setting `NEXT_PUBLIC_GA_ID`, not
      after.

# Cloudflare Setup Recommendations

These apply whether Cloudflare sits in front of Vercel/another host as a
proxy+DNS layer, or you deploy directly to Cloudflare Pages. Settings live in
the Cloudflare dashboard under the domain → the tab noted in parentheses.

## DNS

- Proxy status: **Proxied (orange cloud)** for the root domain and `www`, so
  Cloudflare's CDN, WAF, and DDoS protection actually apply.
- Add a `CNAME` (or `A`/`AAAA` per your host's instructions) for the apex and
  `www` records pointing at your hosting provider.
- SSL/TLS mode: **Full (strict)** — never "Flexible," which causes redirect
  loops with hosts that already terminate TLS themselves (Vercel, Cloudflare
  Pages, etc. all do).

## Critical: Turn Off Rocket Loader

**(Speed → Optimization)** — Rocket Loader rewrites `<script>` tags to defer
them, which breaks React hydration timing on Next.js apps in ways that are
hard to diagnose (event handlers silently not attaching, hydration mismatches
that only show up for some users). Leave this **off**.

## Speed / Optimization

- **Auto Minify**: leave JS/CSS minification off — Next's build already
  minifies everything, and Cloudflare re-minifying can occasionally corrupt
  already-minified output. HTML minify is generally safe to leave on.
- **Brotli**: on. Cloudflare will serve Brotli to clients that support it on
  top of whatever compression the origin sends, at no cost.
- **Early Hints**: on, if available on your plan — lets the browser start
  fetching critical resources before the full HTML response arrives.
- **HTTP/3 (with QUIC)**: on.
- **0-RTT Connection Resumption**: on.

## Caching

- **Caching Level**: Standard.
- **Browser Cache TTL**: Respect Existing Headers — the app already sets
  explicit `Cache-Control` per route type (see `next.config.ts`): long-lived
  immutable caching for `/assets/*` and generated icons, short edge caching
  for `/sitemap.xml` and `/robots.txt`, and Next's own immutable caching for
  hashed `/_next/static/*` bundles. Don't override these with a blanket
  Cloudflare TTL — it will fight the origin's own cache strategy.
- Add a **Cache Rule** (Rules → Cache Rules) to cache everything under
  `/_next/static/*` and `/assets/*` at the edge aggressively (`Eligible for
  cache`, respect origin TTL) — these are the biggest win for repeat visitors.
- Do **not** cache `/api/*` routes or any future authenticated routes at the
  edge if they're added later.

## Security

- **Always Use HTTPS**: on (Rules → redirect http → https, or the toggle
  under SSL/TLS → Edge Certificates).
- **HSTS**: enable via SSL/TLS → Edge Certificates, matching the
  `Strict-Transport-Security` header already sent by the app
  (`max-age=63072000; includeSubDomains; preload`) — Cloudflare's HSTS toggle
  and the app-level header are complementary, not conflicting.
- **WAF managed rules**: on, default Cloudflare Managed Ruleset. Low risk of
  false positives for a standard marketing site with no admin panel.
- **Bot Fight Mode** (or Super Bot Fight Mode on paid plans): on — this is
  directly relevant given how much of the blog content on this site discusses
  traffic-quality signals; keeping obvious bot traffic off your own analytics
  keeps your numbers honest too.
- **Rate limiting** on the contact form and eligibility-checker submission
  paths once they're wired to a real backend, to prevent spam submissions
  (Security → WAF → Rate limiting rules). Not urgent while those forms have
  no live backend integration yet — see the launch checklist.

## What Not To Touch

- **Rocket Loader** — covered above, keep off.
- **Mirage / Polish (image optimization)** — Next already serves AVIF/WebP
  with correct `Cache-Control` via `next/image`. Cloudflare's image
  optimizations layered on top add processing latency for no real gain here
  and can occasionally re-encode already-optimized images larger, not
  smaller.
- **Email Obfuscation** — safe to leave on, but verify it doesn't mangle the
  `mailto:` links on `/about/contact` and the legal pages after enabling it.

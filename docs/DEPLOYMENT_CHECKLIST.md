# Deployment Checklist

Steps for the actual deploy, in order. Assumes a git-based deploy (Vercel,
Cloudflare Pages, or similar) triggered from the `main` branch.

## 1. Environment variables

Set these in the hosting provider's dashboard (see `.env.example` for the
full list and where each value comes from). None are required for the site
to build and run — set only the ones you're ready to use:

- [ ] `NEXT_PUBLIC_GA_ID` (optional — analytics stays off without it)
- [ ] `GOOGLE_SITE_VERIFICATION` (optional)
- [ ] `BING_SITE_VERIFICATION` (optional)

## 2. Build verification (do this locally first)

```bash
npm run build
```

Confirm:
- [ ] Build completes with no errors or warnings
- [ ] `tsc --noEmit` is clean
- [ ] `eslint` is clean
- [ ] All ~103 routes listed in the build output generate successfully,
      including all 32 `/blog/[slug]` pages and their `opengraph-image` variants

## 3. DNS and domain

- [ ] Domain's DNS records point at the hosting provider (see
      `docs/CLOUDFLARE.md` if Cloudflare is in front)
- [ ] SSL certificate is issued and active (most hosts do this automatically
      once DNS resolves)
- [ ] `www` and apex domain both resolve, with one redirecting to the other
      (pick one as canonical — `siteConfig.url` currently assumes `www`)

## 4. Deploy

- [ ] Merge to the branch your host deploys from
- [ ] Watch the build log on the hosting provider — a clean local build does
      not guarantee a clean remote build if environment variables differ
- [ ] Once live, hit the deployed URL directly (not through Cloudflare's
      cache yet) to confirm the app actually renders before flipping any
      proxy/DNS settings

## 5. Immediately after deploy

- [ ] Visit the live site in both light and dark mode
- [ ] Submit-test the contact form and eligibility checker (see the open
      item in `LAUNCH_CHECKLIST.md` about these having no backend yet —
      don't skip wiring this before real users hit it)
- [ ] Check `https://yourdomain.com/robots.txt` and
      `https://yourdomain.com/sitemap.xml` resolve and contain the expected
      content
- [ ] Check `https://yourdomain.com/manifest.webmanifest` resolves
- [ ] Run the site through
      [Facebook's Sharing Debugger](https://developers.facebook.com/tools/debug/)
      and [Twitter/X Card Validator] equivalents (or just paste the URL into
      a Slack/Discord message) to confirm OG images render correctly on the
      real domain — OG image crawlers cache aggressively, so check this
      before the domain gets shared anywhere important
- [ ] Confirm security headers are present on the live domain:
      `curl -sI https://yourdomain.com/ | grep -i "content-security-policy\|strict-transport"`

## 6. Search engine submission

- [ ] Submit the sitemap URL in Google Search Console
      (`https://yourdomain.com/sitemap.xml`)
- [ ] Submit the sitemap URL in Bing Webmaster Tools
- [ ] Request indexing for the homepage and a couple of top-priority pages
      manually in Search Console rather than waiting for organic crawl

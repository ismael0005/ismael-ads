# Post-Launch Checklist

Things to check in the days and weeks after the site goes live, not on
launch day itself.

## First 48 hours

- [ ] Watch real-user Core Web Vitals in Search Console (takes a few days to
      populate) or a monitoring tool — lab data from a local build doesn't
      reflect real device/network conditions
- [ ] Check hosting provider's error/log dashboard for any 500s or crashes
      that didn't show up in local testing
- [ ] Confirm the sitemap was actually fetched by Googlebot (Search
      Console → Sitemaps shows last-read date and any errors)
- [ ] If analytics is enabled, confirm real traffic is actually showing up
      in GA4 within a few hours — a silent misconfiguration (wrong
      measurement ID, CSP blocking the script) is easy to miss otherwise

## First week

- [ ] Check Search Console's Coverage report for any pages marked
      "Discovered, not indexed" or "Crawled, not indexed" — with 32+ blog
      posts launching at once, Google may take a while to index all of them
- [ ] Check Search Console's Core Web Vitals report once it has enough
      data — confirm the ad-free, character-illustration-based design isn't
      producing any surprise LCP/CLS regressions on real traffic
- [ ] Spot-check a handful of blog article URLs directly in Google (`site:
      yourdomain.com/blog/`) to confirm they're indexed and showing the
      correct title/description in search results
- [ ] If the contact form or eligibility checker got a real backend wired up
      before launch, confirm submissions are actually arriving somewhere a
      human checks — test this end-to-end with a real submission, not just
      a UI smoke test

## Ongoing / monthly

- [ ] Re-run the accessibility (axe-core) and broken-link sweep after any
      significant content or design change — see the QA scripts referenced
      in this session's work for the pattern to reuse
- [ ] Review Search Console's Manual Actions and Security Issues reports —
      thirty-second check, catches anything serious immediately
- [ ] Revisit `docs/LAUNCH_CHECKLIST.md`'s "needs a decision" section — items
      like the cookie-consent banner or CSP tightening are fine to defer past
      launch, but shouldn't be forgotten indefinitely
- [ ] As new blog articles get added, spot-check that reading time, FAQ
      schema, and internal links still render correctly on a sample of new
      posts — the pattern established for the 32-article launch set should
      hold, but worth a periodic sanity check
- [ ] Review the CSP's `connect-src`/`script-src` allowlist if any new
      third-party script or embed gets added to the site later — the current
      policy only allows Google Analytics domains and will silently block
      anything else until updated

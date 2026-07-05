import Script from "next/script";

/**
 * Loads GA4 only when NEXT_PUBLIC_GA_ID is actually set — renders nothing in
 * local dev or any deploy that hasn't configured a measurement ID yet, so we
 * never ship a broken or placeholder tracking snippet. `afterInteractive`
 * defers it behind hydration so it can't compete with LCP.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

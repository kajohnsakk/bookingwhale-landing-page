# SEO migration — 28 October 2026

This is a local implementation. Nothing has been deployed or confirmed newly indexed by Google. The existing production sitemap was resubmitted successfully on 28 October 2026 after the Search Console audit; processing is pending. See `search-console-review.md` for current findings.

## Content and routes

The production sitemap was fetched on 28 October 2026. Its 90 URLs are recorded in `src/seo/legacy-urls.json`. Every URL now has generated content or an explicit permanent redirect destination in this project.

- 79 Thai articles and their existing WebP images were migrated from `/Users/thisguyissohot/Desktop/labs/landing-page`.
- `/blog/` has seven crawlable index pages with 12 articles per page. Each pagination page has its own canonical.
- Article URLs retain `/blog/<slug>/`. Publication and update dates are retained, rather than reset to the migration date.
- Duplicate article H1s were removed. Broken article links to `//#services`, `//#features`, `/#services` and `/blog/th/<slug>` were corrected to existing targets.
- `/contact/`, `/en/contact/`, `/privacy-policy/` and `/terms/` are included locally. Legal body text and its original update date are preserved; this was not a legal-content review.
- The existing Thai and English restaurant and fitness business routes now contain distinct workflow explanations. A services page was added in both languages. New copy describes the booking capabilities already demonstrated by the homepage and explicitly calls for checking special requirements before starting.
- The homepage business card headings link to relevant business pages, and its footer links to the article index and two existing articles. Existing animation source and timings were not changed.
- `/rss.xml` remains available with all 79 articles.
- `/404.html` is provided with `noindex`; the host must return a genuine HTTP 404 status for missing URLs.

The generated sitemap has 99 indexable pages: three homepages, 79 articles, seven blog index pages, six business pages, two contact pages and two legal pages. Redirect sources, the 404 page and decorative previews are excluded.

## Metadata and rendering

Every indexable page has a unique title and description, one H1, an absolute self-canonical, and social metadata. The shared site schema identifies the existing Organization and WebSite. Content pages add matching WebPage and BreadcrumbList data; articles add BlogPosting with the actual preserved dates and image. No new ratings, reviews, prices or author identity were invented.

Homepages retain reciprocal English, Thai and Simplified Chinese alternates. Business/contact pages have reciprocal Thai/English alternates. Thai-only blog pages and English-only legal pages do not claim translations that do not exist. Alternate groups are shared between HTML and sitemap through `src/seo/routes.mjs`.

Content pages render as static HTML and use a separate small stylesheet. They do not load the homepage GSAP bundle, hero preloads or scroll initialization. They reuse the existing contact dialog and production-only GA tag/events. The pruning configuration retains Markdown prose styles, including tables.

## Redirects and hosting

`vercel.json` belongs at the Vercel project's configured root (`bookingwhale-astro`). It configures permanent redirects and trailing slashes:

| Source | Destination |
| --- | --- |
| `/th` | `/` |
| `/cookies` | `/privacy-policy/` |
| `/blog/choosing-right-queue-booking-system-for-your-business` | `/blog/online-queue-booking-system-guide/` |

Astro also generates redirect HTML as a static fallback. A static HTML redirect alone is not an HTTP 301/308. Vercel's permanent redirect produces a host-level 308; if deploying to another host, configure the same map there with 301 or 308. Do not replace missing article URLs with a blanket redirect to the homepage.

The Search Console audit confirmed 47 homepage clicks, with 46 of all clicks from Thailand. The implementation now preserves production language URLs: Thai `/`, English `/en/`, and Chinese `/zh/`. `/th/` permanently redirects to `/`; English no longer redirects to Thai. Canonical, hreflang, sitemap and language links agree with this mapping. No automatic language/IP redirects were added.

## Editorial limitation

Most existing article bodies were migrated, not independently fact-checked. The LINE OA setup guide, yoga and nail-salon articles were substantively rewritten after the GSC audit, with original publication dates retained and modification dates set to 28 October 2026. Some legacy articles contain numerical marketing claims, package/pricing information and feature descriptions. Those are not evidence of current supported features or commercial offers. Before publishing a refreshed article, confirm its claims, sources and product applicability; update its visible copy and modification date together. The new business pages do not repeat those unverified claims. No pricing, trial, customer-logo or testimonial content was invented to fill gaps.

## Validation

- Build and Astro check pass with zero errors, warnings or hints.
- All 27 tests pass, including all 90 production URLs, canonical and hreflang consistency, unique metadata, article dates, one H1 per page, internal links/assets, RSS count and reachability of all 99 indexable pages from ordinary homepage links.
- Browser checks cover seven representative pages at 390×844, 834×1194 and 1440×1000, totaling 21 page/viewport checks. No document overflow, broken loaded images or browser script errors were found. Contact modal open, close and viewport bounds passed.
- Mobile and desktop screenshots of representative pages were visually reviewed.
- Lighthouse reports and browser results are in `../../outputs/seo-implementation-2026-10-28/`. Tests use local HTTP/2/gzip with the real Google tag loaded and analytics requests intercepted, not sent to the live property.

These checks do not guarantee rankings, rich results or real-device performance.

## Production checklist

1. Build with the final HTTPS `SITE_URL`; keep staging `noindex` at the host level and remove that restriction only on production.
2. Preserve `googlee32eeeae4c95b322.html` for the existing verification method.
3. Verify every inventory URL returns the intended 200 page or permanent redirect; verify slash/hostname/HTTPS rules, no redirect chains, and true 404 responses for missing pages.
4. Check `/robots.txt`, `/sitemap-index.xml`, `/sitemap-0.xml` and `/rss.xml` on the production host. Ensure production has no accidental `noindex` or `X-Robots-Tag: noindex`.
5. Submit the sitemap index in the existing Search Console property. Inspect `/`, `/en/`, one business page and two migrated articles for rendering, canonical selection and indexing eligibility. Local tools cannot confirm these results.
6. Check contact-modal, LINE, phone and email events in GA4 after release. Do not count testing traffic as real leads.
7. Monitor indexing/404 reports and organic impressions/clicks for migrated URLs. Compare periods with enough real traffic; Lighthouse SEO 100 is a technical checklist, not a ranking score.

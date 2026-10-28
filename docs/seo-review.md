# SEO implementation review

Update, 28 October 2026: [the migration implementation](seo-migration.md) now includes articles, business/contact/legal pages, internal links and host redirect configuration. The sections below describe the original 26 October homepage audit; its route-preservation TODO has now been implemented locally.

Reviewed 26 October 2026. Scope: the local Booking Whale landing page and its English, Thai and Simplified Chinese routes. A delegated SEO specialist reviewed and implemented the metadata, schema and sitemap changes; the main agent reviewed integration, preview indexability, headings and social artwork.

The site now provides localized search metadata and connected structured data in its initial static HTML. Its three public landing pages retain reciprocal language links, while the fourteen decorative preview documents explicitly opt out of indexing. These changes improve the technical foundation; production indexing, rankings and field Core Web Vitals have not been measured.

## Implemented

| Area | Result |
| --- | --- |
| Search copy | Unique titles and descriptions for `/`, `/th/`, `/zh/`, describing online booking through LINE OA and actual tables, classes and service features |
| Default language | English at `/`; explicit Thai and Simplified Chinese URLs, with crawlable language-switch links |
| Canonical URLs | Self-referencing, absolute canonical URLs with a consistent trailing slash |
| Language annotations | Reciprocal `en`, `th`, `zh-Hans`, and English `x-default` in HTML and XML sitemap |
| Structured data | Linked Organization, WebSite and localized WebPage entities with existing contact details and brand assets |
| Social sharing | Localized 1200 × 630 PNG cards, Open Graph and Twitter large-image tags, image dimensions and accessible descriptions |
| Preview indexability | `noindex` on 9 localized iframe documents, 3 original snapshots and 2 legacy demo HTML documents |
| Robots and sitemap | Public pages remain crawlable; preview documents stay out of the sitemap; robots.txt references the sitemap index |
| Headings | One H1 per locale; accessible H2 labels the booking walkthrough before its H3 chapters |
| Rendering | Metadata, schema, translated copy and language links exist without client JavaScript |
| Runtime cost | No additional browser JavaScript or third-party tracking; social images are metadata references, not extra page images |

The previous sitemap already contained valid reciprocal language links, including the root English URL. This was preserved and extended with `x-default`; it was not a broken implementation.

The preview URLs remain crawlable so search engines can read their `noindex` directives. Disallowing those URLs in robots.txt would prevent Google from seeing that directive. [Google: block indexing](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

Language annotations use separate URLs with self-references and return links, following [Google's localized-version guidance](https://developers.google.com/search/docs/specialty/international/localized-versions). Titles describe the real page content; title length is not treated as a guaranteed display width or a ranking score. [Google: title links](https://developers.google.com/search/docs/appearance/title-link).

Organization and website entities identify the actual brand. No invented prices, reviews, ratings, locations or unsupported search actions were added. FAQ and HowTo rich results are not promised. [Google: Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [Google: site names](https://developers.google.com/search/docs/appearance/site-names).

## Validation

- Production static build passed.
- Astro check passed for 34 files: zero errors, warnings or hints.
- Fifteen output tests cover existing functionality, language output, canonical/sitemap agreement, schema references, social image dimensions, all preview `noindex` tags and heading hierarchy.
- Browser verification covers all three languages with JavaScript enabled and disabled, including HTTP responses, crawlable language links, metadata, image delivery and mobile overflow.
- Social cards were visually inspected in all three languages.
- Existing public [privacy](https://bookingwhale.co/privacy-policy) and [terms](https://bookingwhale.co/terms) pages were read and are available on the current live site. This does not establish that a replacement deployment will preserve them.

The checks validate generated markup and local delivery. They are not a Google Rich Results Test, a Search Console URL Inspection or a field performance measurement. Earlier motion/responsive performance findings are recorded separately in `experience-review.md`.

## Search intent and next content opportunities

These are candidate topics based on product fit, not measured search volume or keyword difficulty. No Search Console, Ahrefs or Semrush connector is available in this session. Rankings, backlinks and competitor traffic therefore remain unknown.

| Candidate query | Intent | Relevant content |
| --- | --- | --- |
| LINE OA booking system | Commercial | English landing page |
| online booking system for businesses | Commercial | English landing page |
| restaurant booking through LINE | Commercial | Restaurant workflow |
| class booking system LINE OA | Commercial | Classes workflow |
| service booking management | Commercial | Management walkthrough |
| ระบบจองผ่าน LINE OA | Commercial | Thai landing page |
| ระบบจองออนไลน์สำหรับร้าน | Commercial | Thai landing page |
| ระบบจองโต๊ะร้านอาหาร | Commercial | Restaurant workflow |
| ระบบจองคลาสออนไลน์ | Commercial | Classes workflow |
| วิธีรับจองผ่าน LINE OA | Informational | Setup guide |
| LINE OA 在线预订系统 | Commercial | Chinese landing page |
| 商家在线预订管理 | Commercial | Chinese landing page |
| 餐厅订位系统 | Commercial | Restaurant workflow |
| 课程预订系统 | Commercial | Classes workflow |
| 如何通过 LINE OA 接受预订 | Informational | Setup guide |

Do not create near-identical pages for every keyword. Validate demand and conversion goals, then publish distinct useful workflows or guides with actual setup steps and supported product behavior. Pricing and trial details require confirmed commercial information before publication.

## Deployment and measurement

1. Deploy with `SITE_URL` set to the intended HTTPS production origin. This build defaults to `https://bookingwhale.co`.
2. Preserve existing live routes, especially privacy, terms, articles and any pages already receiving search traffic. This landing-page build does not include those existing pages. Inventory production URLs before replacing the current site; map any intentional moves with permanent redirects.
3. On the actual host, verify HTTP status codes, HTTPS/hostname redirects, slash normalization, a real 404 for missing pages, compression and long-lived caching for hashed assets. Astro's static build cannot enforce CDN or host settings.
4. Verify Search Console ownership, submit `/sitemap-index.xml`, and inspect `/`, `/th/`, `/zh/` for rendering, Google-selected canonical and indexing. Confirm preview documents are excluded after recrawling.
5. Check social previews on the deployed public URLs. Social platforms may cache previous metadata and images.
6. Review field LCP, INP and CLS once enough traffic exists, then prioritize changes using real data. Track impressions, clicks and get-started conversions by language; do not infer ranking improvements from local tests.

No production deployment, sitemap submission or search-engine account change was performed during this local implementation.


## Search Console follow-up — 28 October 2026

The language routing described earlier in this historical review has been superseded. Thai now remains at `/`, English at `/en/`, and `/th/` redirects to `/`. See `search-console-review.md` for measured Search Console findings and the current implementation.

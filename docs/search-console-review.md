# Search Console review — 28 October 2026

Property: https://bookingwhale.co/. Read from the authenticated Search Console UI in Brave. Evidence is saved in `../../outputs/search-console-2026-10-28/evidence.json`.

## What the data says

Web search, 27 July–26 October 2026: 47 clicks, 985 impressions, 4.8% CTR and average position 62.5. All 47 clicks landed on `/`; 46 clicks were from Thailand. Mobile supplied 30 clicks, desktop 17, tablet 0. This supports retaining the existing Thai homepage at `/`, English at `/en/`, and Chinese at `/zh/`.

The root URL is not inherently a ranking advantage over `/th/`. The reason for this decision is continuity of the existing indexed URL, its content language and actual audience. Use separate crawlable language URLs, reciprocal hreflang and user-selectable links; do not force language based on IP or browser settings. Reference: [Google multilingual guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

Last 28 days compared with the previous 28 days: clicks 19 → 19; impressions 302 → 293; CTR 6.3% → 6.5%; average position 61.5 → 62.1. The UI's comparison chart had an invalid date label, so no unverified calendar boundaries are reported for this comparison. The data does not establish a gain from local changes that have not been deployed.

### Priority query groups

These are this property's observed impressions and average positions, not market-wide search volume or keyword difficulty estimates.

| Query | Impressions | Clicks | Average position | Destination / action |
| --- | ---: | ---: | ---: | --- |
| booking whale | 17 | 14 | 1.4 | Preserve branded homepage and language URLs |
| ระบบจองคิวผ่าน line | 86 | 0 | 65.4 | Thai homepage: explain LINE OA booking clearly |
| ระบบจองคิว line oa | 85 | 0 | 63.9 | Same homepage; avoid duplicate keyword landing pages |
| ระบบนัดหมายลูกค้า | 76 | 0 | 85.8 | Explain actual appointment workflows on services page |
| สร้างระบบจองคิวผ่านไลน์ | 75 | 0 | 56.4 | Rewrite existing LINE OA setup guide |
| ระบบจองคิวออนไลน์ | 68 | 0 | 75.7 | Homepage and useful related workflow content |
| online booking system thailand | 65 | 0 | 55.7 | Existing English `/en/` page |
| ระบบจองคิวผ่านไลน์ | 49 | 0 | 67.4 | Same Thai homepage, natural wording |
| line bot จองคิว | 47 | 0 | 68.6 | Guide distinguishes booking links from custom bots |
| ระบบนัดหมาย line oa | 45 | 0 | 63.2 | Guide and services page |

Non-brand queries are mostly far below page one; rewriting descriptions alone is unlikely to solve this. The 14 visible branded clicks do not classify the remaining 33 clicks: Search Console omits some anonymized queries. Page-level impression totals also need not equal property totals because of aggregation.

The English homepage had 35 impressions, 0 clicks and position 41.7. The repeat-customer article had 14 impressions, 0 clicks and position 2.4: too little data to claim it is a proven traffic driver. Whale-watching terms appeared but are unrelated to the product; no content was created to target them. Device CTR differences are not evidence of a conversion or design problem because query and ranking mix differ.

## Indexing findings and actions

Indexing report last updated 23 October 2026: 3 indexed and 5 not indexed across three reasons. This is the report's current coverage, not proof that every one of the 90 live sitemap URLs has been evaluated.

| Finding | Observed URL / state | Action |
| --- | --- | --- |
| Sitemap success but 0 discovered pages | `/sitemap-index.xml`, last read 15 April 2026 | Verified the live XML index and child sitemap return 200; child has 90 URLs. Resubmitted the same index on 28 October; Google confirmed submission. Last-read date and discovery count had not changed afterward. |
| Old 404 | `/blog/choosing-right-queue-booking-system-for-your-business`, last crawled 15 May | Live navigation now redirects to `/blog/online-queue-booking-system-guide` with final 200. Preserve its explicit permanent redirect in the new build. Do not treat the stale report as proof the redirect is currently broken. |
| Alternate with proper canonical | `/en`, last crawled 2 July | Preserve English `/en/` and normalize trailing slash. This exclusion is not inherently an error. |
| Crawled, currently not indexed | `/blog/yoga-studio-booking-system/`, last crawled 4 May | Rewrite around class capacity, shared resources and prelaunch checks; link to setup guide and business page. Indexing is not guaranteed. |
| Crawled, currently not indexed | `/blog/nail-salon-booking-system/`, last crawled 17 April | Rewrite around service duration, staff constraints and prelaunch checks; link to guide and services page. |
| Legacy article currently missing | `/blog/api-integration-booking-systems-best-practices`, last crawled 26 February; live 404 | Not present in the current sitemap or available migrated articles. No equivalent or confirmed API feature source was found. Keep a genuine 404 unless original useful content can be recovered and verified; do not redirect to an unrelated homepage. |

The “Passed” validation label on the crawled-not-indexed reason does not mean those URLs are indexed. No URL indexing request or validation campaign was started. Sitemap submission is the only external change in this audit; it is a crawl-discovery request, not a publishing or indexing confirmation.

## Implemented locally

- Thai `/`, English `/en/`, Chinese `/zh/`; `/th/` permanently redirects to `/`. Removed the previous local `/en/` → `/` redirect. Updated language links, canonicals, hreflang, sitemap and internal links to the Thai root.
- Thai homepage title: `ระบบจองคิวผ่าน LINE OA สำหรับธุรกิจ | Booking Whale`. English title: `LINE OA Booking System in Thailand | Booking Whale`. Thai description and small hero/footer label now use the observed booking-queue phrase naturally. Existing H1 and motion remain unchanged.
- Substantive rewrites of the existing LINE OA, yoga and nail-salon articles. Removed unsupported statistics, pricing and automatic-feature promises from those three articles; retained original publication dates and set actual modification dates to 28 October 2026.
- Added a crawlable setup-guide link in the homepage footer and business pages. Examples are explicitly illustrative; shared staff/resources, payments, memberships and bespoke integrations require checking actual support.
- Added regression coverage for English remaining indexable and Thai alias redirecting. Existing checks cover all 90 old sitemap URLs, all 99 new indexable pages, metadata, language reciprocity, internal links, assets and article dates.

All CSS and homepage motion source files are unchanged, verified by SHA-256. There is no new client script or tracking event. Most of the other migrated article bodies still require editorial verification before relying on their numerical claims or product promises; this audit does not certify all 79 articles.

## After deployment

1. Verify production `/`, `/en/`, `/zh/` return 200 with matching visible language, canonical and hreflang; `/th/` returns host-level 301/308 to `/`. Astro's static meta-refresh fallback is not a server redirect and dropped the fragment during the local static-file test. The Astro development server's actual HTTP 301 preserved `#faq`; language switching also preserved that fragment. Verify the deployed host-level redirect, not just the HTML file. Vercel rules are in `vercel.json`; apply equivalent rules if using another host.
2. Check sitemap/robots accessibility and the existing verification file. No code from this audit has been deployed.
3. Use URL Inspection on the homepage and the three rewritten articles to check Google-selected canonical and eligibility. After the deployed content is live, request recrawl for these priority URLs if appropriate.
4. Recheck sitemap last-read/discovery status after Google processes the submission. If it remains unchanged, inspect Google's fetch details and hosting/firewall logs rather than repeatedly resubmitting without diagnosis.
5. Compare subsequent 28-day periods for non-brand query impressions, page indexing and clicks. Keep a deployment date annotation. The low current traffic makes daily changes noisy; no ranking or conversion improvement is guaranteed.
6. Review the remaining legacy articles' claims and prioritize useful corrections by actual GSC page/query data. Recover the missing API article only if valid source content and current product support exist.

References: [Google multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), [Google URL migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [LINE Rich Menu documentation](https://developers.line.biz/en/docs/messaging-api/using-rich-menus/).

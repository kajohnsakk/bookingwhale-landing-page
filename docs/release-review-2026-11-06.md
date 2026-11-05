# Release review — 6 November 2026

## Scope

Home, business directory and three business sales pages in Thai, English and Chinese; representative article, contact and legal pages. The restaurant video was removed and static product screenshots retained. The latest pottery workshop and board game cafe articles and images from origin/main are preserved.

## Validation

- Astro check: 94 files, no errors, warnings or hints.
- Production build: 110 pages. All 38 automated tests passed after the final build.
- Static audit: 109 indexable HTML pages, no missing metadata, duplicate titles, missing internal links or broken anchors.
- Responsive browser audit: 46 route/viewport combinations at 390, 834, 1194 and 1440px. No horizontal overflow or JavaScript errors. A transient image failure during a rebuild was rechecked successfully after build completion.
- Additional interactions: all nine localized business pages, all three scenario choices, calculator slider/input synchronization, invalid input and reset, resizing to 320/834/1194px, and absence of video.
- Contact dialog: focus containment, Escape, focus restoration and mobile menu tested at mobile, tablet and desktop dimensions.
- Reduced Motion: no running animations in the tested home state.
- Fixed an obsolete mobile product-image grid that left the customer screenshot small and off-centre.
- Added responsive AVIF sources for the restaurant hero, retaining the WebP fallback and original composition.

## Lighthouse

Built site served locally with gzip; Lighthouse mobile throttling and desktop defaults. These are laboratory results, not field Core Web Vitals.

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Home mobile | 94 | 100 | 100 | 100 |
| Home desktop | 100 | 100 | 100 | 100 |
| Restaurant mobile, final | 95 | 100 | 100 | 100 |
| Fitness mobile | 96 | 100 | 100 | 100 |
| Services mobile | 99 | 100 | 100 | 100 |
| Representative article mobile | 90 | 100 | 100 | 100 |

Restaurant performance increased from 89 to 95 after image optimization; LCP decreased from 3.60 to 2.78 seconds. Home mobile was 93 in the previous 5 November audit and is 94 in this run; small differences between runs are normal.

## Scroll measurement

Four-second scripted scroll through the business section on local Chromium: approximately 60 FPS at 390, 834 and 1440px; p95 frame interval 16.7–16.8ms; no observed long tasks above 50ms. This is desktop browser viewport emulation, not testing on physical iPad/iPhone hardware.

## Limits

Screenshots and representative content were visually reviewed; this is not a manual proofreading pass of every historic article. Lighthouse 100 does not establish complete accessibility compliance or guarantee search rankings. Phone/LINE/email destinations were checked without placing calls or sending messages. Production smoke checks are recorded separately after publication.

# Preview review — 14 November 2026

Status: local preview only. No deployment performed. The existing desktop composition and five-scene product demonstration are retained.

## Changes retained

- Mobile booking demonstration supports choosing a time, reviewing it and confirming it. The selected time stays consistent across the three panels, with Thai, English and Chinese labels. Reduced Motion uses instant navigation without the additional transition.
- Mobile time choices have a minimum 44px touch height.
- Business demonstration playback pauses when interacting with the stage. Explicit Play resumes correctly even when the control retains focus. Manual step selection pauses automatic progression.
- Motion pauses outside the viewport and with Reduced Motion. Mobile decorative/onboarding loops run once; desktop animation behaviour remains in place.
- CTA gutters are consistent across home and business pages. Business CTA horizontal margins are 24px on mobile, 28px on iPad portrait and 40px within the desktop content container.
- Scenario step numbers retain full text contrast instead of reduced opacity.
- Business/content pages preload the font subsets they use, avoiding the observed font-loading layout shift without changing typography.

## Design and interaction review

Reviewed the homepage, business index and three business detail pages at 390×844, 834×1194, 1194×834 and 1440×1000. No document-width overflow or JavaScript errors were observed. Carousel cards intentionally extend beyond their clipped viewport.

CTA geometry was checked in 48 route/language/viewport combinations. Mobile time selection and confirmation passed in Thai, English and Chinese, including reset and Reduced Motion. Motion controls passed on all three business detail pages.

Build: 111 pages. Automated tests: 40 passed, zero failures. Astro diagnostics: 100 files, zero errors, warnings or hints. Contact dialog checks passed in 15 viewport/language combinations, including 320px width and Escape dismissal.

## Lighthouse

Local production build, HTTPS/HTTP2 with gzip, Lighthouse 13.5, native Chrome. Default Lighthouse mobile and desktop profiles, sequential runs. New visitor without Analytics consent. No Google Tag Manager requests were observed. Analytics collection endpoints were blocked to avoid sending audit traffic.

| Page | Mobile performance | Desktop performance | Accessibility / Best Practices / SEO |
| --- | --- | --- | --- |
| Home, three final runs | 99 / 99 / 99 | 100 / 100 / 100 | 100 / 100 / 100 |
| Food & beverage | 100 | 100 | 100 / 100 / 100 |
| Fitness & sports | 100 | 100 | 100 / 100 / 100 |
| Services | 100 | 100 | 100 / 100 / 100 |

Home median LCP: mobile 2.055s; desktop 0.469s. CLS is zero in all final runs. Home TBT is at most 0.5ms; business-page TBT is zero.

The historical 10 November controlled results were 99 mobile and 100 desktop, with the same 2.055s / 0.469s median LCP. Current results are comparable, but this is a historical comparison, not a fresh frozen-build A/B experiment.

The first review batch exposed mobile food-page CLS of 0.146 and performance 94; after font preloading, the final run has CLS 0 and performance 100. Desktop business accessibility improved from 97 to 100 after correcting step-number opacity.

The first homepage mobile run scored 70 with 1,876ms TBT while another browser check was finishing. The next two runs were 99, and a separate sequential final batch returned 99 in all three runs. The anomalous report is retained; the cause has not been proven, and it is not presented as a code-related improvement.

## Scroll frame timing

Native headless Chrome, DPR 2, no CPU throttling. Mobile and iPad are emulated viewport/touch profiles, not physical devices. Measurements use requestAnimationFrame cadence during scripted scrolling, not GPU-presented frames. All cases reported zero JavaScript errors.

| Homepage profile | Initial full-page scroll FPS | Separate repeat full-page scroll FPS | Repeat card-section FPS |
| --- | --- | --- | --- |
| Mobile | 44.2 | 60.0 | 60.0 |
| iPad portrait | 56.0 | 60.0 | 60.0 |
| iPad landscape | 50.7 | 60.0 | 58.6 |
| Desktop | 58.3 | 60.0 | 60.0 |

The initial mobile homepage pass had a maximum frame interval of 566.6ms. In the separate repeat, full-page forward, reverse and repeated forward passes were approximately 60 FPS for all four profiles, with maximum intervals of 16.8ms. The repeat iPad landscape card pass had one 183.3ms frame interval and a 189ms long task. The cause is not established; these outliers remain in the evidence and the page is not described as stutter-free.

Business pages were approximately 60 FPS on desktop. Mobile fitness and services were approximately 60 FPS; food was 57 FPS on the initial forward pass and 60 FPS on reverse. Historical tests were approximately 60 FPS, but their warm-up and scroll sequence differ, so they are not a strict before/after benchmark.

Outstanding verification: reproduce the occasional first-pass/landscape stall on physical iPad/Safari before treating motion quality as fully signed off. No motion was removed to improve these measurements.

## Scope and evidence

These are local lab measurements, not live CDN or real-user measurements. Post-consent Analytics performance was not measured in this pass. Lighthouse SEO 100 is an automated-check score, not a search-ranking guarantee.

Evidence is stored in `outputs/preview-review-2026-11-14/`: initial and final Lighthouse reports, `final-summary.json`, `design-audit.json`, `interaction-layout.json`, `motion-controls.json`, `fps.json`, `fps-repeat.json`, `dialog-check.json`, screenshots and build/test logs.

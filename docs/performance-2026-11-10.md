# Performance verification — 10 November 2026

The safe optimization achieves **99 mobile and 100 desktop**. The requested 100 on both devices has **not** been achieved. No animations, transitions, durations, image quality, text content or layout rules were removed to improve the score.

## Lighthouse before / after

Three sequential measurements per version and device, Lighthouse 13.5.0, native ARM Chrome, default Lighthouse mobile and desktop profiles. Both versions use local production builds served over HTTPS/HTTP2 with identical gzip settings. The baseline is the frozen pre-optimization build with the 22,639 counter already present. These are controlled local measurements, not production CDN measurements or real-user Core Web Vitals.

| Profile | Before, runs 1 / 2 / 3 | After, runs 1 / 2 / 3 | Median LCP |
| --- | --- | --- | --- |
| mobile | 97 / 98 / 98 | 99 / 99 / 99 | 2.205 → 2.055 s |
| desktop | 100 / 100 / 100 | 100 / 100 / 100 | 0.510 → 0.469 s |

Mobile median performance: **98 → 99**. Desktop: **100 → 100**.
Mobile median Speed Index: **1.680 → 1.503 s**.
After-change CLS is **0** in all six runs. Mobile TBT is 0 ms in all runs; desktop TBT is 0 / 0 / 1.5 ms.
Accessibility, Best Practices and SEO are 100 before and after in every run. Lighthouse reported no run warnings.

Tests use a new visitor without Analytics consent. Analytics does not load; Google Analytics collection endpoints are also blocked to avoid sending test traffic. This does not measure the post-consent Analytics cost.

## Changes retained

- Limit four variable font files to the weight ranges already declared in CSS. The same families and glyph coverage remain available, with extended-language fallback faces retained.
- Primary font files: **84,964 → 52,932 bytes**, saving **32,032 bytes (37.7%)**.
- Preload Latin fonts needed by the Thai hero's LINE OA label and customer count.
- Preload the homepage hero image only on home routes; business and article pages no longer request that unrelated image eagerly.

## Design and motion checks

Compared mobile (390 × 844) and desktop (1440 × 900) layouts on `/`, `/en/`, `/zh/`, the three Thai business pages and `/blog/`. Visible element counts match across all 14 comparisons. The maximum rectangle difference is 0.3 CSS pixels, caused by font-instancing rounding, with no observed wrapping or page-height changes. Font generator checks the complete character map and glyph advances across the declared weights. This is not a claim of pixel-identical font rasterization.

Motion was measured twice, reversing before/after execution order on the second pass. The optimized build stays at approximately **60 FPS** for the counter and both first/repeat full-page scroll passes on both viewport profiles. Its p95 and maximum recorded frame intervals are approximately 16.8 ms, with no observed long tasks, counter layout shifts or page errors. The counter finishes at **22,639**.

The baseline's first pass had variable startup/scroll stalls (mobile counter 36 FPS, desktop first scroll 46 FPS); on the reversed pass it also reached about 60 FPS. Therefore those first-pass differences are not presented as a proven FPS improvement from the font changes. The defensible conclusion is that the optimized build did not regress motion in these runs. Measurements use requestAnimationFrame in desktop Chrome viewport emulation, without CPU throttling; they are not physical-phone or GPU presentation measurements.

## Validation

- Astro check: 99 files, 0 errors, 0 warnings, 0 hints.
- Tests: 40 passed, 0 failed.
- Production build: 111 pages completed.
- Existing motion scripts unchanged.

## Remaining gap to 100

Mobile's initial rendering remains the limiter: the representative after run has FCP around 1.5 s and LCP around 2.1 s. Lighthouse estimates approximately 150 ms each for unused CSS and JavaScript; those estimates overlap and are not additive. Further route-specific stylesheet/script splitting requires separate regression work because the existing animation and responsive styles share global rules. CSS minification/inlining experiments that worsened layout or loading were discarded. No changes to Lighthouse throttling or scoring were made to reach the result.

## Evidence

Full reports and browser measurements are in `outputs/performance-optimization-2026-11-10/` in the working project: `summary.json`, twelve before/after Lighthouse JSON reports, `motion.json`, `motion-reverse.json`, `visual-comparison.json`, `fonts.json`, and build/check/test logs. Audit runners are in `work/analytics/`.

This change has not been deployed to production as part of this verification.

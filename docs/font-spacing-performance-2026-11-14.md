# Font and spacing performance review — 14 November 2026

Status: preview only. No deployment performed.

## Changes reviewed

Shared navigation labels use 16px / 600. Business demonstrations use consistent title, body, metadata and row spacing. Language options now have a 6px gap, 10px panel padding, and a 44px minimum row height. Language menu geometry checked on homepage and services at 390px and 1440px.

## Lighthouse comparison

Same local production-build method as the earlier 14 November review: native headless Chrome, Lighthouse 13.5, HTTPS/HTTP2 with gzip, sequential mobile and desktop profiles. Fresh visitor without Analytics consent; collection endpoints blocked. This compares saved earlier measurements, not a frozen-build A/B test.

| Page | Earlier mobile | Current mobile | Earlier desktop | Current desktop |
| --- | --- | --- | --- | --- |
| Home | 99 / 99 / 99 | 99 / 99 / 99 | 100 / 100 / 100 | 100 / 100 / 100 |
| Food & beverage | 100 | Initial 93; repeat 99 / 100 / 100 | 100 | 100 |
| Fitness & sports | 100 | 100 | 100 | 100 |
| Services | 100 | 100 | 100 | 100 |

Accessibility, Best Practices and SEO scored 100 in every completed run. CLS was 0 throughout. Home median LCP: mobile 2.055s (unchanged), desktop 0.499s (earlier 0.469s). No Google Tag Manager requests observed.

The initial food mobile result had 289ms TBT. Three unchanged-build repeats had 3ms, 0ms, 0ms TBT. The outlier's cause is not established; it is retained in final-food-beverage-mobile.json. No code was changed between the initial and repeat measurements. Results do not establish a sustained regression but do show run-to-run variability.

## Scroll measurements

Native headless Chrome, 390×844 and 1440×900, DPR 2, no CPU throttling. Scripted full-page forward/reverse scrolling, plus homepage card scrolling. Values are requestAnimationFrame cadence, not GPU-presented frames or physical device measurements. Consent was denied for these runs. Zero JavaScript errors across all cases.

| Profile | Route | FPS range | Maximum frame interval | Long tasks |
| --- | --- | --- | --- | --- |
| mobile | / | 60.0–60.0 | 16.8 ms | 0 |
| mobile | /businesses/food-beverage/ | 60.0–60.0 | 16.8 ms | 0 |
| mobile | /businesses/fitness-sports/ | 59.8–60.0 | 33.4 ms | 0 |
| mobile | /businesses/services/ | 60.0–60.0 | 16.8 ms | 0 |
| desktop | / | 60.0–60.0 | 16.8 ms | 0 |
| desktop | /businesses/food-beverage/ | 60.0–60.0 | 16.8 ms | 0 |
| desktop | /businesses/fitness-sports/ | 60.0–60.0 | 16.8 ms | 0 |
| desktop | /businesses/services/ | 59.8–60.0 | 33.3 ms | 0 |

Earlier repeat measurements were approximately 60 FPS; current measurements remain in that range. One mobile fitness interval was 33.4ms and one desktop services interval was 33.3ms; all other case maxima were 16.8ms. No long tasks occurred in measured scrolling windows. This does not replace physical iOS/Safari testing.

## Preview

- http://127.0.0.1:4321/en/
- http://127.0.0.1:4321/businesses/food-beverage/
- http://127.0.0.1:4321/businesses/fitness-sports/
- http://127.0.0.1:4321/businesses/services/

Build succeeded: 111 pages. Existing design and motion preserved. No deployment.

Evidence: outputs/font-spacing-performance-2026-11-14/ contains raw Lighthouse reports, final-summary.json, food-repeat-summary.json, fps.json, language-menu.png and build log.

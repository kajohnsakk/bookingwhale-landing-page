# Static asset delivery

`scripts/optimize-delivery-assets.mjs` generates responsive Hero images, LINE marks and WebP avatars from the retained originals. Run it after refreshing the original captures, then rebuild. `src/data/hero-images.ts` supplies both the Hero image and its preload so their candidate lists and sizing hints agree. The larger originals remain candidates for high-density displays.

Hero image aspect ratios are fixed in `HeroScreen.astro` to prevent rounding in smaller raster dimensions from changing their rendered geometry. All Hero images remain eager, and the merchant screen retains its high fetch priority. Below-the-fold portraits, onboarding marks and closed-dialog illustrations load lazily.

Exact duplicate CSS declarations were removed only when a later rule with the same selector, enclosing conditions, property, value and importance already supplied them. No CSS was removed merely because it was unused in an initial viewport. Stylesheet loading and the Google tag's loading behavior remain unchanged.

For production hosting:

- Serve HTTPS with HTTP/2 or HTTP/3. The server or CDN controls this; a static Astro build cannot enable it by itself.
- Enable Brotli or gzip for HTML, CSS, JavaScript, JSON and SVG responses. WOFF2 and WebP are already compressed.
- Content-hashed `/_astro/` assets can use `Cache-Control: public, max-age=31536000, immutable`.
- HTML should revalidate, for example with `Cache-Control: no-cache` and ETag support.
- `/assets/` names are not all content-hashed. Use revalidation or a bounded cache lifetime, and purge changed files on release. Do not apply immutable year-long caching to those paths without versioning their URLs.
- Preserve the Google verification file and existing legal/article routes when deploying.

The October 28 follow-up audit uses local HTTP/2 for both the baseline and candidate, with the real Google tag loaded and analytics collection intercepted. This simulates the transport recommendation without changing the production host. Confirm protocol, response headers and performance again on the deployed URL. Lighthouse scores are not guarantees across networks and devices.

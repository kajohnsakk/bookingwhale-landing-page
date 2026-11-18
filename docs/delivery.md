# Static asset delivery

`scripts/optimize-delivery-assets.mjs` generates responsive Hero images, LINE marks and WebP avatars from the retained originals. Run it after refreshing the original captures, then rebuild. `src/data/hero-images.ts` supplies both the Hero image and its preload so their candidate lists and sizing hints agree. The larger originals remain candidates for high-density displays.

Hero image aspect ratios are fixed in `HeroScreen.astro` to prevent rounding in smaller raster dimensions from changing their rendered geometry. All Hero images remain eager, and the merchant screen retains its high fetch priority. Below-the-fold portraits, onboarding marks and closed-dialog illustrations load lazily.

Stylesheets are inlined into each page (`build.inlineStylesheets: 'always'`), so the first paint does not wait for separate CSS requests. After the build, `scripts/dedupe-styles.mjs` removes declarations that a later rule with the same selector and enclosing conditions always overrides; declarations using fallbacks for newer CSS features (`svh`, `clamp()`, `light-dark()` and similar) and custom properties are kept.

Rules in `src/styles/` that never applied were removed after a coverage pass over every page type at nine viewport sizes, with scrolling, the menu, the contact dialog, FAQ items and the holiday theme exercised. Hover, focus, open, attribute and script-driven states, print, reduced-motion, pointer and container-query rules were kept regardless of coverage. Full-page screenshots before and after matched across all pages and viewports checked.

The clients map artwork is served as `/images/clients-map.svg` so it does not add to the HTML; its labels stay inline so they are translated with the page.

For production hosting:

- Serve HTTPS with HTTP/2 or HTTP/3. The server or CDN controls this; a static Astro build cannot enable it by itself.
- Enable Brotli or gzip for HTML, CSS, JavaScript, JSON and SVG responses. WOFF2 and WebP are already compressed.
- Content-hashed `/_astro/` assets can use `Cache-Control: public, max-age=31536000, immutable`.
- HTML should revalidate, for example with `Cache-Control: no-cache` and ETag support.
- Hero and contact screenshots live in versioned folders (`/assets/hero-screens-v2/`, `/assets/product-captures/v2/`). When the screenshots are regenerated, rename the folder to the next version and update the paths, so browsers that cached the old images for a year fetch the new ones.
- `/assets/` names are not all content-hashed. Use revalidation or a bounded cache lifetime, and purge changed files on release. Do not apply immutable year-long caching to those paths without versioning their URLs.
- Preserve the Google verification file and existing legal/article routes when deploying.

The October 28 follow-up audit uses local HTTP/2 for both the baseline and candidate, with the real Google tag loaded and analytics collection intercepted. This simulates the transport recommendation without changing the production host. Confirm protocol, response headers and performance again on the deployed URL. Lighthouse scores are not guarantees across networks and devices.

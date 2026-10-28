# BookingWhale marketing website

Astro static website migrated from the approved landing-page design. The page renders directly as HTML, without an iframe or a client-side application shell. GSAP enhances the native document scroll after load.

## Run locally

Use Node.js 24 (`nvm use`) and npm:

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

The existing machine's Node.js was older than Astro's minimum. A task-local Node 24 runtime is available at `../work/astro-runtime/node_modules/node/bin/node`; this does not change the system installation.

## Structure

- `src/pages/index.astro`: page composition
- `src/components/`: Navbar, Hero, ProductStory, Business, LineIntegration, GettingStarted, FAQ, Resources, Contact and Footer
- `src/layouts/BaseLayout.astro`: localized homepage metadata, fonts and presentation
- `src/layouts/ContentLayout.astro`: lightweight article, business, contact and legal pages
- `src/content/blog/`: 79 migrated Thai articles
- `src/seo/`: metadata, alternate-language route groups and production URL inventory
- `src/scripts/motion.js`: document scrolling, GSAP timelines, reduced-motion handling and menu behavior
- `src/styles/site.css`: preserved design styles
- `src/styles/document.css`: native document layout and progressive enhancement
- `public/assets/`: local logos and LINE brand asset

Icons render as SVG in the initial HTML using the selected Lucide icon data. Noto Sans Thai, Anuphan and Plus Jakarta Sans are bundled locally through Fontsource. Product screens use synthetic sample data and are explanatory visuals, not a connected booking application.

Common Latin characters use smaller subsets of those same fonts, with the original faces retained for additional characters. See [font delivery and regeneration](docs/fonts.md).

## Production domain

`SITE_URL` defaults to `https://bookingwhale.co`. Set it to the final production origin before building if a different domain will be used. The sitemap, robots.txt, canonical, social metadata and structured-data URLs use that origin. Do not index a staging deployment; apply noindex through its hosting configuration.

Deploy `dist/` to static hosting after `npm run build`. The build includes existing article, contact, business and legal routes. Apply the permanent redirect rules from `vercel.json` at the host, and verify the route inventory before replacing production. See [SEO migration and Search Console checklist](docs/seo-migration.md), including the preserved Thai root and English `/en/` routes.

See [static asset delivery](docs/delivery.md) for responsive image regeneration, HTTP/2 and cache configuration.

## Verification

Run `npm run test` after building to check the emitted document, internal anchors, duplicate IDs, metadata, and locally served assets. Browser review is still needed for motion and responsive layout.

## Analytics

GA4 uses the existing `G-N2554HPN72` ID on the production hostnames only. Contact modal opens and LINE/phone/email clicks are tracked. See [analytics setup and event reference](docs/analytics.md) for environment controls, event parameters and verification.


### Check content in the running preview

After adding collections or changing Astro configuration, run `npm run check:content-preview` against the running development server. It checks all article index pages and representative article URLs over HTTP, catching a stale development content store that a production build test would miss. Set `PREVIEW_URL` to test another local port.

If the development server logs `The collection "blog" does not exist or is empty` despite populated source files, restart it with `astro dev stop` followed by `astro dev --host 127.0.0.1 --port 4321 --background --force`. This reloads the content cache; it does not change the articles. Run the preview check again before handing off the page.

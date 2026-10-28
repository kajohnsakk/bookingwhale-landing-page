# Experience review — 26 October 2026

The site keeps its white background, blue brand accents, device arrangement and five-step booking story. The Apple reference informed hierarchy and pacing, rather than copying its artwork or introducing a replacement design.

## Implemented

- Moved the business introduction next to its heading in the same text block. Removed the detached right-hand paragraph and forced line break.
- Replaced the food symbol with a spoon and fork.
- Added a second caption beneath the confirmation phone, with a matching blue curved arrow. Both desktop captions reveal together once. Small screens show the lower caption in normal document flow.
- Removed velocity-triggered scrub completion, which could cause sudden jumps. Scroll-linked timelines now use a 0.45-second catch-up. Endpoints still settle immediately.
- Kept browser-native smooth anchor scrolling and instant direct-hash restoration. Reduced motion uses instant navigation.
- Removed the repeated headline jitter. The headline reveals once; onboarding demos play once, with replay controls.
- Initialized decorative business and onboarding animations only near the viewport. Existing loops pause outside the viewport and when the document is hidden. Deferred animations belong to the GSAP context and are cleaned up on responsive changes.
- Disabled the pinned hero on desktop viewports shorter than 720px. Business pinning requires at least 900px of height; smaller screens retain native horizontal browsing.
- Added keyboard navigation to the pinned business gallery, with arrows, Home and End.
- Fixed mobile initialization layout shift by separating the no-JavaScript layout from the JavaScript-enhanced first paint.

## Languages

| Language | URL | HTML language |
| --- | --- | --- |
| English, default | `/` | `en` |
| Thai | `/th/` | `th` |
| Simplified Chinese | `/zh/` | `zh-Hans` |

Translation is performed during static generation, not by replacing page text in the browser. Dictionaries are in `src/i18n/messages.json`. The rendered-HTML localization pass also covers accessibility labels, metadata, dates and inert product previews. Hero accent text is translated before grapheme segmentation. Contact device screenshots have localized English and Chinese versions.

The language switcher preserves the current section. Every page includes canonical and alternate-language links. The sitemap includes the three marketing pages and excludes decorative preview endpoints. No automatic browser-language redirect overrides the English default.

When adding Thai copy, add both translations and run the output tests. They detect untranslated Thai text on English and Chinese pages, excluding the native language-picker label and Thai currency symbol.

## Verification

- Production build: passed.
- Astro check: 0 errors, 0 warnings.
- Static output tests: 10 passed, covering locales, translated previews, metadata, sitemap, anchors and local assets.
- Section review: 320×740, 390×844, 768×1024, 1024×768, 1440×900 and 1920×1080, for all three languages. No document-level horizontal overflow.
- Five-step story: 27 locale/viewport/motion combinations, including 844×390 and 1280×650 landscape, 1024×800 and reduced motion. All 135 scene selections passed, with no card/header overflow or header overlap.
- Reverse scrolling: date → time → details → business → customers, then back to date, in all languages.
- Chromium and WebKit: language switching, section preservation, menu labels, Escape, FAQ expansion, story navigation and resizing passed at desktop and mobile sizes.
- JavaScript disabled: core content, product examples, FAQ and native language switcher remain available.
- Deferred onboarding demos: all three replay controls passed after viewport activation.

These are browser-based viewport simulations, not tests on every physical device or operating system.

## Performance observations

Measured on the local production preview with fresh browser contexts. These are laboratory observations, not field Core Web Vitals or a Lighthouse score.

- Mobile initial CLS was approximately 0.85 before the first-paint fix. Subsequent local runs measured 0–0.001 across the three languages.
- Final English mobile run with 4× CPU slowdown, 100ms latency and approximately 6 Mbps download: LCP 876ms, CLS 0. The accumulated excess duration of observed long tasks was 854ms, down from 1,108ms in the earlier run. This custom measurement is not Lighthouse TBT and varies with host load.
- The main script is approximately 133KB uncompressed / 51KB transferred with local compression. It contains animation code; the translation dictionaries and parser are build-only.
- Hero previews remain inert static HTML with no application runtime. They now use lazy iframe loading. Contact screenshots remain lazy loaded.
- Existing inherited CSS is still approximately 357KB uncompressed / 63KB compressed. A future targeted cleanup of legacy selectors and further staging of the product-story initialization can reduce startup work, especially on slower devices. No field performance target has been claimed.

## References

- [Apple MacBook Pro](https://www.apple.com/th/macbook-pro/) — observed hero-to-highlights hierarchy and chapter pacing.
- [GSAP context documentation](https://gsap.com/docs/v3/GSAP/gsap.context()/) — lifecycle handling for deferred animation construction.

## Scroll refinement — 26 October 2026

- Reviewed the Apple MacBook Pro reference in a browser for section pacing. The site keeps native vertical scrolling, with local animation smoothing rather than a replacement scroll engine.
- Hero, product story and business gallery use a 0.55-second scrub catch-up. Boundary completion now happens immediately only after the section is well outside the viewport; crossing the exact boundary lets the animation settle naturally.
- Business cards accelerate and decelerate with a sine curve. Scroll travel increased from 1.2 to 1.45 times the horizontal distance. Arrow and keyboard navigation use the inverse curve so they still advance exactly one card.
- Gallery width, distance and stride are measured on refresh/resize instead of every animation update. Product chapter accessibility attributes update only when the active chapter changes.
- Verified all three locales across 1440×900, 1440×800, 1366×768 and 1024×640 using Chromium/WebKit, including forward/reverse scrolling, controls, mobile resizing and reduced motion. Additional production-preview checks confirmed progressive settling at the boundary, exact one-card navigation and product chapter controls. Astro check and production build passed.
- These checks verify behavior in simulated browser viewports; no device-wide frame-rate or field performance claim is made.

## Mobile composition and spacing follow-up — 26 October 2026

Reviewed the mobile landing views of https://www.apple.com/th/macbook-pro/ and https://joinreggu.com/th/. The implementation uses a bounded product composition with a clear text and action hierarchy. Existing product assets and localized previews remain in use.

- Replaced the three vertically stacked hero devices with one responsive composition at widths up to 900px. Phone previews retain a 390px internal layout and scale to their device frames; the resize observer is disconnected and inline sizing cleared when leaving mobile mode.
- Replaced individual scroll-linked device opacity with a single, short entrance translation. Overlapping devices stay opaque. Reduced motion skips the entrance.
- Sized the non-pinned booking canvas to the selected scene, updating it when scene content resizes. Inactive mobile chapters no longer reserve height. The desktop pinned story retains its stable canvas height.
- Reduced mobile section padding and retained native horizontal browsing for the business gallery.
- At 440 × 956 in Thai, the hero device stage decreased from approximately 1,614px to 436px, and the feature section from 1,012px to 773px. The header has 32px clearance above the hero label on initial load.

Validation: 30 viewport/locale/engine combinations (320, 375, 390, 440 and 768px; English, Thai and Chinese; Chromium and WebKit), including all five booking scenes, header clearance, document overflow, mobile menu and contact dialog. Additional Chromium/WebKit checks cover reduced motion, JavaScript disabled, landscape and resizing to desktop and back. Desktop story and business-gallery scroll boundary checks also passed. Build, Astro diagnostics and all 16 static output tests passed. These checks simulate viewports and browser engines; they are not physical-device certification.

## Separate mobile presentation — 26 October 2026

The follow-up replaces the compact three-device mobile composition above with a single booking phone, capped at 280px wide. Merchant and confirmation examples remain in the step-by-step product story; desktop keeps all three hero devices. The decorative hero spread is hidden on mobile because the complete business gallery already follows the product story.

Mobile onboarding uses one column with each illustration below its explanation. Section entrances play once, with small translations; business-card demos also play once on mobile. The gallery retains native horizontal scrolling. Booking tabs use a short transition and select settled scene states. The confirmation ticket is centered again after responsive measurement so its position does not depend on a previous canvas size.

The contact dialog now places LINE first in DOM and keyboard order. Phones show a compact bottom sheet with a full-width LINE action, two telephone rows and an email row. Larger screens retain the illustrated two-column layout. Resize cleanup removes the mobile preview sizing and any in-progress tab transition.

Follow-up validation passed: all 30 mobile locale/viewport/engine cases, including single-device visibility and LINE-first keyboard focus; onboarding geometry and native gallery scrolling in all three languages at 320px; desktop device visibility and two-column contact layout; reduced motion, no-JavaScript and orientation/desktop resize checks in Chromium and WebKit. The build succeeded, Astro reported zero diagnostics, and all 16 static tests passed.

## Reference-inspired mobile layout and menu motion — 26 October 2026

The latest mobile composition supersedes the single-phone presentation above. After reviewing https://www.joinreggu.com/ at a mobile viewport, the page now uses centered hero copy, one primary action, a bounded three-device composition and a compact benefits strip. Onboarding explanations appear above their illustrations in stacked cards. Existing white page, navigation and section backgrounds are preserved. Desktop composition remains unchanged.

The mobile navigation panel opens with a 260ms fade and a small downward movement, and closes over 180ms. Interrupted animations continue from their current visual position. Closing makes menu contents inert until the panel is hidden; reopening restores interaction. Reduced motion settles immediately, and resizing to desktop clears mobile animation state. The navigation's mobile translate reset is kept separate from transform declarations so production CSS optimization does not preserve the desktop centering offset.

Menu checks passed in Chromium and WebKit with normal and reduced motion, including rapid toggles, Escape focus restoration, resizing to desktop and white backgrounds. Astro reported zero diagnostics, the production build completed, and all 16 static output tests passed.

The completed responsive matrix passed all 30 locale/viewport/engine combinations: English, Thai and Chinese at 320, 375, 390, 440 and 768px in Chromium and WebKit. Checks include navigation alignment, hero clearance and device visibility, every booking tab, confirmation bounds, menu controls, contact layout and LINE-first keyboard focus. These are simulated viewport checks.

## Hero loading fallback — 26 October 2026

The three decorative device screens previously embedded lazy-loaded HTML documents. A device frame could appear before its nested document and CSS had loaded. They now use optimized localized WebP captures of the same static preview content. Each screen embeds a small preview as its background, then displays the eager full-resolution image above it. The fallback has no separate request or JavaScript dependency and remains present if the full-resolution request fails. Existing white backgrounds, device frames and their motion are retained.

Removed the iframe resize observer and unused preview-message sequence from the landing runtime. Images scale within fixed device geometry using CSS. The capture script and source note document regeneration when preview content changes.

Validation: intentionally held all full-resolution screen requests, checked the embedded previews, released the requests and checked unchanged screen dimensions. All three locales passed at 390px and 1440px in Chromium and WebKit; the Chinese cases also ran with JavaScript disabled. Reviewed mobile and desktop screenshots during and after loading. Production build and Astro check passed, along with all 17 static tests.

## Mobile device clipping — 26 October 2026

The previous composition placed the confirmation phone beyond the right edge and rotated the booking phone below a clipped stage. Mobile devices now use smaller widths and inset positions so their rotated bounds fit the scene. The stage allows shadows to extend naturally; device screens still clip within rounded frames. Opaque screen backgrounds and isolated device layers prevent the back device from showing through the front screens. Pointer parallax is restricted to non-mobile layouts.

During resize verification, WebKit reported a ResizeObserver delivery loop from the booking-story scene sizing callback. Scene measurement now runs in a coalesced animation frame, canceled when its responsive context is removed.

Validation passed across 42 combinations: three languages, seven widths from 320 to 900px, Chromium and WebKit. Every transformed device stayed at least 8px inside the stage, without document overflow or transparency, including mouse movement at compact widths. Resizing back to desktop produced no JavaScript errors. Mobile screenshots were reviewed in both engines. Production build, Astro check and all 17 static tests passed.

## Scrollable mobile booking story — 26 October 2026

At widths up to 900px, the booking story is now a semantic three-item sequence: choosing a date and time, viewing the confirmed booking, and managing bookings with customer history. Each item includes explanatory copy and a compact decorative UI example. The mobile layout has no tabs, hidden chapters or pinned story canvas. It remains readable without JavaScript, uses the existing white background, and includes localized English, Thai and Chinese copy. Desktop retains the five-chapter story and its controls.

Desktop story animation initialization is skipped on mobile. Mobile graphics use a short, one-time translation when approaching the viewport; reduced motion leaves them static. Direct links to merchant/profile content target the mobile management step with clearance for the fixed header. One-time section entrances use IntersectionObserver instead of self-removing ScrollTriggers, resolving a trigger-refresh race observed while switching layouts.

Validation passed for 30 language/viewport/engine combinations (320, 390, 440, 768 and 900px; English, Thai and Chinese; Chromium and WebKit), checking that all three steps are visible without tabs, text and graphics fit, and the page does not overflow. Desktop controls, returning to mobile, initial profile deep links, reduced motion and no-JavaScript rendering also passed without runtime errors. Thai screenshots were reviewed. Production build, Astro diagnostics and all 17 static tests passed.

## Mobile spacing pass — 26 October 2026

Reviewed actual section geometry at phone, tablet and desktop widths. Mobile hero height now follows its content instead of forcing a full viewport, with 32px of initial clearance below the 64px navigation. The benefits strip retains sufficient reserved height for wrapped English labels. Device composition dimensions are unchanged.

Mobile section padding is consistently 40px above and 32px below. Booking-story items use 32px separation, 8px between title and description, and 16px before each graphic. Onboarding heading-to-list spacing is 24px, with a single spacing source. Obsolete mobile tab layout overrides were removed. Existing white backgrounds, card padding and touch targets are preserved; desktop spacing is unchanged.

Verified 27 language/viewport/engine combinations across Chromium and WebKit, including 320px phones, tablets and desktop. Checks cover header clearance, benefits-strip separation from product art, card content fit, heading-to-list spacing and document overflow. Reviewed mobile story and onboarding screenshots. Production build passed.

## Step alignment pass — 26 October 2026

Mobile onboarding badges and labels now share a 28px centered row, removing the vertical offset between the number and label. Booking-story badges follow the center of the first heading line using a shared responsive line-height, including Chinese and wrapped headings. Added horizontal and bottom padding to onboarding status footers so icons remain inside the rounded graphic container.

Production build passed. Verified 24 locale/viewport/engine combinations: English, Thai and Chinese at 320, 390, 768 and 1440px in Chromium and WebKit. Checks cover mobile badge alignment, footer clearance, navigation and button icon alignment, centered contact dialogs, horizontal containment and runtime errors. Reviewed mobile onboarding, booking-story and contact-dialog screenshots. Desktop layout and background colors remain unchanged.

## iPad scroll-driven business gallery — 27 October 2026

The business gallery now enables its existing pinned horizontal scroll sequence on viewports at least 744px wide and 640px high, including touch-based iPads and iPad mini. It no longer requires hover or a fine pointer. The existing eased scrub, arrow navigation, range indicator and section exit remain shared with desktop. Smaller phone viewports and reduced-motion users retain the native horizontal gallery.

Production build passed. Verified 18 tablet language/viewport/engine combinations in Chromium and WebKit, including portrait-to-landscape resizing, start/middle/end progress, arrow movement and section exit. Phone fallback, resizing back to tablet and reduced motion passed for all three languages in both engines without runtime errors. A Chromium touch gesture test confirmed that a vertical swipe over the cards advances both page scroll and horizontal gallery position. Desktop boundary smoothing and chapter navigation regression checks passed in both engines. Reviewed WebKit portrait and landscape screenshots. These checks use browser emulation, not a physical iPad.

## iPad gallery boundaries and spacing — 27 October 2026

Touch-enabled tablet galleries use their natural content height with 32px top/bottom padding instead of vertically centering inside a forced full viewport. At 834 × 1194, empty leading/trailing space fell from approximately 220/212px to 32/32px. Scroll travel is about 24% shorter, with brief entry/exit holds and a linear mapping softened by a 0.4-second scrub. Desktop retains its original easing, travel and timing.

The scroll trigger now ends at the sticky section's actual release boundary, including when the section is shorter than the viewport. The next onboarding section has 40px top padding, so content follows without an oversized gap. Touch gallery position is preserved across breakpoint changes and orientation changes. This resolves a reproduced jump to the page top when landscape browser height crossed the desktop-story breakpoint. Position capture ignores measurements taken during viewport reflow; restoration is canceled by user input. Height-only changes that do not cross a breakpoint keep native scrolling.

The production build passed. Eighteen tablet locale/viewport/engine combinations passed in Chromium and WebKit, covering forward boundaries, spacing, progress, arrow controls, release, phone fallback and reduced motion. Additional checks cover reverse boundary traversal, gradual settling after fast scrolling, native vertical touch input, browser-height changes, orientation changes and desktop regressions. Entry/exit screenshots were reviewed. Validation uses browser emulation rather than physical iPad hardware.

## Tablet section spacing — 28 October 2026

Scoped spacing adjustments to touch-capable viewports from 744 through 1366 pixels. Setup steps pair copy with illustrations on portrait tablets, retain a side heading on wider landscape tablets, and use content-sized illustration stages with room for animated notices. FAQ uses two columns, contact artwork sits alongside copy, and repeated section margins before contact and the footer are reduced. The product story's minimum stage height is capped at 880 pixels on tall tablets. Existing backgrounds and scroll-driven gallery behavior remain in place.

The 834-pixel English layout's setup section decreased from about 1854 to 1375 pixels, FAQ from 859 to 587, and contact from 744 to 378. These measurements use normal motion. Reduced-motion measurements differ because animated controls reserve different space.

Validation: production build; Chromium and WebKit tablet layout checks at 744×1133, 834×1194, 1024×1366, 1133×744, 1194×834 and 1366×1024 across English, Thai and Chinese; gallery position retention across orientation and browser-height changes. Checks cover page overflow, copy/illustration separation, animated-notice containment, contact/footer gaps and unchanged white backgrounds. Browser emulation is not a physical iPad check.

Final visual review also caught the 744-pixel footer inheriting a phone-only single-column layout. Tablet footer columns now remain side by side, including iPad mini. Follow-up checks passed in both engines and all three languages at 744, 834, 1194 and 1366 pixels, including column containment and a footer height below 500 pixels. Product chapter navigation and animated setup notices passed with normal motion at 1024×1366, 1194×834 and 1366×1024 in both engines.

## Getting-started grouping — 28 October 2026

Moved each step number into its label, with a 28-pixel circular badge and a 10-pixel label gap. The section heading and help link now share the same left edge, with the link beneath the heading. Rows use a 32-pixel copy/illustration gap in an 860-pixel content column; illustrations cap at 350 pixels rather than 400. Removed the duplicate status beneath each illustration and retained the Replay control. Replay footers are hidden with reduced motion or without JavaScript so they do not leave empty rows. Phone layouts stack the copy and illustration inside cards.

Validation: production build; 36 tablet layout combinations across Chromium/WebKit, English/Thai/Chinese, and six portrait/landscape dimensions; additional 320, 390 and 1440-pixel layout checks. Normal-motion tests at 834×1194 and 1194×834 in both engines verify Replay resets the animation, confirmation returns, labels align, and notices remain inside their illustration. Screenshots reviewed for both orientations. These are browser emulation checks, not physical device tests.

## Getting-started responsive spacing — 28 October 2026

Aligned the phone section heading, step copy and illustrations on a shared left edge. Removed the outer phone cards in favor of the same row dividers used on tablets and desktops, keeping a 20-pixel copy-to-illustration gap and 24-pixel spacing around dividers. The phone content column caps at 420 pixels; illustrations fill that column without extra nested gutters. Desktop section padding is 64 pixels above and 48 below, and its heading caps at 48 pixels instead of 62. Touch tablet padding and the 32-pixel side-by-side column gap remain intact.

Validation: production build; 48 responsive layout combinations across Chromium/WebKit, English/Thai/Chinese and widths 320, 390, 600, 743, 744, 1024, 1440 and 1920. Checks cover shared alignment, copy/illustration gaps, step badge alignment, notice containment and page overflow. Normal-motion phone and desktop tests in both engines confirm Replay resets and restores all three confirmations. Reviewed English and Thai screenshots. These checks use browser emulation.

## Restore section alignment and desktop scroll layout — 28 October 2026

Removed the section-specific 860-pixel content cap and phone cap so the heading shares the main content gutter with the business section. Removed the custom heading-size and desktop padding overrides to restore the shared section spacing. Wide fine-pointer layouts again use the original side heading and step list, with the heading sticky at 112 pixels while the steps scroll alongside it. The compact tablet layout and grouped step labels remain. The existing GSAP reveal and illustration timelines were not changed.

Validation: production build; Chromium and WebKit checks at phone, portrait/landscape tablet, narrow desktop and wide desktop sizes. Confirmed matching section gutters, no page overflow, sticky heading entry/hold/release and working Replay animation. English, Thai and Chinese desktop text containment checks passed; desktop screenshot reviewed.

## Landscape iPad sticky heading — 28 October 2026

Enabled the desktop-style sticky heading for touch-capable landscape viewports at least 1024 pixels wide and 600 pixels tall. The heading stays at 112 pixels while the three steps scroll alongside it, then releases at the section boundary. Tablet columns use a 32-pixel outer gap and 24-pixel copy/illustration gap. Existing section gutters and tablet vertical padding remain unchanged. Portrait tablets and short landscape screens retain the stacked section heading. The illustration animation timelines are unchanged.

Validation: production build; Chromium and WebKit, three languages, and landscape sizes 1024×768, 1133×744, 1194×834 and 1366×1024. Checks cover shared section gutters, content containment, sticky hold/release, orientation changes and Replay. Additional checks cover phone, portrait iPad Pro, short landscape, reduced motion and desktop behavior. Reviewed WebKit screenshots at 1024 and 1194 pixels. Testing uses browser emulation rather than physical iPads.

## Landscape iPad reverse-scroll verification — 28 October 2026

Audited upward traversal at both sticky boundaries at 1024×768 and 1194×834 in Chromium and WebKit with normal motion. Slow and fast reverse traversal kept the heading fully opaque and within 0.5 pixels of the expected native sticky position; no discontinuous boundary movement was observed. Chromium touch-input tests on the Thai page also crossed both boundaries while dragging and after releasing the gesture, with heading-position errors below 0.5 pixels. Existing layout and animation code were retained because these checks did not reproduce a jump. These results are from browser emulation and do not establish physical iPad Safari behavior.

## Preserve reading position during iPad rotation — 28 October 2026

Reproduced landscape-to-portrait rotation losing the visible getting-started step, including jumps to scroll position zero. Responsive animation teardown and the preceding sections' height changes invalidated the absolute scroll position.

Added `preserve-how-position.js`, initialized before the responsive motion context. It caches the visible section entrance or step and its viewport offset before the viewport changes. On tablet orientation changes, it restores that anchor during layout/animation rebuild and refresh, then settles after resize events. Portrait headings return to normal flow; landscape headings retain native sticky positioning. Touch, pointer, wheel and keyboard input cancel pending restoration so subsequent user scrolling takes priority. The existing illustration timelines and gallery position restoration remain unchanged.

Validation: production build, Astro check (zero diagnostics), and all 17 project tests. Chromium/WebKit rotation checks cover section entry and steps two/three at 1024×768, 1194×834 and 1366×1024, English plus Thai/Chinese round trips, reduced motion, cancellation by user input and delayed position stability. Frame sampling during a Thai 1194×834-to-834×1194 rotation stayed within one pixel of the saved step offset from the first sampled resized frame. Gallery orientation/browser-height retention regression checks passed. Reviewed the portrait result in WebKit. Tests use browser emulation, not physical iPads.

## Mobile performance without visual or motion changes — 28 October 2026

Added a production-only Vite/PostCSS pruning pass before CSS content hashing. It scans application source and preserves runtime state classes, numbered film classes, generated Astro-scoped selectors, dynamic attributes, keyframes, font faces and variables. When introducing class names built from strings, update `scripts/prune-styles.mjs` safelists if the complete selector is absent from source. Development builds remain unpruned, so validate the production preview for visual regressions.

Preloaded the merchant hero screenshot and promoted its fetch priority, plus existing Thai/English first-screen body and heading font subsets. The image bytes, fonts, layouts, backgrounds, placeholders and animation code are unchanged. CSS shrank from 392,228 to 273,795 raw bytes; gzip payload from 67,206 to 49,218 bytes.

Lighthouse 13.5.0 with Chrome 156 and native arm64 Node, three sequential runs per device on the local Thai production preview: mobile Performance median 83 → 86 (after runs 86/86/90), desktop 99 → 100. Mobile FCP 2.72 → 2.41 seconds; LCP 4.00 → 3.69 seconds; TBT remains zero. Other category scores remain unchanged. Full before/after reports and methodology are under `outputs/lighthouse-2026-10-28-after` in the parent workspace.

Validation: build, zero Astro diagnostics and all 17 tests; computed layout/style comparisons across three languages and phone/tablet/desktop; Chromium/WebKit menu, contact dialog, Replay and iPad rotation/gallery regressions. Measurements use local preview and browser emulation, not physical iPad testing or deployed-site metrics.

## Further mobile asset-delivery optimization — 28 October 2026

Optimized the existing favicon's embedded PNG by preserving its alpha and removing RGB data ignored by the existing white-mask SVG filter. Raster output is pixel-identical at 16/32/64 pixels. Added a 144-pixel LINE logo derivative and responsive hero derivatives selected by viewport and device density; desktop and high-density mobile retain original sources when appropriate. The hero preload and image share source configuration in `src/data/hero-images.ts`. Layout, fonts, placeholders and motion scripts are unchanged.

`scripts/optimize-delivery-assets.mjs` regenerates these assets and is invoked after successful hero recaptures. Mobile Lighthouse median improved 86 → 89 across three runs (89/89/89), LCP 3.69 → 3.31 seconds. Total transferred bytes in run 2 fell 898,947 → 448,129, including the late favicon request. Desktop ranged 99–100 (median 99 versus 100 previously), with LCP 0.77 → 0.76 seconds and essentially unchanged FCP. Other categories remained unchanged. Reports are under `outputs/lighthouse-2026-10-28-round2` in the parent workspace.

Validation: production build, zero Astro diagnostics, 17 tests, Chromium/WebKit asset selection and layout checks across three languages and mobile/tablet/desktop, no duplicate hero preload requests, favicon pixel comparison, visual screenshot review, gallery rotation retention and Replay regression checks. These are local-preview and browser-emulation results.

## CSS/font delivery: mobile Lighthouse above 90 — 28 October 2026

Replaced the three static Fontsource families with their 5.3.0 variable packages. `src/styles/fonts.css` retains the original family names, normal style, swap behavior and unicode subsets; declared weight bounds remain 400–600 for Noto Sans Thai and 400–700 for Anuphan/Jakarta. Preloads now target the shared variable files, with Noto Latin body/Jakarta Latin heading preloads on English pages. Existing font sizes, weights, colors, layout styles and animation scripts are unchanged.

Font-face definitions fall from 41 to 11. Thai mobile font requests fall from 13 to 4, and sampled font transfer from 134,028 to 105,224 bytes. Gzip CSS shrinks from 49,218 to 41,299 bytes. Keep these aliases and weight bounds when updating font packages; importing the package CSS directly would introduce different family names/ranges. Font file URLs in BaseLayout must match the corresponding face definitions to avoid unused/duplicate preloads.

Three sequential Lighthouse runs per device, using the same native Chrome and simulated-throttling settings on the local Thai production preview: mobile 89/89/89 → 93/93/93; desktop 99/100/99 → 100/100/100. Mobile median FCP 2.42 → 1.81 seconds and LCP 3.31 → 3.01 seconds. Mobile CLS rises slightly from 0.0108 to 0.0125. Other category scores remain unchanged. Full reports are in the parent workspace under `outputs/lighthouse-2026-10-28-css-fonts`.

Validation: build, zero Astro diagnostics and 17 passing tests. Compared page and contact-dialog text wrapping, typography, colors, overflow and geometry in 36 Chromium/WebKit configurations across English/Thai/Chinese and widths 320/390/600/834/1194/1440. No line wrapping changed; maximum geometry difference was 0.265625 CSS pixel. Variable-font rasterization is not claimed pixel-identical. Menu, reduced motion, Replay, gallery orientation retention and 18 Getting Started rotation cases passed. These are local-preview/browser-emulation results, not physical-device or deployed-site measurements.

## Consistent business-icon motion — 28 October 2026

Separated symbol animation from the booking-card highlight timeline. All eight symbols now use a two-second motion window, sine easing and a 2.4-second neutral rest on phone, tablet and desktop. Each gesture starts and ends in its original pose; the utensil pair retains a short stagger. Petals close and reopen, the weight/cap/ticket lift, the travel pin rises, and the key/gear turn and return. The travel route stays visible throughout.

The symbol loop pauses outside the visible gallery and when the document is hidden. Reduced-motion mode keeps the original static icons. Card highlights, gallery scroll behavior, layout, colors and asset delivery remain unchanged. These animations use the existing GSAP runtime and add no assets or dependencies.

Validation: production build and Astro check (zero errors/warnings/hints). Frame-sampled all eight icons in Chromium and WebKit at 390×844, 834×1194, 1194×834 and 1440×1000. Verified visible movement, neutral rest, SVG path containment, offscreen pause, reduced-motion reset and no page errors; visually reviewed the iPad landscape result. Audit results are in `work/business-icons-audit.json` in the parent workspace. These are browser-emulation checks, not physical-device testing. Lighthouse was not rerun for this motion-only change.

## Consistent business-card interiors — 28 October 2026

Extended the Studio/Consultation visual structure to dining, wellness, fitness, education, events and travel: a shared heading row, 84-pixel white detail panel and compact metadata/status row. Booking-specific views retain time choices, capacity markers, lesson dates, event date/time and tour endpoints. All eight scenes retain their original height and outer styling. Added localized status copy and the existing Lucide users artwork for compact metadata icons.

The motion script and BusinessSymbol component remain byte-identical to their versions before this refinement. Existing animation selectors and target counts are retained, including selected slots/days, capacity fills, participant count and route labels.

Validation: production build and Astro check with zero diagnostics; 30 Chromium/WebKit layout checks across English/Thai/Chinese at 320, 390, 834, 1194 and 1440 pixels. Checked gallery navigation, equal scene heights, content containment, complete icons, localization and preserved animation targets; reviewed mobile and desktop captures. All eight icon motion checks passed in both engines at phone, portrait/landscape iPad and desktop sizes, including neutral rest, path containment, offscreen pause and reduced motion. These checks use browser emulation, not physical devices.

## Lighthouse after card refinements — 28 October 2026

Measured three sequential cold runs per device with the same Lighthouse 13.5.0 / Chrome 156, native arm64 Node, local Thai production preview and simulated mobile/desktop settings as the CSS/font baseline. Performance median remains mobile 93 and desktop 100; individual runs are 92/93/94 and 100/100/99. Median LCP changes from 3.01 to 3.07 seconds mobile and 0.69 to 0.77 seconds desktop. TBT remains 0 ms mobile and changes from 4 to 16 ms desktop. CLS stays 0.0125 mobile and 0 desktop. Total transfer increases by 1,111 bytes. No Lighthouse warnings.

The baseline predates both subsequent icon and card changes; this historical comparison does not isolate the six-card refinement. CPU benchmark variation prevents attributing small timing differences solely to code changes. Navigation Lighthouse does not measure gallery scrolling FPS. Desktop Accessibility varies 89/92/92 because the in-text-link audit differs between captures; no accessibility remediation was performed. Complete reports and comparison are in `outputs/lighthouse-2026-10-28-cards` in the parent workspace.

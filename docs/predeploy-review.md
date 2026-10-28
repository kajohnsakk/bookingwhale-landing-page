# Final experience review — 26 October 2026

Reviewed the English, Thai and Simplified Chinese landing pages before deployment. English remains the default at `/`, with `/th/` and `/zh/` as separate language routes.

## Issues fixed

| Finding | Change |
| --- | --- |
| Landscape mobile navigation extended below the screen | Constrained the menu to the dynamic viewport height and enabled internal vertical scrolling |
| An open mobile menu retained its expanded state after resizing to desktop | Close the mobile menu when the viewport crosses the desktop breakpoint |
| Swiping the business carousel on mobile, then resizing to desktop, left a native horizontal offset underneath the scroll-driven animation | Clear the native horizontal offset when entering the pinned desktop gallery; tested first and last cards after resizing and changing motion preferences |
| The English restaurant description suggested customers choose a meal rather than a dining time | Reworded the sentence to describe dining times and party size |
| The Chinese booking-list tab reused the translation for a record-count suffix | Added a separate list-view label in the marketing mockup and static merchant preview |
| Some copy changed perspective or sounded literal | Clarified the customer booking explanation, confirmation heading and selected Chinese phrases |
| The Thai footer used a different get-started label | Standardized it to `เริ่มใช้งาน`, matching the primary calls to action |
| A dynamic English counter could read `1 Bookings` | Placed the booking label before the number and removed the redundant unit after the total |
| The Thai contact section used an older English dashboard screenshot | Generated matching current screenshots for all three languages and selected them consistently by locale |
| Thai merchant preview used a different year convention in its month heading | Matched the visible month heading to the Buddhist-year convention used elsewhere in the Thai demo |

Localized contact captures and social cards were regenerated. Static tests also cover localized accessibility labels in the embedded examples, so fixing visible dates does not leave Thai labels on English or Chinese pages.

## Verification

- Static production build passed.
- Astro diagnostics: 35 files, zero errors, warnings or hints.
- Sixteen static-output tests passed, including SEO regression coverage, localized content, CTA wording, localized contact assets, heading hierarchy and preview indexability.
- General layout checks: 320×740, 390×844, 768×1024, 1024×768, 1440×900 and 1920×1080 in all three languages. No document-level horizontal overflow or browser script errors.
- Additional breakpoint checks: 360×640, 600×960, 900×700, 901×720, 1024×1366, 844×390 and 720×450 in all three languages. Reviewed onboarding, expanded FAQs and contact content for clipping, plus navigation bounds.
- Booking story: 27 locale/viewport/motion combinations and all five steps, totaling 135 scene checks. All steps selected correctly, with no card or header overflow, header overlap or browser script errors.
- Scroll-linked story advanced and reversed through date, time, details, business and customer chapters in each language.
- All nine onboarding replay controls (three steps across three languages) reached their completed state after replay.
- Chromium and WebKit: navigation, language switching with preserved section, Escape handling, FAQ expansion and resizing passed. New landscape-menu, carousel-resize and dynamic Reduce Motion regression cases passed for every language in both engines.
- Reduce Motion removes pinned/scrubbed presentation and replay controls; manual booking-step navigation remains usable. Re-enabling motion restores the desktop gallery without the stale horizontal offset.
- Initial HTML, language links and SEO metadata remain available with JavaScript disabled in all three languages.

Screenshots were reviewed for compact mobile, breakpoint and desktop layouts. Horizontal cards outside the carousel's visible area and the intentionally visually hidden section heading are not treated as page overflow.

## Business gallery discoverability follow-up

- Added a localized scrolling hint, visible card range and previous/next controls above the business cards.
- Controls support the native mobile gallery and the desktop scroll-linked gallery. Arrow keys, Home and End work in both modes; controls disable at the first and last positions.
- Retained 44-pixel button targets and compact spacing for narrow screens. Reduced Motion uses immediate navigation.
- Deferred image-triggered ScrollTrigger refreshes until scrolling settles, preventing interrupted smooth navigation. Resize observers schedule layout writes on the next animation frame.
- Reviewed Thai screenshots at 320 and 1440 pixels wide. All 30 browser cases passed across English, Thai and Chinese in Chromium and WebKit, including native scrolling, desktop pinning and Reduced Motion. All six resize regression cases and 16 static tests also passed; build and Astro diagnostics passed. Evidence: `work/business-controls-audit.json` and `work/business-resize-regressions.log`.

## Scope and release boundary

No remaining blocker was found within these local browser checks. They simulate viewport sizes in Chromium and WebKit; they do not represent tests on every physical device. Performance and production SEO considerations remain documented in `experience-review.md` and `seo-review.md`.

No deployment was performed. The 28 October [SEO migration](seo-migration.md) now includes existing articles, legal and other live routes. Before replacing production, verify host-level redirects, cache behavior and real HTTP statuses using that checklist.

## Evidence

Browser test scripts and JSON reports are in the workspace `work/` directory:

- `experience-audit.json`
- `predeploy-edge-audit.json`
- `story-audit.json`
- `predeploy-regressions.json`
- `final-motion-audit.json`
- `navigation-audit.json`
- `seo-browser-audit.json`
- `predeploy-replay.log`

The repeatable static regression suite is `npm test` after `npm run build` in `bookingwhale-astro`.

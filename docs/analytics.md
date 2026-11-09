# Google Analytics and cookie consent

The site uses GA4 measurement ID `G-N2554HPN72`. Both page layouts include the shared consent component. Google tags, the dataLayer and contact events start only after analytics consent. Events before acceptance are discarded, never replayed. No consent-mode cookieless pings are sent before acceptance.

The banner and footer settings support Thai, English and Simplified Chinese. Necessary preference storage uses `bw-cookie-consent` in localStorage with a schema version, choice and timestamp. It expires after 180 days. Missing, invalid, expired or unreadable storage defaults to no analytics. The visitor may accept or decline with equally accessible controls; declining does not affect contact links or page functionality. Returning visitors can reopen settings from the footer. The details explain storage, measurement, Google as recipient and withdrawal.

Acceptance initializes analytics once with advertising storage, user data and personalization denied; Google signals and ad personalization are disabled. Analytics cookie lifetime is explicitly 180 days. This does not configure GA property-level event retention, which must be checked separately.

Withdrawal immediately sets the GA disable flag, discards queued events, removes accessible GA cookies and reloads the page to unload automatic Google listeners. Cross-tab preference changes and restored pages are handled. Already sent data is not retroactively deleted. Preferences are browser/origin-specific. If storage is unavailable, no persistent acceptance can be assumed on another page.

## Events

| Event | Trigger | Extra parameters |
| --- | --- | --- |
| `contact_modal_open` | The contact dialog successfully opens | `placement`, `page_language` |
| `contact_line_click` | Click on the existing Booking Whale LINE link | `placement`, `page_language` |
| `contact_phone_click` | Click on either business phone link | `placement`, `page_language`, `contact_target` |
| `contact_email_click` | Click on the business email link | `placement`, `page_language` |

`placement` identifies `top`, `navigation`, `mobile_menu`, `contact`, `modal`, or `footer`, depending on the actual trigger. `contact_target` is `primary` or `secondary`. `page_language` is the HTML language (`en`, `th`, or `zh-Hans`). Other future section IDs can also appear as placement values.

Modal events originate after `showModal()` in the existing dialog handler. Modifier-key clicks and attempts to open an already-open dialog do not count as opens. Contact links use a single delegated click listener, including the phone and email links in the footer. Analytics does not cancel navigation, delay links, or change the existing dialog animations. After acceptance, events can queue while the Google tag is downloading. A blocked tag does not prevent the site or dialog from working.

The events measure clicks and dialog opens, not completed conversations or successful bookings. No user-entered text or customer data is added to these custom event parameters. Google's standard enhanced measurement may also produce a separate generic outbound `click` event; use the `contact_*` names for this funnel rather than adding both event families together.

## Environments

- The bootstrap is emitted only for production builds.
- Runtime hostname must be exactly `bookingwhale.co` or `www.bookingwhale.co`.
- Localhost, loopback and other preview/staging hosts do not load GA or register tracking listeners, including when serving the production build locally.
- `/previews/`, `/hero-preview/`, and `/hero-live/` paths do not initialize analytics.
- Set `PUBLIC_ANALYTICS_ENABLED=false` when building to omit analytics entirely. Use this for a preview served under a production hostname too.
- Changing `SITE_URL` alone does not change the analytics hostname allowlist.

## Google configuration after deployment

The implementation does not change settings in the GA property. Check Realtime after deploying to an allowed hostname. Register `placement`, `page_language`, and `contact_target` as event-scoped custom dimensions if they need to be selectable in normal reports/Explorations. Key events can be selected in GA separately according to the business definition of a lead.

The Search Console file is copied unchanged from the previous site to `public/googlee32eeeae4c95b322.html`. The build emits it at `/googlee32eeeae4c95b322.html`. No DNS or Search Console ownership settings were changed.

## Verification

Run `npm run build`, `npm run check`, and `npm test`. The analytics tests cover host/path gating, duplicate initialization, queue behavior, event names, contact destinations, and the verification output.

The integration audit in the workspace's `work/analytics/validate.mjs` also loads the real Google tag and inspects intercepted collection requests across all three languages. Test collection and advertising requests receive local empty responses; they are not submitted to Google Analytics. Performance measurements and their conditions are documented in `outputs/analytics-2026-10-28/README.md` at the workspace root.

Official references: [Google tag events](https://developers.google.com/tag-platform/gtagjs/reference#event), [GA4 page views](https://developers.google.com/analytics/devguides/collection/ga4/views).

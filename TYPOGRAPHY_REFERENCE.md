# Marketing typography reference

Source: https://joinreggu.com/styles.css, inspected 24 October 2026.

| Role | Formula | At 1280px | At 390px |
| --- | --- | --- | --- |
| Hero | clamp(40px, 5.4vw, 74px) | 69.12px | 40px |
| Section heading | clamp(34px, 4.6vw, 62px) | 58.88px | 34px |
| Product story heading | clamp(28px, 3.4vw, 46px) | 43.52px | 28px |
| Card / step heading | clamp(22px, 2.4vw, 30px) | 30px | 22px |
| Hero introduction | clamp(17px, 1.4vw, 20px) | 17.92px | 17px |
| Section introduction | clamp(18px, 1.5vw, 22px) | 19.2px | 18px |
| Body / FAQ answer | 16px | 16px | 16px |
| FAQ question | 18px | 18px | 18px |
| CTA heading | clamp(40px, 6.5vw, 92px) | 83.2px | 40px |
| Navigation | 15.5px | 15.5px | 15.5px |
| Main button | 17px | 17px | 17px |
| Navigation button | 14px | 14px | 14px |
| Eyebrow | 13px | 13px | 13px |
| Footer link / address | 14.5px | 14.5px | 14.5px |
| Footer legal | 14px | 14px | 14px |

Sizes use viewport units exactly as reference. Thai headings use 1.22–1.4 line height and paragraphs 1.65 for Thai marks and readability. The reference uses a different font family and tighter Latin line heights. Real product captures and miniature illustration UI retain their original sizes; these are product content, not marketing typography.

Layout ownership is in src/styles/layout-system.css; marketing typography is in src/styles/typography.css. Product components retain their UI-specific styling.

Section order: introduction → product walkthrough → business examples → setup → articles → questions → product CTA. The duplicated LINE walkthrough is no longer rendered. Desktop product walkthrough and business gallery are the only scroll-pinned sections. All other sections stay in normal document flow.

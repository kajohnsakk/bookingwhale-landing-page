# BookingWhale design preferences

- Position BookingWhale as a booking platform for many business types. Do not make the main marketing message restaurant-specific. Use the fictional restaurant Olive & Oak only as the consistent primary UI example.
- Follow Reggu’s presentation approach: short benefit-led headlines, concise supporting copy, and product visuals that explain one idea at a time. Retain BookingWhale branding.
- Keep other business categories in the existing horizontal parallax section.
- Do not wrap illustrations in large rounded panels containing nested cards. Group with spacing, typography, and thin dividers instead.
- Physical phone and computer device silhouettes are appropriate for the CTA, as explicitly requested. Do not add another enclosing card around them.
- Use real product components for captured screenshots, with fictional sample data. Clearly distinguish sample captures from authenticated production screens.
- Keep the original hero concept and native UI motion. Use restrained blue, solid backgrounds, no gradients, glow, or fuzzy shadows.
- Keep content aligned to the same centered width across sections. Avoid unnecessary captions and playback controls.
- Use Thai marketing copy and English sample names and business data.

- Give CTA product screens the full content width below the headline. Keep customer cover and shop logo visible, use the BookingWhale wordmark on the management screen, and avoid covering useful screen content. Stack devices on small screens instead of shrinking both into an unreadable composition.

- Use concrete labels describing the visible product function. Avoid generic filler such as knowing customers, continuing care, or aspirational scene slogans.

- Product stories use a thin upright phone for customer-web and a computer for service-management-web, transitioning on scroll. Use main source components and original component styling; never hand-redraw product UI. B & W is fixture data. Record source commits and distinguish component renders from full authenticated app captures.

- Correction: device mockups and main component captures are for CTA ONLY. Keep the original product scrollytelling section. Typography follows Reggu scale with Thai line-height adaptation.

## 24 October 2026 — specialist redesign

Use Reggu’s exact responsive marketing font-size formulas from TYPOGRAPHY_REFERENCE.md. Keep Thai line-height comfortable and product screenshot/UI sizing intact. The canonical final layout rules live in layout-system.css. Desktop tall viewports use only two GSAP pins: product walkthrough and business gallery. Small/short viewports use selectable product steps and native swipe. Maintain full-height gallery background while pinned; never fade all card UI content in a loop. No duplicate LINE walkthrough.

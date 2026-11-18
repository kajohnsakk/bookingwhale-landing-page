# Seasonal themes

Seasonal themes decorate the landing page for a date range without changing the main theme. Outside every range, no seasonal styles apply and no seasonal effect code is downloaded.

## How it works

| Piece | File | Role |
|---|---|---|
| Registry | `src/data/seasons.ts` | Each theme's `id`, date range (`MM-DD`), greeting and icon |
| Activation | `src/components/SeasonalTheme.astro` | Inline script sets `<html data-season="id">` when today is in range |
| Styles | `src/styles/seasons/<id>.css` | Every rule is scoped under `html[data-season=<id>]` |
| Effects | `src/scripts/seasons/<id>.ts` | Loaded with a dynamic import only while the theme is active |
| Shared effects | `src/scripts/seasons/snow.ts`, `src/styles/seasons/base.css` | Reusable pieces such as falling snow |

Ranges may cross the new year: `start: '11-19', end: '01-06'` is active from 19 November to 6 January. The first matching theme wins.

## Preview

- `?theme=christmas` forces a theme on any date.
- `?theme=default` forces the main theme, even inside a season.

## Add a theme

1. Add an entry to `seasons` in `src/data/seasons.ts`. Use an icon name from `src/components/icons.json`.
2. Add the greeting's English and Chinese text to `src/i18n/messages.json`.
3. Create `src/styles/seasons/<id>.css`. Scope every selector with `html[data-season=<id>]`, and show the greeting with `html[data-season=<id>] #bookingwhale .bwx-season-greeting[data-season-greeting=<id>]`. Import the file in `SeasonalTheme.astro`.
4. If the theme needs motion, create `src/scripts/seasons/<id>.ts` exporting `start()`, and register it in `effects` in `src/scripts/seasons/index.ts`.
5. Preview with `?theme=<id>` on desktop, mobile and with reduced motion, then check `?theme=default` still matches the main theme.

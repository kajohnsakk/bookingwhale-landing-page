# Font delivery

The normal Latin copy uses smaller WOFF2 subsets of the same variable fonts. Their shapes, advance widths and variation axes are retained. Thai and extended-language faces remain unchanged. The original Latin faces are declared first in `src/styles/fonts.css` and remain available for accented characters outside the core subset.

The generated core files live in `src/assets/fonts/`. English font preloads in `src/layouts/BaseLayout.astro` use those same files. Font licenses are shipped in `public/licenses/fonts/`.

To regenerate after a Fontsource dependency update, use Python with `fonttools` and `brotli` installed:

```sh
python3 scripts/subset-fonts.py
npm run build
npm run test
```

The script checks character coverage and base glyph advances. Browser verification must also compare headings and section geometry in English, Thai and Chinese, and confirm accented Latin text can still load the original faces. Do not remove the original faces just because current marketing copy does not use every character.

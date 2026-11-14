# Font delivery

The normal Latin copy uses smaller WOFF2 subsets of the same variable fonts. Their shapes, advance widths and variation axes are retained. Extended-language fallback faces remain available. The main Thai faces and core Latin body/heading faces are also limited to the weight ranges already declared by the site: 400–600 for Noto Sans Thai and 400–700 for Anuphan and Plus Jakarta Sans. The original Latin faces are declared first in `src/styles/fonts.css` and remain available for accented characters outside the core subset.

The generated core files live in `src/assets/fonts/`. Thai and English font preloads in `src/layouts/BaseLayout.astro` use the matching optimized files. Thai pages also preload the Latin faces used by LINE OA, numbers and Latin names. Font licenses are shipped in `public/licenses/fonts/`.

To regenerate after a Fontsource dependency update, use Python with `fonttools` and `brotli` installed:

```sh
python3 scripts/subset-fonts.py
python3 scripts/limit-font-weights.py
npm run build
npm run test
```

The script checks character coverage and base glyph advances. Browser verification must also compare headings and section geometry in English, Thai and Chinese, and confirm accented Latin text can still load the original faces. Do not remove the original faces just because current marketing copy does not use every character.

The range optimization reduces the four primary files from 84,964 to 52,932 bytes (37.7%). All characters remain available. Variable-font instancing can round advances by at most 0.5 font units; the generator checks that tolerance at 50-weight intervals. Browser comparisons must verify wrapping and geometry, including fractional-pixel differences, rather than claiming byte-identical glyph rendering.

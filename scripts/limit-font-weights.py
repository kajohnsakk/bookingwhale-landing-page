from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parents[1]
results = []
for family, script, maximum in [
    ('noto-sans-thai', 'thai', 600),
    ('noto-sans-thai', 'latin', 600),
    ('anuphan', 'thai', 700),
    ('plus-jakarta-sans', 'latin', 700),
]:
    source = root / 'src/assets/fonts' / f'{family}-latin-core.woff2' if script == 'latin' else root / 'node_modules/@fontsource-variable' / family / 'files' / f'{family}-thai-wght-normal.woff2'
    target = root / 'src/assets/fonts' / f'{family}-{script}-range.woff2'
    original = TTFont(source, recalcTimestamp=False)
    optimized = instantiateVariableFont(original, {'wght': (400, maximum)}, inplace=False)
    optimized.save(target)
    restored = TTFont(target)
    assert original.getBestCmap() == restored.getBestCmap()
    maximum_width_difference = 0
    for weight in range(400, maximum + 1, 50):
        before = original.getGlyphSet(location={'wght': weight})
        after = restored.getGlyphSet(location={'wght': weight})
        for glyph in original.getBestCmap().values():
            difference = abs(before[glyph].width - after[glyph].width)
            maximum_width_difference = max(maximum_width_difference, difference)
            assert difference <= 0.51, (family, glyph, weight)
    results.append({'family': family, 'script': script, 'original_bytes': source.stat().st_size, 'optimized_bytes': target.stat().st_size, 'weights': [400, maximum], 'maximum_advance_difference_font_units': maximum_width_difference, 'units_per_em': original['head'].unitsPerEm})
print(json.dumps(results, indent=2))

from pathlib import Path
import json
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
points = set(range(0x20, 0x7F)) | {0xA0, 0xA9, 0xAE, 0xB7, 0xD7, 0x2122, 0x2191, 0x2193, 0x2212, 0x2215, 0xFEFF, 0xFFFD} | set(range(0x2000, 0x2070))
results = []
for family in ['noto-sans-thai', 'anuphan', 'plus-jakarta-sans']:
    package = root / 'node_modules' / '@fontsource-variable' / family
    source = package / 'files' / f'{family}-latin-wght-normal.woff2'
    target = root / 'src/assets/fonts' / f'{family}-latin-core.woff2'
    original = TTFont(source)
    selected = points & set(original.getBestCmap())
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    options.name_IDs = ['*']
    options.name_languages = ['*']
    options.recalc_timestamp = False
    font = TTFont(source)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=selected)
    subsetter.subset(font)
    font.save(target)
    optimized = TTFont(target)
    assert set(optimized.getBestCmap()) == selected
    for codepoint in selected:
        assert original['hmtx'][original.getBestCmap()[codepoint]] == optimized['hmtx'][optimized.getBestCmap()[codepoint]]
    (root / 'public/licenses/fonts' / f'{family}.txt').write_text((package / 'LICENSE').read_text())
    results.append({'family': family, 'original_bytes': source.stat().st_size, 'core_bytes': target.stat().st_size, 'codepoints': len(selected), 'advance_widths_unchanged': True})
print(json.dumps(results, indent=2))

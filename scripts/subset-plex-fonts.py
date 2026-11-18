from pathlib import Path
import json
import shutil
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
package = root / 'node_modules' / '@fontsource' / 'ibm-plex-sans-thai'
fonts = root / 'src/assets/fonts'
points = set(range(0x20, 0x7F)) | {0xA0, 0xA9, 0xAE, 0xB7, 0xD7, 0x2122, 0x2191, 0x2193, 0x2212, 0x2215, 0xFEFF, 0xFFFD} | set(range(0x2000, 0x2070))
results = []
for weight in [400, 500, 600, 700]:
    thai_source = package / 'files' / f'ibm-plex-sans-thai-thai-{weight}-normal.woff2'
    thai_target = fonts / f'ibm-plex-sans-thai-thai-{weight}.woff2'
    shutil.copyfile(thai_source, thai_target)
    latin_source = package / 'files' / f'ibm-plex-sans-thai-latin-{weight}-normal.woff2'
    latin_target = fonts / f'ibm-plex-sans-thai-latin-core-{weight}.woff2'
    original = TTFont(latin_source)
    selected = points & set(original.getBestCmap())
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    options.name_IDs = ['*']
    options.name_languages = ['*']
    options.recalc_timestamp = False
    font = TTFont(latin_source)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=selected)
    subsetter.subset(font)
    font.save(latin_target)
    optimized = TTFont(latin_target)
    assert set(optimized.getBestCmap()) == selected
    for codepoint in selected:
        assert original['hmtx'][original.getBestCmap()[codepoint]] == optimized['hmtx'][optimized.getBestCmap()[codepoint]]
    results.append({'weight': weight, 'thai_bytes': thai_target.stat().st_size, 'latin_original_bytes': latin_source.stat().st_size, 'latin_core_bytes': latin_target.stat().st_size, 'codepoints': len(selected)})
(root / 'public/licenses/fonts' / 'ibm-plex-sans-thai.txt').write_text((package / 'LICENSE').read_text())
print(json.dumps(results, indent=2))

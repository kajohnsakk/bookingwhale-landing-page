import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from 'parse5';

const read = path => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const nodes = node => [node, ...(node.childNodes || []).flatMap(nodes)];

test('decorative previews are excluded from indexing without blocking rendering', () => {
  const paths = ['hero-live/customer/index.html', 'hero-live/merchant/index.html'];
  for (const screen of ['booking', 'merchant', 'success']) {
    paths.push(`hero-preview/${screen}.html`);
    for (const locale of ['en', 'th', 'zh']) paths.push(`previews/${locale}/${screen}.html`);
  }
  for (const path of paths) assert.match(read(path), /<meta name="robots" content="noindex"\s*\/?\s*>/, path);
  assert.doesNotMatch(read('robots.txt'), /Disallow:\s*\/(?:previews|hero-preview|hero-live|assets|_astro)/);
});

test('landing page headings have a continuous hierarchy in every language', () => {
  for (const path of ['index.html', 'en/index.html', 'zh/index.html']) {
    const headings = nodes(parse(read(path))).filter(node => /^h[1-6]$/.test(node.tagName));
    assert.equal(headings.filter(node => node.tagName === 'h1').length, 1);
    let previous = 0;
    for (const heading of headings) {
      const level = Number(heading.tagName[1]);
      assert.ok(level <= previous + 1, `${path}: ${previous} → ${level}`);
      previous = level;
    }
  }
});

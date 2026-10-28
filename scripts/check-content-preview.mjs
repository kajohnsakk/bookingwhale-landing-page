import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { parse } from 'parse5';

const base = new URL(process.env.PREVIEW_URL || 'http://127.0.0.1:4321');
const slugs = readdirSync(new URL('../src/content/blog/', import.meta.url)).filter(file => file.endsWith('.md')).map(file => file.slice(0, -3));
const flatten = node => [node, ...(node.childNodes || []).flatMap(flatten)];
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const hasClass = (node, name) => attr(node, 'class')?.split(/\s+/).includes(name);
const seen = [];
const pageCount = Math.ceil(slugs.length / 12);

async function readPage(path) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path} must return 200`);
  return flatten(parse(await response.text()));
}

assert.ok(slugs.length > 0, 'Expected article source files');
for (let page = 1; page <= pageCount; page++) {
  const path = page === 1 ? '/blog/' : `/blog/page/${page}/`;
  const nodes = await readPage(path);
  const cards = nodes.filter(node => node.tagName === 'article' && hasClass(node, 'editorial-card'));
  assert.equal(cards.length, Math.min(12, slugs.length - (page - 1) * 12), `${path}: missing article cards; restart the dev server with --force if its content store is stale`);
  const pagination = nodes.find(node => node.tagName === 'nav' && hasClass(node, 'editorial-pagination'));
  assert.equal(flatten(pagination).filter(node => node.tagName === 'a').length, pageCount, `${path}: pagination`);
  for (const card of cards) {
    const link = flatten(card).find(node => node.tagName === 'a');
    seen.push(attr(link, 'href'));
  }
}
assert.deepEqual(seen.toSorted(), slugs.map(slug => `/blog/${slug}/`).toSorted());
const sample = [...new Set([slugs[0], slugs.at(-1), 'line-oa-booking-guide', 'yoga-studio-booking-system', 'nail-salon-booking-system'])];
for (const slug of sample) {
  const path = `/blog/${slug}/`;
  const nodes = await readPage(path);
  assert.equal(nodes.filter(node => node.tagName === 'h1').length, 1, `${path}: article heading`);
  assert.ok(nodes.some(node => node.tagName === 'div' && hasClass(node, 'editorial-prose')), `${path}: article body`);
}
console.log(`Verified ${slugs.length} article links across ${pageCount} index pages and ${sample.length} article pages at ${base.origin}.`);

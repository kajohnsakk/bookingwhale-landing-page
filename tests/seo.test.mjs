import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from 'parse5';

const read = path => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const routes = [
  { locale: 'en', lang: 'en', path: 'en/', ogLocale: 'en_US' },
  { locale: 'th', lang: 'th', path: '', ogLocale: 'th_TH' },
  { locale: 'zh', lang: 'zh-Hans', path: 'zh/', ogLocale: 'zh_CN' },
];
const pages = routes.map(route => {
  const document = parse(read(`${route.path}index.html`));
  const nodes = [];
  function walk(node) {
    if (node.tagName) nodes.push({ ...node, attributes: Object.fromEntries(node.attrs.map(a => [a.name, a.value])) });
    for (const child of node.childNodes || []) walk(child);
  }
  walk(document);
  const meta = key => nodes.find(n => n.tagName === 'meta' && (n.attributes.name === key || n.attributes.property === key))?.attributes.content;
  const canonical = nodes.find(n => n.tagName === 'link' && n.attributes.rel === 'canonical')?.attributes.href;
  const title = nodes.find(n => n.tagName === 'title').childNodes.map(n => n.value || '').join('');
  const schema = JSON.parse(nodes.find(n => n.tagName === 'script' && n.attributes.type === 'application/ld+json').childNodes[0].value);
  return { ...route, nodes, meta, canonical, title, schema };
});

test('locale pages use unique language-specific search and social metadata', () => {
  assert.equal(new Set(pages.map(page => page.title)).size, 3);
  assert.equal(new Set(pages.map(page => page.meta('description'))).size, 3);
  for (const page of pages) {
    assert.ok(page.title.includes('LINE OA'));
    assert.ok(page.meta('description').length > 50);
    assert.equal(page.meta('og:title'), page.title);
    assert.equal(page.meta('twitter:title'), page.title);
    assert.equal(page.meta('og:description'), page.meta('description'));
    assert.equal(page.meta('twitter:description'), page.meta('description'));
    assert.equal(page.meta('og:locale'), page.ogLocale);
    assert.equal(page.meta('twitter:card'), 'summary_large_image');
    assert.equal(page.meta('og:url'), page.canonical);
    assert.equal(page.meta('twitter:image'), page.meta('og:image'));
    assert.equal(page.meta('og:image:width'), '1200');
    assert.equal(page.meta('og:image:height'), '630');
    assert.ok(page.meta('og:image:alt').length > 15);
    assert.doesNotMatch(page.meta('robots'), /noindex|nofollow/);
    const image = readFileSync(new URL(`../dist${new URL(page.meta('og:image')).pathname}`, import.meta.url));
    assert.equal(image.subarray(1, 4).toString(), 'PNG');
    assert.equal(image.readUInt32BE(16), 1200);
    assert.equal(image.readUInt32BE(20), 630);
  }
});

test('canonical and all language return links agree with sitemap entries', () => {
  const sitemap = read('sitemap-0.xml');
  const entries = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].map(match => match[1]);
  assert.equal(entries.length, 99);
  const origin = new URL(pages[0].canonical).origin;
  for (const page of pages) {
    assert.equal(page.canonical, `${origin}/${page.path}`);
    const links = page.nodes.filter(n => n.tagName === 'link' && n.attributes.rel === 'alternate');
    assert.equal(links.length, 4);
    const entry = entries.find(value => value.includes(`<loc>${page.canonical}</loc>`));
    assert.ok(entry);
    for (const target of [...routes, { lang: 'x-default', path: '' }]) {
      const url = `${origin}/${target.path}`;
      assert.ok(links.some(n => n.attributes.hreflang === target.lang && n.attributes.href === url));
      assert.ok(entry.includes(`hreflang="${target.lang}" href="${url}"`));
    }
  }
  assert.doesNotMatch(sitemap, /\/previews\/|\/hero-preview\/|\/hero-live\//);
  assert.ok(read('robots.txt').includes(`${origin}/sitemap-index.xml`));
});

test('structured data describes the actual site with localized linked page entities', () => {
  for (const page of pages) {
    assert.equal(page.schema['@context'], 'https://schema.org');
    const graph = page.schema['@graph'];
    const organization = graph.find(node => node['@type'] === 'Organization');
    const website = graph.find(node => node['@type'] === 'WebSite');
    const webpage = graph.find(node => node['@type'] === 'WebPage');
    assert.equal(graph.length, 3);
    assert.equal(organization.name, 'Booking Whale');
    assert.equal(organization.email, 'info@bookingwhale.co');
    assert.equal(website.publisher['@id'], organization['@id']);
    assert.equal(website.url, new URL('/', page.canonical).href);
    assert.equal(webpage.isPartOf['@id'], website['@id']);
    assert.equal(webpage.about['@id'], organization['@id']);
    assert.equal(webpage.url, page.canonical);
    assert.equal(webpage.name, page.title);
    assert.equal(webpage.description, page.meta('description'));
    assert.equal(webpage.inLanguage, page.lang);
    assert.equal(webpage.primaryImageOfPage.url, page.meta('og:image'));
    assert.doesNotMatch(JSON.stringify(page.schema), /aggregateRating|reviewCount|priceCurrency|SearchAction/);
  }
});


test('legacy Thai aliases redirect while the existing English home stays indexable', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.deepEqual(config.redirects.find(item => item.source === '/th/'), { source: '/th/', destination: '/', permanent: true });
  assert.ok(!config.redirects.some(item => item.source === '/en'));
  assert.match(read('th/index.html'), /http-equiv="refresh"/);
  assert.doesNotMatch(read('en/index.html'), /http-equiv="refresh"/);
  assert.doesNotMatch(read('sitemap-0.xml'), /<loc>https:\/\/bookingwhale\.co\/th\/<\/loc>/);
  for (const page of pages) {
    for (const target of routes) {
      const link = page.nodes.find(node => node.tagName === 'a' && node.attributes['data-language'] === target.locale);
      assert.equal(link?.attributes.href, `/${target.path}`);
    }
  }
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import sharp from 'sharp';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
test('responsive hero candidates have accurate width descriptors and matching preloads', async () => {
  for(const locale of ['en','th','zh']){
    const page=readFileSync(new URL(`../dist/${locale==='th'?'':locale+'/'}index.html`,import.meta.url),'utf8');
    const images=[...page.matchAll(/<img\b[^>]*src="(\/assets\/hero-screens\/[^\"]+)"[^>]*>/g)];
    const preload=page.match(/<link\b[^>]*as="image"[^>]*>/)[0];
    for(const [tag,src] of images){
      const srcset=tag.match(/srcset="([^"]+)"/)[1];
      const sizes=tag.match(/sizes="([^"]+)"/)[1];
      for(const candidate of srcset.split(',')){
        const [asset,descriptor]=candidate.trim().split(/\s+/);
        const metadata=await sharp(new URL('../dist'+asset,import.meta.url).pathname).metadata();
        assert.equal(metadata.width,Number(descriptor.slice(0,-1)),asset);
      }
      if(src.includes('/merchant.')){
        assert.equal(preload.match(/imagesrcset="([^"]+)"/)[1],srcset);
        assert.equal(preload.match(/imagesizes="([^"]+)"/)[1],sizes);
      }
    }
  }
});
test('content is static HTML without preview runtime', () => {
  assert.match(html, /<html[^>]+lang="th"/);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /ลูกค้า/);
  assert.doesNotMatch(html, /<iframe\b/);
  assert.doesNotMatch(html, /srcdoc=|bw-preview-toolbar|bw-section-picker|window\.openai/);
});
test('section links resolve and IDs are unique', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), id);
});
test('SEO metadata and sitemap exist', () => {
  assert.match(html, /name="description"/);
  assert.match(html, /rel="canonical"/);
  const schema = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  assert.ok(JSON.parse(schema[1])['@graph'].some(node => node['@type'] === 'Organization'));
  assert.ok(existsSync(new URL('../dist/sitemap-index.xml', import.meta.url)));
  assert.match(readFileSync(new URL('../dist/robots.txt', import.meta.url), 'utf8'), /Sitemap: https:\/\/bookingwhale.co\/sitemap-index.xml/);
});
test('local assets used by the document exist', () => {
  for (const [, path] of html.matchAll(/(?:src|href)="(\/(?:assets|_astro)\/[^"?#]+)"/g)) {
    assert.ok(existsSync(new URL('../dist' + path, import.meta.url)), path);
  }
  assert.doesNotMatch(html, /fonts\.googleapis|cdnjs/);
});
test('hero screens have eager images and embedded fallbacks without waiting for JavaScript', () => {
  for (const locale of ['en','th','zh']) {
    const page=readFileSync(new URL(`../dist/${locale==='th'?'':locale+'/'}index.html`,import.meta.url),'utf8');
    const images=[...page.matchAll(/<img\b[^>]*src="(\/assets\/hero-screens\/[^\"]+)"[^>]*>/g)];
    assert.equal(images.length,3);
    for(const [tag,src] of images){
      assert.ok(src.startsWith(`/assets/hero-screens/${locale}/`));
      assert.match(tag,/loading="eager"/);
      assert.match(tag,/width="\d+" height="\d+"/);
      assert.ok(existsSync(new URL('../dist'+src,import.meta.url)));
    }
    const fallbacks=[...page.matchAll(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/g)];
    assert.equal(fallbacks.length,3);
    assert.ok(fallbacks.reduce((size,[,data])=>size+data.length,0)<15000);
    for(const [,data] of fallbacks){
      const bytes=Buffer.from(data,'base64');
      assert.equal(bytes.toString('ascii',0,4),'RIFF');
      assert.equal(bytes.toString('ascii',8,12),'WEBP');
    }
  }
});
test('hero previews are prerendered and do not boot app runtimes', () => {
  for (const name of ['merchant','booking','success']) {
    const preview = readFileSync(new URL(`../dist/hero-preview/${name}.html`, import.meta.url), 'utf8');
    assert.doesNotMatch(preview, /<script\b|rel="modulepreload"/);
    assert.match(preview, /id="root"[^>]*inert/);
    assert.match(preview, /Sunday Social/);
    for (const [, asset] of preview.matchAll(/(?:src|href)="(\/[^"?#]+)"/g)) {
      assert.ok(existsSync(new URL('../dist' + asset, import.meta.url)), asset);
    }
  }
});
test('small brand mark has a small payload', () => {
  const mark = readFileSync(new URL('../dist/assets/bookingwhale-mark-96.png', import.meta.url));
  assert.ok(mark.length < 10000);
  assert.doesNotMatch(html, /src="\/favicon\.png"/);
});

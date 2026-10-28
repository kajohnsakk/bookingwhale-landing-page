import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parse} from 'parse5';
const read=path=>readFileSync(new URL('../dist/'+path,import.meta.url),'utf8');
function copy(html){const result=[];function walk(n){if(['style','script'].includes(n.tagName))return;if(n.nodeName==='#text')result.push(n.value);for(const a of n.attrs||[])if(['alt','title','aria-label','placeholder'].includes(a.name))result.push(a.value);for(const c of n.childNodes||[])walk(c);}walk(parse(html));return result.filter(t=>t.trim()!=='ไทย'&&!t.includes('Language /'));}
for(const [locale,path,lang,cta] of [['en','en/index.html','en','Get started'],['th','index.html','th','เริ่มใช้งาน'],['zh','zh/index.html','zh-Hans','开始使用']]){
 test(`${locale} is localized before JavaScript runs`,()=>{
  const html=read(path);
  assert.match(html,new RegExp(`<html[^>]+lang="${lang}"`));
  assert.ok(html.includes(cta));
  for(const code of ['en','th','zh'])assert.ok(html.includes(`data-language="${code}"`));
  for(const code of ['en','th','zh-Hans','x-default'])assert.ok(html.includes(`hreflang="${code}"`));
  if(locale!=='th')assert.equal(copy(html).some(text=>/[ก-๛]/.test(text)),false);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  for(const [,id]of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id));
  for(const name of ['booking','merchant','success']){
   assert.ok(html.includes(`/assets/hero-screens/${locale}/${name}.webp`));
   const preview=read(`previews/${locale}/${name}.html`);
   assert.doesNotMatch(preview,/<script\b/);
   if(locale!=='th')assert.equal(copy(preview).some(text=>/[ก-๛]/.test(text.replaceAll('฿',''))),false);
  }
 });
}
test('sitemap contains locale pages but not decorative previews',()=>{
 const sitemap=read('sitemap-0.xml');
 assert.ok(sitemap.includes('https://bookingwhale.co/en/'));
 assert.ok(sitemap.includes('https://bookingwhale.co/zh/'));
 assert.ok(!sitemap.includes('/previews/'));
});

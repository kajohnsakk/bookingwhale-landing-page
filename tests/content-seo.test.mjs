import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {parse} from 'parse5';
import {languageAlternates} from '../src/seo/routes.mjs';
const read = path => readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const inventory = JSON.parse(read('src/seo/legacy-urls.json'));
const redirects = JSON.parse(read('vercel.json')).redirects;
const files = readdirSync(new URL('../src/content/blog/',import.meta.url)).filter(file => file.endsWith('.md'));
const sitemap = read('dist/sitemap-0.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]));
const exists = path => existsSync(new URL(`../dist${path}`,import.meta.url));
const htmlAt = path => read(`dist${path.endsWith('/') ? `${path}index.html` : path}`);
const flatten = node => [node,...(node.childNodes || []).flatMap(flatten)];
const attr = (node,key) => node.attrs?.find(item => item.name === key)?.value;
const txt = node => node.value || (node.childNodes || []).map(txt).join('');
const pages = urls.map(url => ({url,nodes:flatten(parse(htmlAt(url.pathname)))}));

test('all 90 production URLs survive as pages or permanent redirects',()=>{
  assert.equal(inventory.length,90);
  for(const value of inventory){
    const slug=new URL(value).pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
    if(slug)assert.ok(files.includes(`${slug}.md`),slug);
  }
  for(const value of inventory){
    const url=new URL(value);
    const key=url.pathname.replace(/\/$/,'');
    const redirect=redirects.find(item=>item.source.replace(/\/$/,'')===key);
    if(redirect){assert.equal(redirect.permanent,true);assert.ok(exists(`${redirect.destination}index.html`));}
    else assert.ok(exists(`${key}/index.html`),value);
  }
  for(const redirect of redirects){
    assert.ok(exists(`${redirect.destination}index.html`));
    assert.match(htmlAt(redirect.source),/http-equiv="refresh"/);
    assert.ok(!urls.some(url=>url.pathname===redirect.source));
  }
});

test('every indexable page has unique metadata, a matching canonical and one h1',()=>{
  const titles=new Set();const descriptions=new Set();
  for(const {url,nodes} of pages){
    const title=txt(nodes.find(n=>n.tagName==='title'));
    const description=nodes.find(n=>n.tagName==='meta'&&attr(n,'name')==='description');
    assert.ok(!titles.has(title),url.href);titles.add(title);
    assert.ok(!descriptions.has(attr(description,'content')),url.href);descriptions.add(attr(description,'content'));
    assert.equal(nodes.filter(n=>n.tagName==='h1').length,1,url.href);
    assert.equal(attr(nodes.find(n=>n.tagName==='link'&&attr(n,'rel')==='canonical'),'href'),url.href);
    assert.doesNotMatch(attr(nodes.find(n=>n.tagName==='meta'&&attr(n,'name')==='robots'),'content'),/noindex/);
    const lang=attr(nodes.find(n=>n.tagName==='html'),'lang');
    assert.equal(lang,url.pathname==='/'||/^\/(blog|businesses|contact|th)\//.test(url.pathname)?'th':url.pathname==='/zh/'?'zh-Hans':'en',url.href);
    const alternates=nodes.filter(n=>n.tagName==='link'&&attr(n,'hreflang'));
    const expected=languageAlternates(url.pathname);
    assert.equal(alternates.length,expected.length,url.href);
    for(const link of expected) assert.ok(alternates.some(node=>attr(node,'hreflang')===link.language&&attr(node,'href')===new URL(link.path,url).href));
  }
  assert.doesNotMatch(sitemap,/404|\/previews\/|\/cookies\//);
  assert.match(read('dist/404.html'),/noindex/);
});

test('internal content links and image assets resolve locally',()=>{
  const failures=[];
  for(const {url,nodes} of pages){
    for(const node of nodes){
      const raw=node.tagName==='a'?attr(node,'href'):node.tagName==='img'?attr(node,'src'):undefined;
      if(!raw||/^(mailto:|tel:|data:)/.test(raw))continue;
      let target;
      try { target=new URL(raw,url); } catch { failures.push(`${url.pathname} → invalid ${raw}`); continue; }
      if(target.origin!==url.origin)continue;
      const path=decodeURIComponent(target.pathname);
      if(!exists(path)||target.pathname.endsWith('/')){
        if(!exists(`${path.replace(/\/$/,'')}/index.html`))failures.push(`${url.pathname} → ${raw}`);
      }
      if(target.hash){
        const destination=pages.find(page=>page.url.pathname===`${target.pathname.replace(/\/$/,'')}/`)?.nodes;
        if(destination&&!destination.some(n=>attr(n,'id')===decodeURIComponent(target.hash.slice(1))))failures.push(`${url.pathname} → missing ${raw}`);
      }
    }
  }
  assert.deepEqual([...new Set(failures)],[]);
});

test('articles retain publishing dates, breadcrumbs and crawlable related content without hero runtime',()=>{
  for(const filename of files){
    const slug=filename.replace(/\.md$/,'');
    const source=read(`src/content/blog/${filename}`);
    const html=htmlAt(`/blog/${slug}/`);
    const nodes=flatten(parse(html));
    const data=JSON.parse(txt(nodes.find(n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json')))['@graph'];
    const article=data.find(n=>n['@type']==='BlogPosting');
    const published=source.match(/pubDate:\s*["']?([\d-]+)/)[1];
    assert.equal(article.datePublished.slice(0,10),published);
    assert.equal(article.mainEntityOfPage['@id'],`https://bookingwhale.co/blog/${slug}/#webpage`);
    assert.equal(data.find(n=>n['@type']==='BreadcrumbList').itemListElement.length,3);
    assert.ok(nodes.filter(n=>n.tagName==='a'&&attr(n,'href')?.startsWith('/blog/')).length>=5);
    assert.doesNotMatch(html,/bw-hero-scroll-track|gsap|imagesrcset=/);
  }
  assert.equal((read('dist/rss.xml').match(/<item>/g)||[]).length,files.length);
});

test('every sitemap page is reachable from home through ordinary HTML links',()=>{
  const byPath=new Map(pages.map(page=>[page.url.pathname,page]));
  const visited=new Set();const queue=['/'];
  while(queue.length){
    const path=queue.shift();if(visited.has(path))continue;visited.add(path);
    const page=byPath.get(path);if(!page)continue;
    for(const node of page.nodes.filter(n=>n.tagName==='a')){
      const raw=attr(node,'href');if(!raw)continue;
      let target;try{target=new URL(raw,page.url);}catch{continue;}
      const next=target.pathname.replace(/\/$/,'')+'/';
      if(target.origin===page.url.origin&&byPath.has(next)&&!visited.has(next))queue.push(next);
    }
  }
  assert.deepEqual([...byPath.keys()].filter(path=>!visited.has(path)),[]);
});

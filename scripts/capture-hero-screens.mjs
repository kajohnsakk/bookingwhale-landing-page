import {mkdir,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'@playwright/test');
const origin=process.env.PREVIEW_ORIGIN||'http://127.0.0.1:4322';
const browser=await chromium.launch();
const placeholders={};
try{
 for(const locale of ['en','th','zh']){
  placeholders[locale]={};
  for(const [screen,width,height] of [['merchant',1600,900],['booking',390,844],['success',390,844]]){
   const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:screen==='merchant'?1:2,reducedMotion:'reduce'});
   await page.goto(`${origin}/previews/${locale}/${screen}.html`,{waitUntil:'networkidle'});
   await page.evaluate(async()=>{
    await document.fonts.ready;
    await Promise.all(Array.from(document.images,image=>image.decode()));
   });
   const capture=await page.screenshot();
   const folder=new URL(`../public/assets/hero-screens/${locale}/`,import.meta.url);
   await mkdir(folder,{recursive:true});
   await sharp(capture).webp({quality:82}).toFile(new URL(`${screen}.webp`,folder).pathname);
   const placeholder=await sharp(capture).resize({width:screen==='merchant'?320:120}).webp({quality:45}).toBuffer();
   placeholders[locale][screen]=`data:image/webp;base64,${placeholder.toString('base64')}`;
   await page.close();
  }
 }
 const data=new URL('../src/data/',import.meta.url);
 await mkdir(data,{recursive:true});
 await writeFile(new URL('hero-placeholders.json',data),JSON.stringify(placeholders));
}finally{await browser.close()}

await import('./optimize-delivery-assets.mjs');

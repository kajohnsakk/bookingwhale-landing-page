import {mkdir,writeFile} from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'@playwright/test');
const origin=process.env.PREVIEW_ORIGIN||'http://127.0.0.1:4322';
const browser=await chromium.launch();
try{
 for(const [name,path,width,height] of [['merchant','merchant/index.html',1600,900],['booking','customer/index.html?view=booking',390,844],['success','customer/index.html?view=success',390,844]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  await page.goto(`${origin}/hero-live/${path}`,{waitUntil:'networkidle'});
  await page.locator('#root main').first().waitFor();
  await page.evaluate(()=>document.fonts.ready);
  const html=await page.evaluate(()=>{
   const doc=document.documentElement.cloneNode(true);
   doc.lang='th';
   doc.querySelectorAll('script,link[rel="modulepreload"]').forEach(node=>node.remove());
   doc.querySelector('#root').setAttribute('inert','');
   doc.querySelectorAll('img[src="/favicon.png"],img[src="/assets/asset-3.png"]').forEach(img=>img.setAttribute('src','/assets/bookingwhale-mark-96.png'));
   return '<!doctype html>'+doc.outerHTML;
  });
  const folder=new URL('../public/hero-preview/',import.meta.url);
  await mkdir(folder,{recursive:true});await writeFile(new URL(`${name}.html`,folder),html);await page.close();
 }
}finally{await browser.close()}

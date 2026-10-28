import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const publicFile=path=>new URL(`../public/${path}`,import.meta.url);
const faviconPath=publicFile('favicon-browser.svg');
const favicon=await readFile(faviconPath,'utf8');
const embedded=favicon.match(/data:image\/png;base64,([^"\s]+)/);
if(!embedded)throw new Error('Expected an embedded PNG in the favicon');
const {data,info}=await sharp(Buffer.from(embedded[1],'base64')).ensureAlpha().raw().toBuffer({resolveWithObject:true});
for(let index=0;index<data.length;index+=info.channels){
  data[index]=255;
  data[index+1]=255;
  data[index+2]=255;
}
const mask=await sharp(data,{raw:info}).png({compressionLevel:9}).toBuffer();
await writeFile(faviconPath,favicon.replace(embedded[1],mask.toString('base64')));
for(const width of [72,144])await sharp(publicFile('assets/asset-1.png').pathname).resize({width}).png({compressionLevel:9}).toFile(publicFile(`assets/line-mark-${width}.png`).pathname);
for(const person of ['emma-wilson','daniel-carter'])for(const width of [72,128]){
  await sharp(publicFile(`assets/avatars/${person}.jpg`).pathname).resize({width}).webp({quality:85,effort:6}).toFile(publicFile(`assets/avatars/${person}-${width}.webp`).pathname);
}
for(const locale of ['en','th','zh'])for(const screen of ['merchant','booking','success']){
 for(const width of screen==='merchant'?[400,600,640,800,1200]:[200,300,390,600]){
  await sharp(publicFile(`assets/hero-screens/${locale}/${screen}.webp`).pathname)
    .resize({width})
    .webp({quality:90,effort:6})
    .toFile(publicFile(`assets/hero-screens/${locale}/${screen}-${width}.webp`).pathname);
 }
}

import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
const escape = (value: string) => value.replace(/[<>&"']/g, char => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[char]!));
export async function GET({site}: APIContext) {
  if (!site) throw new Error('A public site URL is required.');
  const posts = (await getCollection('blog')).sort((a,b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const items = posts.map(post => {
    const link = new URL(`/blog/${post.id}/`,site).href;
    return `<item><title>${escape(post.data.title)}</title><description>${escape(post.data.description)}</description><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${post.data.pubDate.toUTCString()}</pubDate></item>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Booking Whale Blog</title><link>${new URL('/blog/',site).href}</link><description>บทความระบบจองออนไลน์และ LINE OA สำหรับธุรกิจ</description><language>th</language>${items}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}

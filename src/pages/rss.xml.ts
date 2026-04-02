import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'th');
  const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Booking Whale Blog',
    description: 'บทความเกี่ยวกับระบบจองออนไลน์ การจัดการคิว LINE OA และเคล็ดลับเพิ่มรายได้สำหรับธุรกิจไทย',
    site: context.site || 'https://bookingwhale.co',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id.replace(/^(th|en)\//, '').replace(/\.md$/, '')}/`,
      categories: post.data.tags,
    })),
    customData: '<language>th</language>',
  });
}

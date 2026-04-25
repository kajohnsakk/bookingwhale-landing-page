// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://bookingwhale.co',
  integrations: [react(), sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    serialize(item) {
      const url = item.url;
      // Homepage gets highest priority
      if (url === 'https://bookingwhale.co/' || url === 'https://bookingwhale.co/en/') {
        item.priority = 1.0;
        item.changefreq = 'daily';
      }
      // Business detail pages
      else if (url.includes('/businesses/')) {
        item.priority = 0.9;
        item.changefreq = 'weekly';
      }
      // Blog index
      else if (url.endsWith('/blog/')) {
        item.priority = 0.8;
        item.changefreq = 'daily';
      }
      // Blog posts
      else if (url.includes('/blog/')) {
        item.priority = 0.7;
        item.changefreq = 'monthly';
      }
      // Contact
      else if (url.includes('/contact')) {
        item.priority = 0.6;
        item.changefreq = 'monthly';
      }
      // Legal pages
      else if (url.includes('privacy') || url.includes('terms')) {
        item.priority = 0.3;
        item.changefreq = 'yearly';
      }
      return item;
    },
  })],
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
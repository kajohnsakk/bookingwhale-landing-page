import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { languageAlternates } from './src/seo/routes.mjs';
import { pruneStyles } from './scripts/prune-styles.mjs';

export default defineConfig({
  site: process.env.SITE_URL || 'https://bookingwhale.co',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/th/': { destination: '/', status: 301 },
    '/cookies/': { destination: '/privacy-policy/', status: 301 },
    '/blog/choosing-right-queue-booking-system-for-your-business/': { destination: '/blog/online-queue-booking-system-guide/', status: 301 },
  },
  vite: { plugins: [pruneStyles()] },
  integrations: [sitemap({
    filter: page => !['/th/', '/cookies/', '/blog/choosing-right-queue-booking-system-for-your-business/'].includes(new URL(page).pathname) && !/^\/(?:previews|hero-preview|hero-live)(?:\/|$)|^\/404(?:\.html)?(?:\/|$)/.test(new URL(page).pathname),
    serialize: item => ({
      ...item,
      links: languageAlternates(new URL(item.url).pathname).map(link => ({ lang: link.language, url: new URL(link.path, item.url).href })),
    }),
  })],
  devToolbar: { enabled: false },
});

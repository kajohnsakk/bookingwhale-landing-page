// Sitemap Generator Utility for BookingWhale
// This can be used to programmatically generate/update the sitemap

export const siteConfig = {
  baseUrl: 'https://bookingwhale.com',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'th'],
  lastModified: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
};

export const staticPages = [
  {
    path: '/',
    priority: 1.0,
    changeFreq: 'daily',
    languages: ['en', 'th']
  },
  {
    path: '/blog',
    priority: 0.8,
    changeFreq: 'weekly',
    languages: ['en', 'th']
  },
  {
    path: '/privacy',
    priority: 0.3,
    changeFreq: 'monthly',
    languages: ['en', 'th']
  },
  {
    path: '/terms',
    priority: 0.3,
    changeFreq: 'monthly',
    languages: ['en', 'th']
  },
  {
    path: '/cookies',
    priority: 0.2,
    changeFreq: 'monthly',
    languages: ['en', 'th']
  }
];

export const sectionAnchors = [
  {
    anchor: '#services',
    priority: 0.8,
    changeFreq: 'weekly'
  },
  {
    anchor: '#features',
    priority: 0.8,
    changeFreq: 'weekly'
  },
  {
    anchor: '#faq',
    priority: 0.7,
    changeFreq: 'weekly'
  },
  {
    anchor: '#contact',
    priority: 0.6,
    changeFreq: 'monthly'
  }
];

export const blogPosts = [
  {
    slug: 'reduce-no-show-80-percent-smart-queue-system',
    lastModified: '2025-01-15',
    priority: 0.7,
    changeFreq: 'monthly'
  },
  {
    slug: 'why-thai-business-switch-phone-to-line-booking',
    lastModified: '2025-01-12',
    priority: 0.7,
    changeFreq: 'monthly'
  },
  {
    slug: 'smart-queue-management-reduce-wait-time-70-percent',
    lastModified: '2025-01-10',
    priority: 0.7,
    changeFreq: 'monthly'
  }
];

export function generateSitemapXML() {
  const { baseUrl } = siteConfig;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Main homepage with hreflang
  xml += `
  <!-- Main homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${siteConfig.lastModified}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en" />
    <xhtml:link rel="alternate" hreflang="th" href="${baseUrl}/th" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
  </url>`;

  // Language-specific pages
  siteConfig.supportedLanguages.forEach(lang => {
    if (lang !== 'en') { // Skip default language as it's already included above
      xml += `
  <url>
    <loc>${baseUrl}/${lang}</loc>
    <lastmod>${siteConfig.lastModified}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en" />
    <xhtml:link rel="alternate" hreflang="th" href="${baseUrl}/th" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
  </url>`;
    }
  });

  // Section anchors
  xml += `
  <!-- Section anchors for single-page app -->`;

  sectionAnchors.forEach(section => {
    xml += `
  <url>
    <loc>${baseUrl}/${section.anchor}</loc>
    <lastmod>${siteConfig.lastModified}</lastmod>
    <changefreq>${section.changeFreq}</changefreq>
    <priority>${section.priority}</priority>
  </url>`;
  });

  // Static pages
  staticPages.forEach(page => {
    if (page.path !== '/') { // Skip homepage as it's already included
      xml += `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${siteConfig.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }
  });

  // Blog posts
  xml += `
  <!-- Individual blog posts -->`;

  blogPosts.forEach(post => {
    xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.lastModified}</lastmod>
    <changefreq>${post.changeFreq}</changefreq>
    <priority>${post.priority}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
}

export function generateRobotsTxt() {
  const { baseUrl } = siteConfig;

  return `# BookingWhale - Robots.txt
# LINE OA booking system for Thai businesses
# ${baseUrl}

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for optimal server performance
Crawl-delay: 1

# Block development and system directories
Disallow: /admin/
Disallow: /api/
Disallow: /_astro/
Disallow: /dist/
Disallow: /node_modules/
Disallow: /.git/
Disallow: /src/
Disallow: /temp/
Disallow: /tmp/

# Block sensitive files
Disallow: /*.json$
Disallow: /*.log$
Disallow: /*.config.js$
Disallow: /package.json
Disallow: /.env
Disallow: /.gitignore

# Allow important pages and sections
Allow: /
Allow: /en
Allow: /th
Allow: /blog
Allow: /blog/*
Allow: /privacy
Allow: /terms
Allow: /cookies

# Allow section anchors for single-page app
Allow: /#services
Allow: /#features
Allow: /#faq
Allow: /#contact

# Allow essential assets
Allow: /favicon.ico
Allow: /logo.png
Allow: /assets/
Allow: /images/

# Special rules for search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

# Block bad bots and scrapers
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: archive.org_bot
Disallow: /

# Additional sitemaps (if any)
# Sitemap: ${baseUrl}/sitemap-images.xml
# Sitemap: ${baseUrl}/sitemap-news.xml`;
}

// Usage example:
// console.log(generateSitemapXML());
// console.log(generateRobotsTxt());
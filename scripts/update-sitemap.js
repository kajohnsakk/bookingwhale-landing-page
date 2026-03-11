#!/usr/bin/env node

// Sitemap Update Script for BookingWhale
// Run this script to automatically update sitemap.xml and robots.txt

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the sitemap generator (you may need to adjust the path)
import { generateSitemapXML, generateRobotsTxt } from '../src/utils/sitemap-generator.js';

const PUBLIC_DIR = path.join(__dirname, '../public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const ROBOTS_PATH = path.join(PUBLIC_DIR, 'robots.txt');

function updateSitemap() {
  console.log('🔄 Updating sitemap.xml...');

  try {
    const sitemapXML = generateSitemapXML();
    fs.writeFileSync(SITEMAP_PATH, sitemapXML, 'utf8');
    console.log('✅ sitemap.xml updated successfully');
  } catch (error) {
    console.error('❌ Error updating sitemap.xml:', error.message);
  }
}

function updateRobotsTxt() {
  console.log('🔄 Updating robots.txt...');

  try {
    const robotsTxt = generateRobotsTxt();
    fs.writeFileSync(ROBOTS_PATH, robotsTxt, 'utf8');
    console.log('✅ robots.txt updated successfully');
  } catch (error) {
    console.error('❌ Error updating robots.txt:', error.message);
  }
}

function validateSitemap() {
  console.log('🔍 Validating sitemap.xml...');

  try {
    const sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');

    // Basic validation checks
    const checks = [
      {
        name: 'XML declaration',
        test: sitemap.includes('<?xml version="1.0" encoding="UTF-8"?>')
      },
      {
        name: 'URLset namespace',
        test: sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
      },
      {
        name: 'Homepage URL',
        test: sitemap.includes('<loc>https://bookingwhale.co/</loc>')
      },
      {
        name: 'Hreflang attributes',
        test: sitemap.includes('hreflang=')
      },
      {
        name: 'Blog URLs',
        test: sitemap.includes('/blog/')
      },
      {
        name: 'Section anchors',
        test: sitemap.includes('#services') && sitemap.includes('#features')
      }
    ];

    let passedChecks = 0;
    checks.forEach(check => {
      if (check.test) {
        console.log(`  ✅ ${check.name}`);
        passedChecks++;
      } else {
        console.log(`  ❌ ${check.name}`);
      }
    });

    console.log(`📊 Validation complete: ${passedChecks}/${checks.length} checks passed`);

    if (passedChecks === checks.length) {
      console.log('🎉 Sitemap is valid!');
    } else {
      console.log('⚠️  Sitemap has issues that need attention');
    }

  } catch (error) {
    console.error('❌ Error validating sitemap:', error.message);
  }
}

function main() {
  console.log('🚀 BookingWhale Sitemap & Robots.txt Updater\n');

  // Ensure public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Update files
  updateSitemap();
  updateRobotsTxt();

  // Validate sitemap
  validateSitemap();

  console.log('\n✨ All done! Your sitemap and robots.txt are up to date.');
  console.log('\n📝 Next steps:');
  console.log('   1. Test your sitemap at: https://www.xml-sitemaps.com/validate-xml-sitemap.html');
  console.log('   2. Submit to Google Search Console: https://search.google.com/search-console');
  console.log('   3. Submit to Bing Webmaster Tools: https://www.bing.com/webmasters');
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { updateSitemap, updateRobotsTxt, validateSitemap };
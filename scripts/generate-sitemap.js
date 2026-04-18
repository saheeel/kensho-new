import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://kenshomediagroup.com';
const BLOG_DIR = './src/content/blogs';
const SITEMAP_PATH = './public/sitemap.xml';

const generateSitemap = () => {
  const dateStr = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/blogs', priority: '0.9', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  ];

  // Get all blog files
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`Blog directory not found: ${BLOG_DIR}`);
    return;
  }

  const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
  const blogURLs = blogFiles.map(file => {
    const slug = file.replace('.md', '');
    return {
      url: `/blogs/${slug}`,
      priority: '0.6',
      changefreq: 'monthly'
    };
  });

  const allPages = [...staticPages, ...blogURLs];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, sitemapContent);
  console.log(`Successfully generated sitemap with ${allPages.length} URLs!`);
};

generateSitemap();

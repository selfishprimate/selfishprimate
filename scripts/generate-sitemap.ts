import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://selfishprimate.com';

// Static routes
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/works', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/articles', priority: '0.7', changefreq: 'weekly' },
  { path: '/illustrations', priority: '0.6', changefreq: 'monthly' },
  { path: '/experience', priority: '0.6', changefreq: 'monthly' },
];

// A project folder without an index.md, or one marked `draft: true`, is not
// reachable on the site, so it must not be advertised in the sitemap.
function isPublished(worksDir: string, slug: string): boolean {
  const indexPath = path.join(worksDir, slug, 'index.md');

  if (!fs.existsSync(indexPath)) return false;

  const frontmatter = fs.readFileSync(indexPath, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) return true;

  return !/^draft:\s*true\s*$/m.test(frontmatter[1]);
}

// Get project slugs from works directory
function getProjectSlugs(): string[] {
  const worksDir = path.join(__dirname, '../src/content/works');

  if (!fs.existsSync(worksDir)) {
    console.warn('Works directory not found');
    return [];
  }

  return fs.readdirSync(worksDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(slug => isPublished(worksDir, slug));
}

// Generate sitemap XML
function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  const projectSlugs = getProjectSlugs();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add static routes
  for (const route of staticRoutes) {
    xml += `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  }

  // Add project pages
  for (const slug of projectSlugs) {
    xml += `  <url>
    <loc>${SITE_URL}/works/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  return xml;
}

// Main
function main() {
  const sitemap = generateSitemap();
  const outputPath = path.join(__dirname, '../public/sitemap.xml');

  fs.writeFileSync(outputPath, sitemap, 'utf-8');

  console.log(`✓ Sitemap generated with ${staticRoutes.length + getProjectSlugs().length} URLs`);
  console.log(`  Output: ${outputPath}`);
}

main();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const worksDir = path.join(__dirname, '../src/content/works');

const SITE_URL = 'https://selfishprimate.com';
const BASE_TITLE = 'SelfishPrimate';

// The site sets its meta tags from JavaScript, in useSEO. Scrapers for Facebook,
// LinkedIn, Slack and WhatsApp do not run it, so every project link previewed as
// the site-wide default. Writing one static shell per project route gives those
// crawlers the right tags; Netlify serves a matching file before it falls back
// to the SPA rewrite, and React still boots and renders the same page.

interface Project {
  slug: string;
  title: string;
  description: string;
  keywords: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseFrontmatter(indexPath: string): Record<string, string> | null {
  const raw = fs.readFileSync(indexPath, 'utf-8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    data[line.slice(0, colonIndex).trim()] = line
      .slice(colonIndex + 1)
      .trim()
      .replace(/^"|"$/g, '');
  }
  return data;
}

function collectProjects(): Project[] {
  if (!fs.existsSync(worksDir)) return [];

  const projects: Project[] = [];

  for (const entry of fs.readdirSync(worksDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const indexPath = path.join(worksDir, entry.name, 'index.md');
    if (!fs.existsSync(indexPath)) continue;

    const data = parseFrontmatter(indexPath);
    if (!data || data.draft === 'true') continue;

    projects.push({
      slug: entry.name,
      title: data.title || '',
      description: data.description || 'UI/UX Design case study',
      // Frontmatter stores tags as an inline array, matching what useSEO joins
      keywords: (data.tags || '')
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map(t => t.trim().replace(/^"|"$/g, ''))
        .filter(Boolean)
        .join(', '),
    });
  }

  return projects;
}

// Rewrites the tag wholesale rather than just its content attribute, so it does
// not matter what order the attributes were authored in.
function replaceMeta(html: string, attr: 'name' | 'property', key: string, value: string): string {
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
  const pattern = new RegExp(`<meta[^>]*\\b${attr}="${escapeRegex(key)}"[^>]*>`, 'i');
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function buildShell(template: string, project: Project): string {
  const url = `${SITE_URL}/works/${project.slug}`;
  const title = `${BASE_TITLE}: Works, ${project.title}`;
  const image = `${SITE_URL}/og/works/${project.slug}.jpg`;

  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  html = replaceMeta(html, 'name', 'description', project.description);
  if (project.keywords) html = replaceMeta(html, 'name', 'keywords', project.keywords);

  html = replaceMeta(html, 'property', 'og:title', title);
  html = replaceMeta(html, 'property', 'og:description', project.description);
  html = replaceMeta(html, 'property', 'og:url', url);
  html = replaceMeta(html, 'property', 'og:image', image);

  html = replaceMeta(html, 'name', 'twitter:title', title);
  html = replaceMeta(html, 'name', 'twitter:description', project.description);
  html = replaceMeta(html, 'name', 'twitter:image', image);
  html = replaceMeta(html, 'name', 'twitter:image:alt', project.title);

  return html.replace(
    /<link[^>]*rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${url}" />`
  );
}

function generate(): void {
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Run this after the build.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const projects = collectProjects();

  if (projects.length === 0) {
    console.warn('No published projects found, no static shells written');
    return;
  }

  for (const project of projects) {
    const dir = path.join(distDir, 'works', project.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildShell(template, project));
  }

  console.log(`✓ ${projects.length} static meta shells written to dist/works/`);
}

generate();

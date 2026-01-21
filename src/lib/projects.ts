import type { Project } from './types';

// Import markdown files from new folder structure
import plainifyMd from '../content/works/plainify/index.md?raw';
import joiDesignSystemMd from '../content/works/joi-design-system/index.md?raw';
import joiMobileMd from '../content/works/joi-mobile/index.md?raw';
import joiSearchMd from '../content/works/joi-search/index.md?raw';
import vavacarsMd from '../content/works/vavacars/index.md?raw';
import sketchizeMd from '../content/works/sketchize/index.md?raw';
import gerillassMd from '../content/works/gerillass/index.md?raw';
import otorentoMd from '../content/works/otorento/index.md?raw';
import osmanliYatirimMd from '../content/works/osmanli-yatirim/index.md?raw';
import cecconisMd from '../content/works/cecconis/index.md?raw';
import edenredMd from '../content/works/edenred/index.md?raw';
import interestingEngineeringMd from '../content/works/interesting-engineering/index.md?raw';
import takkoFashionMd from '../content/works/takko-fashion/index.md?raw';

// Import all images using Vite's glob import
const imageModules = import.meta.glob('../content/works/*/images/*.(jpg|jpeg|png|gif|webp|svg)', { eager: true, query: '?url', import: 'default' });

// Create a map of relative paths to resolved URLs
const imageMap: Record<string, string> = {};
for (const [path, url] of Object.entries(imageModules)) {
  // Extract project name and filename from path
  // Path format: ../content/works/{project}/images/{filename}
  const match = path.match(/\.\.\/content\/works\/([^/]+)\/images\/(.+)$/);
  if (match) {
    const [, project, filename] = match;
    imageMap[`${project}:${filename}`] = url as string;
  }
}

// Helper to resolve image path - exported for use in ProjectPage
export function resolveProjectImagePath(relativePath: string, projectSlug: string): string {
  // relativePath format: ./images/filename.jpg
  const filename = relativePath.replace('./images/', '');
  const key = `${projectSlug}:${filename}`;
  return imageMap[key] || relativePath;
}

// Alias for internal use
const resolveImagePath = resolveProjectImagePath;

const projectFiles: Record<string, string> = {
  'plainify': plainifyMd,
  'joi-design-system': joiDesignSystemMd,
  'joi-mobile': joiMobileMd,
  'joi-search': joiSearchMd,
  'vavacars': vavacarsMd,
  'sketchize': sketchizeMd,
  'gerillass': gerillassMd,
  'otorento': otorentoMd,
  'osmanli-yatirim': osmanliYatirimMd,
  'cecconis': cecconisMd,
  'edenred': edenredMd,
  'interesting-engineering': interestingEngineeringMd,
  'takko-fashion': takkoFashionMd,
};

function parseFrontmatter(content: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const frontmatter = match[1];
  const markdown = match[2];

  const data: Record<string, unknown> = {};
  const lines = frontmatter.split('\n');
  let currentKey = '';
  let isArray = false;
  let arrayItems: string[] = [];

  for (const line of lines) {
    if (line.startsWith('  - ')) {
      arrayItems.push(line.replace('  - ', '').replace(/"/g, '').trim());
    } else if (line.includes(':')) {
      if (isArray && currentKey) {
        data[currentKey] = arrayItems;
        arrayItems = [];
        isArray = false;
      }

      const colonIndex = line.indexOf(':');
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();

      if (value === '') {
        isArray = true;
        currentKey = key;
      } else if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
      } else if (value === 'true') {
        data[key] = true;
      } else if (value === 'false') {
        data[key] = false;
      } else {
        data[key] = value.replace(/"/g, '');
      }
    }
  }

  if (isArray && currentKey) {
    data[currentKey] = arrayItems;
  }

  return { data, content: markdown };
}

export function getProjects(): Project[] {
  const projects: Project[] = [];

  for (const [slug, content] of Object.entries(projectFiles)) {
    const { data, content: markdownContent } = parseFrontmatter(content);

    // Resolve image paths
    const coverImage = data.coverImage ? resolveImagePath(data.coverImage as string, slug) : '';
    const images = ((data.images as string[]) || []).map(img => resolveImagePath(img, slug));

    projects.push({
      slug,
      title: data.title as string || '',
      description: data.description as string || '',
      company: data.company as string || '',
      category: data.category as string || '',
      tags: (data.tags as string[]) || [],
      coverImage,
      images,
      featured: data.featured as boolean || false,
      featuredOrder: data.featuredOrder as number | undefined,
      year: data.year as string || '',
      content: markdownContent,
    });
  }

  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return parseInt(b.year) - parseInt(a.year);
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find(p => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getProjects()
    .filter(p => p.featured)
    .sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999));
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const worksDir = path.join(__dirname, '../src/content/works');
const outDir = path.join(__dirname, '../public/og/works');

// Open Graph's expected frame. Facebook, LinkedIn, Slack and X all crop toward
// this ratio, so anything we hand them at a different shape gets cut somewhere.
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// A project can ship its own card as og.<ext> in its folder, which is used as
// is. It lives beside index.md rather than in images/, because that directory is
// glob imported into the bundle and the card is never rendered in the page.
const AUTHORED_CARD_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

interface CardSource {
  slug: string;
  sourcePath: string;
  // Authored cards are already composed for the frame. Derived ones are covers
  // at some other aspect ratio and need the fitted treatment below.
  authored: boolean;
}

function findAuthoredCard(projectDir: string): string | null {
  for (const ext of AUTHORED_CARD_EXTENSIONS) {
    const candidate = path.join(projectDir, `og.${ext}`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function readFrontmatter(indexPath: string): Record<string, string> | null {
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

// Only projects that are actually reachable get a card. A draft has no URL to
// share, and a project whose cover is missing would produce a blank one.
function collectCovers(): CardSource[] {
  if (!fs.existsSync(worksDir)) {
    console.warn('Works directory not found');
    return [];
  }

  const covers: CardSource[] = [];

  for (const entry of fs.readdirSync(worksDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const indexPath = path.join(worksDir, entry.name, 'index.md');
    if (!fs.existsSync(indexPath)) continue;

    const data = readFrontmatter(indexPath);
    if (!data || data.draft === 'true') continue;

    const authoredCard = findAuthoredCard(path.join(worksDir, entry.name));
    if (authoredCard) {
      covers.push({ slug: entry.name, sourcePath: authoredCard, authored: true });
      continue;
    }

    const cover = data.coverImage;
    if (!cover) {
      console.warn(`  ! ${entry.name}: no coverImage in frontmatter, skipped`);
      continue;
    }

    const coverPath = path.join(worksDir, entry.name, cover.replace(/^\.\//, ''));
    if (!fs.existsSync(coverPath)) {
      console.warn(`  ! ${entry.name}: cover not found at ${cover}, skipped`);
      continue;
    }

    covers.push({ slug: entry.name, sourcePath: coverPath, authored: false });
  }

  return covers;
}

// The covers are designed pieces with type and logos baked in, and they are not
// all the same shape, so cropping one to 1.91:1 can slice through the artwork.
// Instead the whole cover is fitted inside the frame and the gaps are filled
// with a blurred, darkened copy of itself, which reads as intentional on every
// cover regardless of its aspect ratio.
async function buildCard(sourcePath: string, authored: boolean): Promise<Buffer> {
  if (authored) {
    return sharp(sourcePath)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toBuffer();
  }

  const backdrop = await sharp(sourcePath)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'centre' })
    .blur(40)
    .modulate({ brightness: 0.55 })
    .toBuffer();

  const foreground = await sharp(sourcePath)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();

  return sharp(backdrop)
    .composite([{ input: foreground, gravity: 'centre' }])
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toBuffer();
}

async function generate(): Promise<void> {
  const covers = collectCovers();

  if (covers.length === 0) {
    console.warn('No project covers found, nothing to generate');
    return;
  }

  fs.mkdirSync(outDir, { recursive: true });

  let written = 0;
  let authored = 0;
  for (const source of covers) {
    const card = await buildCard(source.sourcePath, source.authored);
    fs.writeFileSync(path.join(outDir, `${source.slug}.jpg`), card);
    written++;
    if (source.authored) authored++;
  }

  // A project that was renamed, retired or turned into a draft would otherwise
  // leave its card behind to be served from a URL nothing points at any more.
  const expected = new Set(covers.map(c => `${c.slug}.jpg`));
  let removed = 0;
  for (const file of fs.readdirSync(outDir)) {
    if (!file.endsWith('.jpg') || expected.has(file)) continue;
    fs.unlinkSync(path.join(outDir, file));
    removed++;
  }

  console.log(`✓ ${written} Open Graph images generated (${OG_WIDTH}x${OG_HEIGHT})`);
  if (authored > 0) console.log(`  ${authored} from a project supplied og card, the rest from covers`);
  if (removed > 0) console.log(`  ${removed} stale card(s) removed`);
  console.log(`  Output: ${outDir}`);
}

generate().catch(error => {
  console.error('Failed to generate Open Graph images:', error);
  process.exit(1);
});

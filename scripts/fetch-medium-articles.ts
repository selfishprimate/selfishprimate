import { parseStringPromise } from 'xml2js';
import * as fs from 'fs';
import * as path from 'path';

interface MediumArticle {
  title: string;
  description: string;
  date: string;
  url: string;
  tags: string[];
  coverImage?: string;
  imageUrl?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 50);
}

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to download image: ${response.status}`);
      return false;
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    console.log(`  ✓ Downloaded: ${path.basename(filepath)}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Failed to download image:`, error);
    return false;
  }
}

async function fetchMediumArticles(username: string): Promise<MediumArticle[]> {
  const feedUrl = `https://medium.com/feed/@${username}`;

  try {
    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xml = await response.text();
    const result = await parseStringPromise(xml);

    const items = result.rss.channel[0].item || [];

    const articles: MediumArticle[] = items.map((item: any) => {
      // Extract title
      const title = item.title?.[0] || '';

      // Extract URL (clean the RSS tracking params)
      let url = item.link?.[0] || '';
      url = url.split('?')[0]; // Remove query params

      // Extract and format date
      const pubDate = item.pubDate?.[0] || '';
      const date = new Date(pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Extract content for description and image
      const content = item['content:encoded']?.[0] || item.description?.[0] || '';

      // Extract first image URL from content
      const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
      const imageUrl = imgMatch ? imgMatch[1] : undefined;

      // Get first paragraph as description (skip if it's just an image)
      let description = '';
      const paragraphs = content.match(/<p[^>]*>(.*?)<\/p>/g) || [];
      for (const p of paragraphs) {
        const text = p.replace(/<[^>]*>/g, '').trim();
        if (text && text.length > 20 && !text.startsWith('http')) {
          description = text;
          break;
        }
      }

      // Truncate if too long
      if (description.length > 200) {
        description = description.substring(0, 197) + '...';
      }

      // Extract tags/categories
      const tags = item.category?.map((cat: any) => {
        if (typeof cat === 'string') return cat;
        return cat._ || cat;
      }) || [];

      // Format tags nicely (capitalize words)
      const formattedTags = tags.slice(0, 3).map((tag: string) =>
        tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      );

      // Generate cover image path
      const slug = slugify(title);
      const coverImage = `/images/articles/${slug}.jpg`;

      return {
        title,
        description,
        date,
        url,
        tags: formattedTags,
        coverImage,
        imageUrl
      };
    });

    return articles;
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    throw error;
  }
}

async function main() {
  const username = 'selfishprimate';
  const imagesDir = path.join(process.cwd(), 'public/images/articles');

  // Ensure images directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  console.log(`Fetching articles from Medium (@${username})...\n`);

  try {
    const articles = await fetchMediumArticles(username);

    console.log('Found', articles.length, 'articles:\n');

    // Download missing images
    console.log('Checking for missing images...\n');
    for (const article of articles) {
      if (article.imageUrl) {
        const filename = slugify(article.title) + '.jpg';
        const filepath = path.join(imagesDir, filename);

        if (!fs.existsSync(filepath)) {
          console.log(`Downloading image for: ${article.title.substring(0, 50)}...`);
          await downloadImage(article.imageUrl, filepath);
        } else {
          console.log(`  ✓ Already exists: ${filename}`);
        }
      } else {
        console.log(`  ⚠ No image found for: ${article.title.substring(0, 50)}...`);
      }
    }

    // Output as TypeScript array format for easy copy-paste
    console.log('\n// Copy this to src/lib/data.ts\n');
    console.log('export const articles: Article[] = [');

    articles.forEach((article, index) => {
      console.log('  {');
      console.log(`    title: "${article.title.replace(/"/g, '\\"')}",`);
      console.log(`    description: "${article.description.replace(/"/g, '\\"')}",`);
      console.log(`    date: "${article.date}",`);
      console.log(`    url: "${article.url}",`);
      console.log(`    tags: [${article.tags.map(t => `"${t}"`).join(', ')}],`);
      if (article.imageUrl) {
        console.log(`    coverImage: "${article.coverImage}"`);
      }
      console.log(`  }${index < articles.length - 1 ? ',' : ''}`);
    });

    console.log('];');

  } catch (error) {
    console.error('Failed to fetch articles:', error);
    process.exit(1);
  }
}

main();

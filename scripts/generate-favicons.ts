import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');
const sourceImage = path.join(publicDir, 'images/sp-favicon-base.png');

async function generateFavicons() {
  console.log('Generating favicons from sp-favicon-base.png...\n');

  // favicon-16x16.png
  await sharp(sourceImage)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('✓ favicon-16x16.png');

  // favicon-32x32.png
  await sharp(sourceImage)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ favicon-32x32.png');

  // apple-touch-icon.png (180x180)
  await sharp(sourceImage)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  // favicon.svg - copy or convert
  // Since source is PNG, we'll create a larger PNG as fallback
  await sharp(sourceImage)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'favicon-512x512.png'));
  console.log('✓ favicon-512x512.png');

  console.log('\n✓ All favicons generated successfully!');
}

generateFavicons().catch(console.error);

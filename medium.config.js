/**
 * Medium Article Fetcher Configuration
 *
 * This config is used by the fetch-medium-articles script to download
 * articles from your Medium profile.
 *
 * Usage:
 *   npx tsx scripts/fetch-medium-articles.ts
 *
 * What it does:
 *   1. Fetches articles from the specified Medium profile's RSS feed
 *   2. Downloads cover images to public/images/articles/
 *   3. Outputs article data in TypeScript format for easy copy-paste
 *
 * After running, copy the output to src/content/articles/ as needed.
 */

module.exports = {
  username: "selfishprimate"
};

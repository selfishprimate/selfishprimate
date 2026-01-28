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
 *   2. Downloads cover images to src/content/articles/images/
 *   3. Adds new articles to src/content/articles/index.md
 *   4. Skips articles that already exist (based on slug)
 *
 * Note: Only new articles are added. Existing articles are preserved.
 */

module.exports = {
  username: "selfishprimate"
};

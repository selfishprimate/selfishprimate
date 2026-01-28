/**
 * Medium Article Fetcher Configuration
 * =====================================
 *
 * Bu script Medium profilinizdeki makaleleri otomatik olarak çeker
 * ve portfolio sitenize ekler.
 *
 * Kullanım:
 *   npx tsx scripts/fetch-medium-articles.ts
 *
 * Ne yapar:
 *   1. Belirtilen Medium profilinin RSS feed'ini çeker
 *   2. Kapak görsellerini src/content/articles/images/ klasörüne indirir
 *   3. Yeni makaleleri src/content/articles/index.md dosyasına ekler
 *   4. Mevcut makaleleri (slug'a göre) atlar
 *
 * Not: Sadece yeni makaleler eklenir, mevcut içerik korunur.
 */

export const config = {
  username: "selfishprimate"
};

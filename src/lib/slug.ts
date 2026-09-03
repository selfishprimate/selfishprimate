// Shared heading-id helper: TableOfContents and ProjectPage must derive the
// same anchor ids from the same heading text for in-page links to resolve.
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

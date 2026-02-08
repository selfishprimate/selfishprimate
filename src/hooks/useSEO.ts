import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_TITLE = 'SelfishPrimate';
const SITE_URL = 'https://selfishprimate.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/selfishprimate-og-image.png`;
const TWITTER_HANDLE = '@selfishprimate';

export function useSEO({ title, description, keywords, ogImage, ogType = 'website', jsonLd }: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // Update title
    document.title = title;

    // Canonical URL
    const canonicalUrl = `${SITE_URL}${location.pathname}`;

    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper to update or create link tag
    const setLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Canonical link
    setLink('canonical', canonicalUrl);

    // Description
    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, true);
    }

    // Keywords
    if (keywords && keywords.length > 0) {
      setMeta('keywords', keywords.join(', '));
    }

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:type', ogType, true);
    setMeta('og:url', canonicalUrl, true);

    // OG Image (use provided or default)
    const imageUrl = ogImage || DEFAULT_OG_IMAGE;
    setMeta('og:image', imageUrl, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', TWITTER_HANDLE);
    setMeta('twitter:title', title);
    if (description) {
      setMeta('twitter:description', description);
    }
    setMeta('twitter:image', imageUrl);

    // JSON-LD Structured Data
    const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

  }, [title, description, keywords, ogImage, ogType, location.pathname, jsonLd]);
}

// JSON-LD Schema Helpers
export const schemas = {
  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SelfishPrimate',
    url: SITE_URL,
    description: 'Portfolio of Halil Ibrahim Cakiroglu, a UI/UX Designer crafting digital experiences.',
    author: {
      '@type': 'Person',
      name: 'Halil Ibrahim Cakiroglu',
    },
  }),

  person: () => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Halil Ibrahim Cakiroglu',
    url: SITE_URL,
    jobTitle: 'Product Designer',
    worksFor: {
      '@type': 'Organization',
      name: 'RoofStacks',
    },
    sameAs: [
      'https://www.linkedin.com/in/selfishprimate/',
      'https://github.com/selfishprimate',
      'https://twitter.com/selfishprimate',
      'https://medium.com/@selfishprimate',
    ],
    knowsAbout: ['UI Design', 'UX Design', 'Product Design', 'Design Systems'],
  }),

  project: (project: { title: string; description: string; slug: string; year: string; coverImage?: string }) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/works/${project.slug}`,
    dateCreated: project.year,
    image: project.coverImage,
    author: {
      '@type': 'Person',
      name: 'Halil Ibrahim Cakiroglu',
    },
  }),

  portfolio: () => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Works - SelfishPrimate',
    url: `${SITE_URL}/works`,
    description: 'UI/UX Design portfolio showcasing projects across fintech, e-commerce, travel, and more.',
    author: {
      '@type': 'Person',
      name: 'Halil Ibrahim Cakiroglu',
    },
  }),
};

// Helper to generate consistent titles
export function generateTitle(page?: string, subpage?: string): string {
  if (!page) {
    return `${BASE_TITLE}: Portfolio of a Technological Caveman`;
  }
  if (subpage) {
    return `${BASE_TITLE}: ${page}, ${subpage}`;
  }
  return `${BASE_TITLE}: ${page}`;
}

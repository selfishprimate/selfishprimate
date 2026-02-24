import { useState, useEffect, useMemo, useCallback } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

// Generate slug from heading text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Parse headings from markdown content
function parseHeadings(content: string): TOCItem[] {
  const headings: TOCItem[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // Match ### or #### headings (h3, h4)
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateSlug(text);
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  const headings = useMemo(() => parseHeadings(content), [content]);

  // Find the active heading based on scroll position
  const updateActiveHeading = useCallback(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    // Find the heading that's closest to the top of the viewport (but still visible or just passed)
    const scrollY = window.scrollY;
    const offset = 150; // Account for sticky header

    let currentHeading = headingElements[0];

    for (const heading of headingElements) {
      const rect = heading.getBoundingClientRect();
      const absoluteTop = rect.top + scrollY;

      if (absoluteTop <= scrollY + offset) {
        currentHeading = heading;
      } else {
        break;
      }
    }

    if (currentHeading) {
      setActiveId(currentHeading.id);
    }
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;

    // Initial check
    updateActiveHeading();

    // Listen to scroll events
    window.addEventListener('scroll', updateActiveHeading, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveHeading);
    };
  }, [headings, updateActiveHeading]);

  const handleClick = (id: string) => {
    // Set active immediately for instant feedback
    setActiveId(id);

    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={`${className}`} aria-label="Table of contents">
      <p className="text-xs font-sans uppercase text-text-tertiary mb-4 tracking-wide">
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <button
              onClick={() => handleClick(id)}
              className={`
                block text-left text-sm transition-colors duration-200
                ${level === 3 ? 'pl-0' : 'pl-3'}
                ${
                  activeId === id
                    ? 'text-text-primary font-medium'
                    : 'text-text-tertiary hover:text-text-secondary'
                }
              `}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { generateSlug };

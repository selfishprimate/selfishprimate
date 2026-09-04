import type { ReactNode } from 'react';
import { siteConfig } from '@/lib/data';

/**
 * All three marks are solid and drawn at one size.
 *
 * The live site mixes a stroked LinkedIn with two solid marks and sizes it up
 * to compensate, which is why it reads as the odd one out. LinkedIn here is a
 * solid, boxless `in` — drawn as a filled mark rather than an outline that has
 * been filled in, so its strokes carry the same weight as the other two.
 */
const icons: { label: string; href: string; viewBox?: string; body: ReactNode }[] = [
  {
    label: 'GitHub',
    href: siteConfig.social.github,
    body: (
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    ),
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@selfishprimate',
    body: (
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    ),
  },
  {
    label: 'LinkedIn',
    href: siteConfig.social.linkedin,
    // Solid letterforms, no containing box. Drawn as a filled mark rather than
    // an outline that has been filled in, which is why the stem and the bowl
    // carry the same weight as GitHub and Medium.
    viewBox: '0 0 448 512',
    body: (
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    ),
  },
];

interface SocialLinksProps {
  size?: number;
  className?: string;
}

export function SocialLinks({ size = 18, className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {icons.map((icon) => (
        <a
          key={icon.label}
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={icon.label}
          className="text-text-tertiary transition-colors hover:text-text-primary"
        >
          <svg
            width={size}
            height={size}
            viewBox={icon.viewBox ?? '0 0 24 24'}
            fill="currentColor"
            aria-hidden="true"
          >
            {icon.body}
          </svg>
        </a>
      ))}
    </div>
  );
}

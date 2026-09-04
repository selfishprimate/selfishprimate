import type { ReactNode } from 'react';
import { siteConfig } from '@/lib/data';

/**
 * All three marks are solid and drawn at one size.
 *
 * The live site mixes a stroked LinkedIn with two solid marks and sizes it up
 * to compensate, which is why it reads as the odd one out. LinkedIn here is the
 * same geometry as that stroked mark — the wordless `in`, no containing box —
 * but filled, so it carries the weight of the other two without the squareness
 * of the boxed glyph.
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
    // The rounded-square badge, with the letters knocked out of the fill. It is
    // the mark people actually recognise, and its corner radius is generous
    // enough not to read as a hard square beside GitHub's disc.
    viewBox: '0 0 448 512',
    body: (
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
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

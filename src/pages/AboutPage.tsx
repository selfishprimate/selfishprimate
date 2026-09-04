import type { ReactNode } from 'react';
import { getAboutContent } from '@/lib/about';
import { PageLede } from '@/components/PageLede';
import { LabelledRow } from '@/components/LabelledRow';
import { useSEO, generateTitle, schemas } from '@/hooks/useSEO';

// Render inline markdown links inside plain-text content fields
function renderWithLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="jonas-link"
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function AboutPage() {
  const about = getAboutContent();

  useSEO({
    title: generateTitle('About'),
    description:
      'Learn about Halil Ibrahim Cakiroglu, a UI/UX Designer with over 10 years of experience crafting digital experiences across mobile, web, and enterprise platforms.',
    keywords: ['About', 'UI/UX Designer', 'Experience', 'Skills', 'Background'],
    jsonLd: schemas.person(),
  });

  const sections = [about.whatSetsApart, about.openSource, about.theHandle].filter(
    (section) => section.title
  );

  const socials = [
    { label: 'LinkedIn', href: about.social.linkedin },
    { label: 'Medium', href: about.social.medium },
    { label: 'GitHub', href: about.social.github },
    { label: 'Patreon', href: about.social.patreon },
  ];

  return (
    <div className="mx-auto w-full max-w-[860px] px-5">
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <PageLede
          title={`${about.profile.title} in ${about.profile.location.split(',')[0]}.`}
          fade="Fifteen years building the design systems that products are actually made of."
        />
      </section>

      {about.profile.avatar && (
        <img
          src={about.profile.avatar}
          alt={about.profile.name}
          loading="eager"
          decoding="async"
          className="mb-20 w-full max-w-[360px] rounded-[3px]"
        />
      )}

      <div className="flex flex-col gap-24 md:gap-32">
        <LabelledRow label="About me">
          <div className="space-y-5 text-text-secondary">
            {about.bio.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </LabelledRow>

        {sections.map((section) => (
          <LabelledRow key={section.title} label={section.title}>
            <p className="text-text-secondary">{renderWithLinks(section.description)}</p>
            {section === about.theHandle && (
              <div className="mt-6 max-w-md">
                <iframe
                  src="https://open.spotify.com/embed/track/06cCNvDC89aT8m6J5VCmpv?utm_source=generator&theme=0"
                  title="The Selfish Giant by Damon Albarn on Spotify"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            )}
          </LabelledRow>
        ))}

        <LabelledRow label={about.skills.title}>
          <ul className="flex flex-col gap-1.5 list-none text-text-secondary">
            {about.skills.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </LabelledRow>

        <LabelledRow label={about.domains.title}>
          <ul className="flex flex-col gap-1.5 list-none text-text-secondary">
            {about.domains.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </LabelledRow>

        <LabelledRow label={about.beyondDesign.title}>
          <div className="space-y-5 text-text-secondary">
            {about.beyondDesign.paragraphs.map((paragraph, index) => (
              <p key={index}>{renderWithLinks(paragraph)}</p>
            ))}
          </div>
        </LabelledRow>

        <LabelledRow label="Elsewhere">
          <ul className="flex flex-col gap-1.5 list-none">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jonas-link text-text-secondary"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </LabelledRow>
      </div>
    </div>
  );
}

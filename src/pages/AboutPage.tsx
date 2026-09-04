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
        className="underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary"
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

  const linkClass =
    'underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary';

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
      <section className="pt-24 pb-20 md:pt-44 md:pb-28">
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
          width={1086}
          height={1448}
          className="mb-24 w-full max-w-[620px] rounded-card md:mb-40"
        />
      )}

      <div className="flex flex-col gap-24 md:gap-40">
        <LabelledRow label="About Me">
          <div className="space-y-6">
            {about.bio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="j-body">
                {paragraph}
              </p>
            ))}
          </div>
        </LabelledRow>

        {sections.map((section) => (
          <LabelledRow key={section.title} label={section.title}>
            <p className="j-body">{renderWithLinks(section.description)}</p>
            {section === about.theHandle && (
              <div className="mt-8 max-w-md">
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
          <ul className="flex flex-col gap-1.5 list-none">
            {about.skills.items.map((item) => (
              <li key={item} className="j-item">
                {item}
              </li>
            ))}
          </ul>
        </LabelledRow>

        <LabelledRow label={about.domains.title}>
          <ul className="flex flex-col gap-1.5 list-none">
            {about.domains.items.map((item) => (
              <li key={item} className="j-item">
                {item}
              </li>
            ))}
          </ul>
        </LabelledRow>

        <LabelledRow label={about.beyondDesign.title}>
          <div className="space-y-6">
            {about.beyondDesign.paragraphs.map((paragraph, index) => (
              <p key={index} className="j-body">
                {renderWithLinks(paragraph)}
              </p>
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
                  className={`j-item ${linkClass}`}
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

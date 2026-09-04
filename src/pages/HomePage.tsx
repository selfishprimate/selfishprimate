import { Link } from 'react-router-dom';
import { getHomeContent } from '@/lib/home';
import { getExperiences } from '@/lib/experience';
import { getFeaturedProjects, getProjects } from '@/lib/projects';
import { getAboutContent } from '@/lib/about';
import { PageLede } from '@/components/PageLede';
import { BlockLabel } from '@/components/BlockLabel';
import { StaggeredGrid } from '@/components/StaggeredGrid';
import { LabelledRow } from '@/components/LabelledRow';
import { useSEO, generateTitle, schemas } from '@/hooks/useSEO';

export function HomePage() {
  const home = getHomeContent();
  const about = getAboutContent();
  const featuredProjects = getFeaturedProjects();
  const allProjects = getProjects();
  const experiences = getExperiences();

  useSEO({
    title: generateTitle(),
    description: home.hero.subtitle,
    keywords: ['UI/UX Designer', 'Product Designer', 'Istanbul', 'Portfolio', 'Web Design', 'Mobile App Design'],
    jsonLd: schemas.website(),
  });

  // Year range across the featured work, printed next to the label the way a
  // contents page prints a date span.
  const years = featuredProjects.map((p) => Number(p.year)).filter(Boolean);
  const yearRange =
    years.length > 0 ? `${Math.min(...years)}–${Math.max(...years)}` : undefined;

  // The client list is derived from the work itself rather than hardcoded, so
  // it can never drift from the case studies.
  const clients = Array.from(new Set(allProjects.map((p) => p.company)));

  return (
    <div className="mx-auto w-full max-w-[860px] px-5">
      {/* Hero */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-32">
        <PageLede title={home.hero.headline} fade={home.hero.headlineFade} />
      </section>

      {/* Featured work */}
      <section>
        <BlockLabel meta={yearRange} className="mb-5">
          {home.featuredWork.label}
        </BlockLabel>
        <StaggeredGrid projects={featuredProjects} />
        <p className="mt-8">
          <Link to="/works" className="jonas-link text-[0.9375rem]">
            → All {allProjects.length} projects
          </Link>
        </p>
      </section>

      {/* About */}
      <div className="pt-28 md:pt-40">
        <LabelledRow label="About me">
          <div className="space-y-5 text-text-secondary">
            {about.bio.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-6">
            <Link to="/about" className="jonas-link text-[0.9375rem]">
              → More about me
            </Link>
          </p>
        </LabelledRow>
      </div>

      {/* Experience */}
      <div className="pt-24 md:pt-32">
        <LabelledRow label={home.experiencePreview.label}>
          <ul className="flex flex-col gap-6 list-none">
            {experiences.slice(0, 4).map((exp) => (
              <li
                key={exp.company + exp.period}
                className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span>
                  <span className="font-medium text-text-primary">
                    {exp.url ? (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="jonas-link"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </span>
                  <span className="block text-text-secondary">{exp.role}</span>
                </span>
                <span className="shrink-0 text-text-secondary">
                  {exp.period.replace(' — ', '–')}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link to="/experience" className="jonas-link text-[0.9375rem]">
              → Full history
            </Link>
          </p>
        </LabelledRow>
      </div>

      {/* Services */}
      <div className="pt-24 md:pt-32">
        <LabelledRow label={about.skills.title}>
          <ul className="flex flex-col gap-1.5 list-none text-text-secondary">
            {about.skills.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </LabelledRow>
      </div>

      {/* Clients */}
      <div className="pt-24 md:pt-32">
        <LabelledRow label="Selected clients">
          <ul className="flex flex-col gap-1.5 list-none text-text-secondary">
            {clients.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </ul>
        </LabelledRow>
      </div>

      {/* Quote */}
      <div className="pt-24 md:pt-32">
        <LabelledRow label="On design">
          <blockquote>
            <p className="jonas-lede text-xl md:text-[1.6rem] max-w-[24ch]">
              “{home.quote.text}”
            </p>
            <cite className="mt-3 block text-[0.9375rem] not-italic text-text-secondary">
              {home.quote.author}
            </cite>
          </blockquote>
        </LabelledRow>
      </div>
    </div>
  );
}

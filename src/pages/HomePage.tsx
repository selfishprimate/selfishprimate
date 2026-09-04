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

  const years = featuredProjects.map((p) => Number(p.year)).filter(Boolean);
  const yearRange =
    years.length > 0 ? `${Math.min(...years)}–${Math.max(...years)}` : undefined;

  // Derived from the work itself rather than hardcoded, so it cannot drift.
  const clients = Array.from(new Set(allProjects.map((p) => p.company)));

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
      {/* Hero */}
      <section className="pt-24 pb-28 md:pt-44 md:pb-56">
        <PageLede title={home.hero.headline} fade={home.hero.headlineFade} />
      </section>

      {/* Featured work */}
      <section>
        <BlockLabel meta={yearRange} className="mb-8 md:mb-14">
          {home.featuredWork.label}
        </BlockLabel>
        <StaggeredGrid projects={featuredProjects} />
        <p className="mt-10">
          <Link to="/works" className="j-item underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary">
            All {allProjects.length} projects
          </Link>
        </p>
      </section>

      {/* About */}
      <div className="pt-32 md:pt-52">
        <LabelledRow label="About me">
          <div className="space-y-6">
            {about.bio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="j-body">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-8">
            <Link
              to="/about"
              className="j-item underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary"
            >
              More about me
            </Link>
          </p>
        </LabelledRow>
      </div>

      {/* Experience */}
      <div className="pt-28 md:pt-44">
        <LabelledRow label={home.experiencePreview.label}>
          <ul className="flex flex-col gap-8 list-none">
            {experiences.slice(0, 4).map((exp) => (
              <li key={exp.company + exp.period}>
                <p className="j-item">
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </p>
                <p className="j-item text-text-tertiary">{exp.role}</p>
                <p className="j-meta mt-2">{exp.period.replace(' — ', '–')}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link
              to="/experience"
              className="j-item underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary"
            >
              Full history
            </Link>
          </p>
        </LabelledRow>
      </div>

      {/* Services and clients, side by side */}
      <div className="grid gap-10 pt-28 md:grid-cols-2 md:pt-44">
        <section>
          <h2 className="j-heading">{about.skills.title}</h2>
          <ul className="mt-6 flex flex-col gap-1.5 list-none">
            {about.skills.items.map((item) => (
              <li key={item} className="j-item">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="j-heading">Selected clients</h2>
          <ul className="mt-6 flex flex-col gap-1.5 list-none">
            {clients.map((client) => (
              <li key={client} className="j-item">
                {client}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

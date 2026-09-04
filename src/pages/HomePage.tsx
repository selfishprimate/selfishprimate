import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getHomeContent } from '@/lib/home';
import { getExperiences } from '@/lib/experience';
import { getFeaturedProjects, getProjects } from '@/lib/projects';
import { getAboutContent } from '@/lib/about';
import { PageLede } from '@/components/PageLede';
import { BlockLabel } from '@/components/BlockLabel';
import { WorkGrid } from '@/components/WorkGrid';
import { LabelledRow } from '@/components/LabelledRow';
import { HeroWave } from '@/components/HeroWave';
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
      <section className="relative isolate pt-24 pb-28 md:pt-44 md:pb-56">
        {/* The home hero is the one place the water follows the whole
            section rather than stopping at a fixed depth. */}
        <HeroWave extent="section" />

        <PageLede title={home.hero.headline} fade={home.hero.headlineFade} />

        {/* The standfirst deliberately says what the headline does not —
            tenure, domains and place — rather than restating it smaller. */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="j-body j-fade mt-10 max-w-[46ch] md:mt-12"
        >
          {home.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-10 flex flex-wrap gap-3 md:mt-12"
        >
          <Link to="/works" className="j-btn">
            View my works
            <ArrowRight size={18} />
          </Link>
          <a
            href={about.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="j-btn j-btn-outline"
          >
            LinkedIn
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </section>

      {/* Featured work */}
      <section>
        <BlockLabel meta={yearRange} className="mb-8 md:mb-14">
          {home.featuredWork.label}
        </BlockLabel>
        <WorkGrid projects={featuredProjects} />
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
          <ul className="flex flex-col gap-12 list-none">
            {experiences.slice(0, 4).map((exp) => (
              <li key={exp.company + exp.period} className="flex items-start gap-5 md:gap-10">
                {/* Same mark and the same distance to the text as the
                    Experience page, at half the size for a preview list. */}
                {exp.logo && (
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-14 shrink-0 rounded-card object-cover md:w-20"
                  />
                )}
                <div>
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
                <p className="j-meta mt-4 text-text-primary">{exp.description}</p>
                </div>
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

import { motion } from 'framer-motion';
import { getExperienceContent } from '@/lib/experience';
import { PageLede } from '@/components/PageLede';
import { HeroWave } from '@/components/HeroWave';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function ExperiencePage() {
  const { meta, experiences } = getExperienceContent();

  useSEO({
    title: generateTitle(meta.title),
    description: meta.description,
    keywords: ['Experience', 'Work History', 'UI/UX Designer', 'Career', 'Resume'],
  });

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
      <section className="relative isolate pt-24 pb-24 md:pt-44 md:pb-40">
        <HeroWave />

        <PageLede title={meta.title} description={meta.description} />
      </section>

      <div className="flex flex-col">
        {experiences.map((exp, index) => {
          const body = (
            <>
              {/* Logo left, everything written on the right. No tile behind
                  it — a company mark carries its own background — but it takes
                  the same 12px radius as the cards and thumbnails, since that
                  is the site's one corner. */}
              <span className="block">
                {exp.logo && (
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full max-w-[80px] rounded-card object-cover"
                  />
                )}
              </span>

              <div className="md:self-center">
                <h3 className="j-heading underline decoration-border underline-offset-[8px] transition-colors group-hover:decoration-text-primary">
                  {exp.company}
                </h3>
                <p className="j-item mt-1 text-text-tertiary">{exp.role}</p>
                <p className="j-meta mt-2">{exp.period.replace(' — ', '–')}</p>
                <p className="j-meta mt-5 text-text-primary">{exp.description}</p>
                {exp.skills && exp.skills.length > 0 && (
                  <p className="j-meta mt-4">{exp.skills.join(', ')}</p>
                )}
              </div>
            </>
          );

          const rowClass =
            'group grid gap-5 border-t border-border py-8 md:grid-cols-[minmax(0,80px)_minmax(0,620px)] md:gap-10 md:py-10';

          return (
            <motion.article
              key={exp.company + exp.period}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.04 }}
            >
              {exp.url ? (
                <a href={exp.url} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  {body}
                </a>
              ) : (
                <div className={rowClass}>{body}</div>
              )}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

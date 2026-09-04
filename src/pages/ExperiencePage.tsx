import { motion } from 'framer-motion';
import { getExperienceContent } from '@/lib/experience';
import { PageLede } from '@/components/PageLede';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function ExperiencePage() {
  const { meta, experiences } = getExperienceContent();

  useSEO({
    title: generateTitle(meta.title),
    description: meta.description,
    keywords: ['Experience', 'Work History', 'UI/UX Designer', 'Career', 'Resume'],
  });

  return (
    <div className="mx-auto w-full max-w-[860px] px-5">
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <PageLede title={meta.title + '.'} fade={meta.description} />
      </section>

      <div className="flex flex-col">
        {experiences.map((exp, index) => (
          <motion.article
            key={exp.company + exp.period}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.04 }}
            className="grid gap-3 border-t border-border py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-8"
          >
            <div>
              <h3 className="jonas-label">
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
              </h3>
              <p className="mt-0.5 text-[0.9375rem] text-text-secondary">
                {exp.period.replace(' — ', '–')}
              </p>
            </div>

            <div>
              <p className="font-medium text-text-primary">{exp.role}</p>
              <p className="mt-2 text-text-secondary">{exp.description}</p>
              {exp.skills && exp.skills.length > 0 && (
                <p className="mt-3 text-[0.9375rem] text-text-tertiary">
                  {exp.skills.join(', ')}
                </p>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

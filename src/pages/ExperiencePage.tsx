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
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
      <section className="pt-24 pb-20 md:pt-44 md:pb-32">
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
              <h3 className="j-item">
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
              </h3>
              <p className="mt-0.5 j-item text-text-secondary">
                {exp.period.replace(' — ', '–')}
              </p>
            </div>

            <div>
              <p className="font-medium text-text-primary">{exp.role}</p>
              <p className="mt-2 text-text-secondary">{exp.description}</p>
              {exp.skills && exp.skills.length > 0 && (
                <p className="mt-3 j-item text-text-tertiary">
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

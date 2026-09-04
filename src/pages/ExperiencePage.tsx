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
      <section className="pt-24 pb-24 md:pt-44 md:pb-40">
        <PageLede title={meta.title} description={meta.description} />
      </section>

      <div className="flex flex-col">
        {experiences.map((exp, index) => (
          <motion.article
            key={exp.company + exp.period}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.04 }}
            className="grid gap-4 border-t border-border py-10 md:grid-cols-2 md:gap-10 md:py-14"
          >
            {/* Left column reads exactly like the reference: name, role, date */}
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
              <p className="j-item text-text-tertiary">{exp.role}</p>
              <p className="j-meta mt-2">{exp.period.replace(' — ', '–')}</p>
            </div>

            <div>
              <p className="j-meta text-text-primary">{exp.description}</p>
              {exp.skills && exp.skills.length > 0 && (
                <p className="j-meta mt-4">{exp.skills.join(', ')}</p>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

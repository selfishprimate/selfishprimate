import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig, experiences, skills, domains } from '@/lib/data';
import { SectionHeading } from '@/components/SectionHeading';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function AboutPage() {
  useSEO({
    title: generateTitle('About'),
    description: 'Learn about Halil Ibrahim Cakiroglu, a UI/UX Designer with over 10 years of experience crafting digital experiences across mobile, web, and enterprise platforms.',
    keywords: ['About', 'UI/UX Designer', 'Experience', 'Skills', 'Background'],
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl bg-border overflow-hidden">
              {siteConfig.avatar && (
                <img
                  src={siteConfig.avatar}
                  alt={siteConfig.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-border rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs font-sans uppercase text-text-tertiary">
              About Me
            </span>
            <h2 className="mt-4 font-serif font-semibold text-4xl md:text-5xl text-text-primary">
              {siteConfig.name}
            </h2>
            <p className="mt-2 text-text-secondary text-lg">
              {siteConfig.title} · {siteConfig.location}
            </p>

            <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
              {siteConfig.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-primary font-sans text-sm rounded-full hover:bg-border/50 transition-colors"
              >
                LinkedIn
                <ArrowUpRight size={14} />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-primary font-sans text-sm rounded-full hover:bg-border/50 transition-colors"
              >
                GitHub
                <ArrowUpRight size={14} />
              </a>
              <a
                href={siteConfig.social.patreon}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-primary font-sans text-sm rounded-full hover:bg-border/50 transition-colors"
              >
                Patreon
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="sr-only">Quote</h2>
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="font-serif italic text-2xl md:text-3xl text-text-primary">
            "Design is thinking made visual."
          </p>
          <cite className="mt-4 block text-text-tertiary not-italic">
            — Saul Bass
          </cite>
        </motion.blockquote>
      </section>

      {/* Skills & Domains */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="sr-only">Skills & Domains</h2>
        <div className="grid md:grid-cols-2 gap-16">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif font-semibold text-2xl text-text-primary mb-6">
              Skills & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm font-sans text-text-secondary border border-border rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Domains */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-serif font-semibold text-2xl text-text-primary mb-6">
              Industries & Domains
            </h3>
            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <span
                  key={domain}
                  className="px-4 py-2 text-sm font-sans text-text-secondary border border-border rounded-full"
                >
                  {domain}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <SectionHeading
          label="Career"
          title="Work Experience"
        />

        <div className="mt-12 space-y-0">
          {experiences.map((exp, index) => {
            const content = (
              <>
                {exp.logo && (
                  <div className="w-20 h-20 bg-border overflow-hidden flex-shrink-0">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="inline-flex items-center gap-1.5 font-serif font-semibold text-xl text-text-primary group-hover:text-text-secondary transition-colors">
                    {exp.company}
                    {exp.url && <ArrowUpRight size={18} />}
                  </h3>
                  <p className="mt-1 text-text-secondary">
                    {exp.role} · Full Time · {exp.period.replace(' — ', ' · ')}
                  </p>
                  <p className="mt-4 text-text-secondary leading-snug">
                    {exp.description}
                  </p>
                  {exp.skills && exp.skills.length > 0 && (
                    <p className="mt-4 text-text-tertiary text-sm">
                      <span className="font-medium">Skills:</span> {exp.skills.join(', ')}
                    </p>
                  )}
                </div>
              </>
            );

            return (
              <motion.div
                key={exp.company + exp.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border"
              >
                {exp.url ? (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-6 py-8"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="group flex gap-6 py-8">
                    {content}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Personal */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="font-serif font-semibold text-2xl text-text-primary mb-6">
            Beyond Design
          </h2>
          <p className="text-text-secondary leading-relaxed">
            When I'm not designing beautiful interfaces, you can find me jamming to my favorite tunes, 
            sketching and drawing, or cruising around on my skateboard. I've always had a passion for 
            creating and tinkering with things, which is what drew me to the world of UI/UX design.
          </p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            I'm also a big advocate for open-source software and tools. I believe that technology 
            should be accessible to everyone, regardless of their background or financial means. 
            That's why I'm working on a number of open-source projects that aim to make design 
            and development more accessible to people all over the world.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

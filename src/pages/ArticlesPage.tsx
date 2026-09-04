import { motion } from 'framer-motion';
import { getArticlesContent } from '@/lib/articles';
import { PageLede } from '@/components/PageLede';
import { HeroWave } from '@/components/HeroWave';
import { BlockLabel } from '@/components/BlockLabel';
import { RowTile } from '@/components/RowTile';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function ArticlesPage() {
  const { meta, articles } = getArticlesContent();

  useSEO({
    title: generateTitle(meta.title),
    description: meta.description,
    keywords: ['Articles', 'Blog', 'Design', 'UI/UX', 'Thoughts', 'Insights'],
  });

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
      <section className="relative isolate pt-24 pb-24 md:pt-44 md:pb-40">
        <HeroWave />

        <PageLede title={meta.title} description={meta.description} />
      </section>

      <BlockLabel meta="Medium" className="mb-8 md:mb-14">
        {`${articles.length} pieces`}
      </BlockLabel>

      <div className="flex flex-col">
        {articles.map((article, index) => (
          <motion.article
            key={article.url}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.04 }}
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-5 border-t border-border py-8 md:grid-cols-[minmax(0,160px)_minmax(0,620px)] md:gap-10 md:py-10"
            >
              <RowTile src={article.coverImage} alt={article.title} />

              <div className="md:self-center">
                <h3 className="j-heading underline decoration-border underline-offset-[8px] transition-colors group-hover:decoration-text-primary">
                  {article.title}
                </h3>
                <p className="j-meta mt-4 text-text-primary">{article.description}</p>
                <p className="j-meta mt-4">{article.date} · Medium</p>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

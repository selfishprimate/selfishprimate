import { motion } from 'framer-motion';
import { getArticlesContent } from '@/lib/articles';
import { PageLede } from '@/components/PageLede';
import { BlockLabel } from '@/components/BlockLabel';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function ArticlesPage() {
  const { meta, articles } = getArticlesContent();

  useSEO({
    title: generateTitle(meta.title),
    description: meta.description,
    keywords: ['Articles', 'Blog', 'Design', 'UI/UX', 'Thoughts', 'Insights'],
  });

  return (
    <div className="mx-auto w-full max-w-[860px] px-5">
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <PageLede title={meta.title + '.'} fade={meta.description} />
      </section>

      <BlockLabel meta="Medium" className="mb-2">
        {`${articles.length} pieces`}
      </BlockLabel>

      <div className="flex flex-col">
        {articles.map((article, index) => (
          <motion.a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.04 }}
            className="group grid gap-3 border-t border-border py-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-8"
          >
            <p className="text-[0.9375rem] text-text-secondary">{article.date}</p>
            <div>
              <h3 className="font-medium text-text-primary underline decoration-border underline-offset-4 transition-colors group-hover:decoration-text-primary">
                {article.title}
              </h3>
              <p className="mt-2 text-text-secondary">{article.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

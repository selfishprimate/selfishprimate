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
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
      <section className="pt-24 pb-24 md:pt-44 md:pb-40">
        <PageLede title={meta.title} description={meta.description} />
      </section>

      <BlockLabel meta="Medium" className="mb-8 md:mb-14">
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
            className="group grid gap-3 border-t border-border py-8 md:grid-cols-2 md:gap-10 md:py-10"
          >
            <h3 className="j-item underline decoration-border underline-offset-[6px] transition-colors group-hover:decoration-text-primary">
              {article.title}
            </h3>
            <div>
              <p className="j-meta text-text-primary">{article.description}</p>
              <p className="j-meta mt-2">{article.date}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

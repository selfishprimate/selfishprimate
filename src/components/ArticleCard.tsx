import { motion } from 'framer-motion';
import type { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  index: number;
  /** Tailwind aspect class for the cover, set by the grid */
  aspect: string;
}

/** The project card's shape, carrying a Medium post instead of a case study. */
export function ArticleCard({ article, index, aspect }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-xl bg-surface"
      >
        <div className={`overflow-hidden ${aspect}`}>
          {article.coverImage && (
            <img
              src={article.coverImage}
              alt={article.title}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
            />
          )}
        </div>

        <div className="p-6">
          <h3 className="j-item">{article.title}</h3>
          <p className="j-item j-fade mt-1">{article.date} · Medium</p>
        </div>
      </a>
    </motion.article>
  );
}

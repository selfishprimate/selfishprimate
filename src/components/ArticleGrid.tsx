import type { Article } from '@/lib/types';
import { aspectAt } from '@/lib/aspects';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
}

/** The work grid, running on articles. */
export function ArticleGrid({ articles }: ArticleGridProps) {
  const left = articles.filter((_, i) => i % 2 === 0);
  const right = articles.filter((_, i) => i % 2 === 1);

  const column = (items: Article[], offset: number) => (
    <div className="flex flex-col gap-5 md:gap-10">
      {items.map((article, index) => {
        const globalIndex = index * 2 + offset;
        return (
          <ArticleCard
            key={article.url}
            article={article}
            index={globalIndex}
            aspect={aspectAt(globalIndex)}
          />
        );
      })}
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
      {column(left, 0)}
      {column(right, 1)}
    </div>
  );
}

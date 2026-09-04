import { getArticlesContent } from '@/lib/articles';
import { PageLede } from '@/components/PageLede';
import { BlockLabel } from '@/components/BlockLabel';
import { ArticleGrid } from '@/components/ArticleGrid';
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
      <ArticleGrid articles={articles} />
    </div>
  );
}

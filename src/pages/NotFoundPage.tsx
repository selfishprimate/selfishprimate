import { Link } from 'react-router-dom';
import { PageLede } from '@/components/PageLede';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function NotFoundPage() {
  useSEO({
    title: generateTitle('404'),
    description: 'Page not found',
  });

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 pt-24 pb-32 md:px-10 md:pt-44">
      <PageLede
        title="This page does not exist."
        fade="The work, thankfully, still does."
      />
      <p className="mt-10 flex flex-wrap gap-8">
        <Link
          to="/works"
          className="j-item underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary"
        >
          See the work
        </Link>
        <Link
          to="/"
          className="j-item underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary"
        >
          Back home
        </Link>
      </p>
    </div>
  );
}

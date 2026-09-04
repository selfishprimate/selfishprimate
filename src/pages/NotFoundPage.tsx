import { Link } from 'react-router-dom';
import { PageLede } from '@/components/PageLede';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function NotFoundPage() {
  useSEO({
    title: generateTitle('404'),
    description: 'Page not found',
  });

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 pt-24 pb-24 md:pt-32">
      <PageLede
        title="This page does not exist."
        fade="The work, thankfully, still does."
      />
      <p className="mt-8 flex flex-wrap gap-6">
        <Link to="/works" className="underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary j-item">
          → See the work
        </Link>
        <Link to="/" className="underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary j-item">
          → Back home
        </Link>
      </p>
    </div>
  );
}

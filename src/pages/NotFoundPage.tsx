import { Link } from 'react-router-dom';
import { PageLede } from '@/components/PageLede';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function NotFoundPage() {
  useSEO({
    title: generateTitle('404'),
    description: 'Page not found',
  });

  return (
    <div className="mx-auto w-full max-w-[860px] px-5 pt-24 pb-24 md:pt-32">
      <PageLede
        title="This page does not exist."
        fade="The work, thankfully, still does."
      />
      <p className="mt-8 flex flex-wrap gap-6">
        <Link to="/works" className="jonas-link text-[0.9375rem]">
          → See the work
        </Link>
        <Link to="/" className="jonas-link text-[0.9375rem]">
          → Back home
        </Link>
      </p>
    </div>
  );
}

import { getProjects, getWorksMeta } from '@/lib/projects';
import { StaggeredGrid } from '@/components/StaggeredGrid';
import { PageLede } from '@/components/PageLede';
import { BlockLabel } from '@/components/BlockLabel';
import { useSEO, generateTitle, schemas } from '@/hooks/useSEO';

export function WorksPage() {
  const allProjects = getProjects();
  const meta = getWorksMeta();

  useSEO({
    title: generateTitle(meta.title),
    description: meta.description,
    keywords: ['UI/UX Design', 'Portfolio', 'Mobile App Design', 'Web Design', 'Design System', 'Case Studies'],
    jsonLd: schemas.portfolio(),
  });

  const years = allProjects.map((p) => Number(p.year)).filter(Boolean);
  const yearRange =
    years.length > 0 ? `${Math.min(...years)}–${Math.max(...years)}` : undefined;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
      <section className="pt-24 pb-24 md:pt-44 md:pb-40">
        <PageLede title={meta.title} description={meta.description} />
      </section>

      <BlockLabel meta={yearRange} className="mb-8 md:mb-14">
        {`${allProjects.length} projects`}
      </BlockLabel>
      <StaggeredGrid projects={allProjects} />
    </div>
  );
}

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
    <div className="mx-auto w-full max-w-[860px] px-5">
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <PageLede title={meta.title + '.'} fade={meta.description} />
      </section>

      <BlockLabel meta={yearRange} className="mb-5">
        {`${allProjects.length} projects`}
      </BlockLabel>
      <StaggeredGrid projects={allProjects} />
    </div>
  );
}

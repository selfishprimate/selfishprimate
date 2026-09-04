import type { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

interface StaggeredGridProps {
  projects: Project[];
}

/**
 * Two equal columns, 40px gap, no vertical offset.
 *
 * The staggered look in the reference does not come from dropping one column —
 * it comes from cards having different image aspect ratios, so the two columns
 * fall out of step on their own. This cycle is five long, which is coprime with
 * the two columns, so the phase keeps shifting down the page instead of
 * repeating every other row.
 */
const ASPECTS = [
  'aspect-[3/2]',
  'aspect-square',
  'aspect-[3/2]',
  'aspect-[3/2]',
  'aspect-square',
];

export function StaggeredGrid({ projects }: StaggeredGridProps) {
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  const column = (items: Project[], offset: number) => (
    <div className="flex flex-col gap-5 md:gap-10">
      {items.map((project, index) => {
        const globalIndex = index * 2 + offset;
        return (
          <ProjectCard
            key={project.slug}
            project={project}
            index={globalIndex}
            aspect={ASPECTS[globalIndex % ASPECTS.length]}
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

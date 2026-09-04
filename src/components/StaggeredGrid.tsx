import type { Project } from '@/lib/types';
import { aspectAt } from '@/lib/aspects';
import { ProjectCard } from './ProjectCard';

interface StaggeredGridProps {
  projects: Project[];
}

/** Two equal columns, 40px gap, no vertical offset. See `aspectAt`. */
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

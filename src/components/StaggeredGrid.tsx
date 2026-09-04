import type { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

interface StaggeredGridProps {
  projects: Project[];
}

/**
 * Two columns, the right one dropped by a fixed offset. That single offset is
 * what turns a plain grid into the staggered rhythm this design runs on; the
 * cards themselves stay a uniform aspect so the covers all read the same.
 */
export function StaggeredGrid({ projects }: StaggeredGridProps) {
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
      <div className="flex flex-col gap-5 sm:gap-6">
        {left.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index * 2} />
        ))}
      </div>
      <div className="flex flex-col gap-5 sm:mt-16 sm:gap-6">
        {right.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index * 2 + 1} />
        ))}
      </div>
    </div>
  );
}

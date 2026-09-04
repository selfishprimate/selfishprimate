import type { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

interface WorkGridProps {
  projects: Project[];
}

/**
 * Two equal columns, 40px gap, every card the same height.
 *
 * This replaces an earlier version that varied the card aspect ratios so the
 * columns fell out of step. That produced the reference's staggered rhythm, but
 * it also cropped covers that are all 4:3 and left the grid visibly ragged.
 */
export function WorkGrid({ projects }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-10">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}

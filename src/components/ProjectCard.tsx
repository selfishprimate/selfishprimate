import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Image on top, a grey caption block welded to the bottom. The caption being
 * part of the card rather than floating text under it is the whole reason the
 * two-column stagger reads as a composition instead of a list.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <Link to={`/works/${project.slug}`} className="group block overflow-hidden rounded-[3px]">
        <div className="aspect-[4/3] overflow-hidden bg-surface">
          {project.coverImage && (
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
            />
          )}
        </div>

        <div className="bg-surface px-4 py-3.5">
          <h3 className="text-[0.9375rem] font-semibold leading-snug tracking-[-0.01em] text-text-primary">
            {project.title}
          </h3>
          <p className="mt-0.5 text-[0.9375rem] leading-snug text-text-secondary">
            {project.company} · {project.year}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

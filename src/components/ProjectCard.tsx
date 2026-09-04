import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Tailwind aspect class for the image, set by the grid */
  aspect: string;
}

/**
 * The whole card is the grey surface — image flush to its edges, then a 24px
 * padded caption. The card is the object, not the image sitting on top of one.
 */
export function ProjectCard({ project, index, aspect }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <Link
        to={`/works/${project.slug}`}
        className="group block overflow-hidden rounded-xl bg-surface"
      >
        <div className={`overflow-hidden ${aspect}`}>
          {project.coverImage && (
            <img
              src={project.coverImage}
              alt={project.title}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
            />
          )}
        </div>

        <div className="p-6">
          {/* Client on top, discipline below in grey — the reference pairs a
              short name with a short category, not a full case-study title. */}
          <h3 className="j-item">{project.company}</h3>
          <p className="j-item j-fade mt-1">
            {project.tags[0]} · {project.year}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * The whole card is the grey surface — image flush to its edges, then a 24px
 * padded caption.
 *
 * Every card is the same height, which takes two things. The image runs at 4:3,
 * the ratio every published cover already is, so nothing is cropped and every
 * image is the same height. And the title is clamped to two lines with two
 * lines' worth of space reserved, so a one-line title and a three-line one
 * still produce the same caption.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
      className="h-full"
    >
      <Link
        to={`/works/${project.slug}`}
        className="group flex h-full flex-col rounded-card bg-surface p-3"
      >
        {/* Inset 12px, so the cover reads as its own card inside the card. */}
        <div className="aspect-[4/3] overflow-hidden rounded-card-inner">
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

        <div className="px-3 pt-5 pb-3">
          {/* 2.6em is exactly two lines at this size and leading. */}
          <h3 className="j-item line-clamp-2 min-h-[2.6em]">{project.title}</h3>
          <p className="j-item j-fade mt-1">{project.company}</p>
        </div>
      </Link>
    </motion.article>
  );
}

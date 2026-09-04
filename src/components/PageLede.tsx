import { motion } from 'framer-motion';

interface PageLedeProps {
  /** Full-strength opening of the sentence */
  title: string;
  /** Continuation, set in grey */
  fade?: string;
  className?: string;
}

/**
 * The one headline shape on the site: a sentence that opens in ink and
 * finishes in grey, set at 64px across the full column.
 */
export function PageLede({ title, fade, className = '' }: PageLedeProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={`j-display ${className}`}
    >
      {title}
      {fade && <span className="j-fade"> {fade}</span>}
    </motion.h2>
  );
}

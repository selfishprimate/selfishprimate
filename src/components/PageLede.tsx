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
 * finishes in grey. Used for the home hero and the top of every index page.
 */
export function PageLede({ title, fade, className = '' }: PageLedeProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={`jonas-lede text-[1.6rem] md:text-[2.15rem] max-w-[36ch] ${className}`}
    >
      {title}
      {fade && <span className="jonas-fade"> {fade}</span>}
    </motion.h2>
  );
}

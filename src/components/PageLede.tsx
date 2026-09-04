import { motion } from 'framer-motion';

interface PageLedeProps {
  /** Full-strength opening of the sentence, at 64px */
  title: string;
  /** Continuation of the sentence, in grey, still at 64px */
  fade?: string;
  /** A longer standfirst. Drops to the 28px body size — a paragraph does not
      belong at display size, however much the design likes big type. */
  description?: string;
  className?: string;
}

/**
 * The one headline shape on the site: a sentence that opens in ink and
 * finishes in grey.
 */
export function PageLede({ title, fade, description, className = '' }: PageLedeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      <h2 className="j-display">
        {title}
        {fade && <span className="j-fade"> {fade}</span>}
      </h2>
      {description && (
        <p className="j-body j-fade mt-5 max-w-[42ch] md:mt-10">{description}</p>
      )}
    </motion.div>
  );
}

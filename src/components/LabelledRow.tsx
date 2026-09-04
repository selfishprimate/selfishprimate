import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LabelledRowProps {
  label: string;
  children: ReactNode;
}

/**
 * A 32px heading in the left column, content in the right. Every block below
 * the work grid uses it, which is what keeps the page on one spine.
 */
export function LabelledRow({ label, children }: LabelledRowProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
      className="grid gap-6 md:grid-cols-2 md:gap-10"
    >
      <h2 className="j-heading">{label}</h2>
      <div>{children}</div>
    </motion.section>
  );
}

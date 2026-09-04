import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BlockLabel } from './BlockLabel';

interface LabelledRowProps {
  label: string;
  meta?: string;
  children: ReactNode;
}

/**
 * Label in the left column, content in the right. Every block below the work
 * grid uses it, which is what keeps the page on one spine.
 */
export function LabelledRow({ label, meta, children }: LabelledRowProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
      className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-8"
    >
      <BlockLabel meta={meta}>{label}</BlockLabel>
      <div>{children}</div>
    </motion.section>
  );
}

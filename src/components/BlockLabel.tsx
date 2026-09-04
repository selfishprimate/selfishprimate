import type { ReactNode } from 'react';

interface BlockLabelProps {
  children: ReactNode;
  /** Quiet second half, e.g. a year range or a count */
  meta?: string;
  className?: string;
}

/** The 20px bold line that opens the work grid. */
export function BlockLabel({ children, meta, className = '' }: BlockLabelProps) {
  return (
    <p className={`j-item ${className}`}>
      {children}
      {meta && <span className="font-normal j-fade"> · {meta}</span>}
    </p>
  );
}

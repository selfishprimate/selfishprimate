import type { ReactNode } from 'react';

interface BlockLabelProps {
  children: ReactNode;
  /** Quiet second half, e.g. a year range or a count */
  meta?: string;
  className?: string;
}

/** Small bold label that opens a block. Often followed by a grey `meta`. */
export function BlockLabel({ children, meta, className = '' }: BlockLabelProps) {
  return (
    <p className={`jonas-label ${className}`}>
      {children}
      {meta && <span className="font-normal text-text-secondary"> · {meta}</span>}
    </p>
  );
}

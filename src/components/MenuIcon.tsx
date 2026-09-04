import { motion } from 'framer-motion';

interface MenuIconProps {
  open: boolean;
}

/**
 * Two bars that fold into a cross. Both states are the same two elements, so
 * the transition is one continuous movement rather than a swap: the bars slide
 * to the centre line and turn through 45°.
 */
export function MenuIcon({ open }: MenuIconProps) {
  const bar = 'absolute left-0 h-[1.5px] w-full rounded-full bg-current';
  const transition = { duration: 0.32, ease: [0.2, 0.7, 0.2, 1] as const };

  return (
    <span className="relative block h-[14px] w-[22px] text-text-primary">
      <motion.span
        className={bar}
        initial={false}
        animate={open ? { top: 6, rotate: 45 } : { top: 1, rotate: 0 }}
        transition={transition}
      />
      <motion.span
        className={bar}
        initial={false}
        animate={open ? { top: 6, rotate: -45 } : { top: 11, rotate: 0 }}
        transition={transition}
      />
    </span>
  );
}

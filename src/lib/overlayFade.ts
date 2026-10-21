import type { CSSProperties } from 'react';

/**
 * The fade for a full-screen overlay (the lightboxes, the menu), spread onto a
 * motion element.
 *
 * It animates a CSS variable that the element's opacity reads, not opacity
 * itself. framer-motion hands an opacity fade to the browser's own animation
 * engine, and when that animation ends there is one frame before framer writes
 * the final value back in which the element shows its starting value: an
 * overlay that had just faded in dropped to nothing for a frame, and one that
 * had just faded out flashed back to full. That frame is the blink. A custom
 * property cannot be handed to the browser that way, so framer draws every
 * frame of it itself and there is no handover to fall through.
 */
export const overlayFade = {
  initial: { '--fade': 0 },
  animate: { '--fade': 1 },
  exit: { '--fade': 0 },
  transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
  style: { opacity: 'var(--fade)' } as CSSProperties,
};

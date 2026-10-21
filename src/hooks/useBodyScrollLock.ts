import { useLayoutEffect } from 'react';

/**
 * Hold the page still behind an overlay.
 *
 * This hides the root's overflow rather than fixing the body in place. Fixing
 * the body re-lays out the whole page and throws the scroll position away to
 * be put back on close, and on a long case study that relayout landed in the
 * first frames of the overlay's fade, on open and again on close, as a blink.
 * Hiding the overflow leaves the layout and the scroll position exactly where
 * they were.
 *
 * A classic scrollbar (a Mac with a mouse attached, Windows always) takes
 * width from the page, and hiding the overflow takes the scrollbar away, so
 * the body is padded by that width to keep the page from sliding sideways.
 *
 * A layout effect, so the lock lands in the same frame the overlay mounts in.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useLayoutEffect(() => {
    if (!isLocked) return;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      root.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isLocked]);
}

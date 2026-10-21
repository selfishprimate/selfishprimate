import { useLayoutEffect, useRef } from 'react';

export function useBodyScrollLock(isLocked: boolean) {
  const scrollPosition = useRef(0);

  // A layout effect, so the lock lands in the same frame the overlay mounts
  // in rather than one painted frame later.
  useLayoutEffect(() => {
    if (isLocked) {
      // Save current scroll position
      scrollPosition.current = window.scrollY;

      // A classic scrollbar takes width from the page; fixing the body takes
      // the scrollbar away, and the whole page would slide sideways by that
      // much under the overlay and back again on close. The padding holds the
      // page where it was.
      const scrollbar = window.innerWidth - document.documentElement.clientWidth;

      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    } else {
      // Get saved position before resetting styles
      const savedPosition = scrollPosition.current;

      // Reset body styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      // Restore scroll position instantly (no animation)
      window.scrollTo({
        top: savedPosition,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [isLocked]);
}

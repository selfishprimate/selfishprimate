import { useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Track page views in Google Analytics
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-66XZN25NK2', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}

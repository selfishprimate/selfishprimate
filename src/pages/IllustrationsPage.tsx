import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageLede } from '@/components/PageLede';
import { BlockLabel } from '@/components/BlockLabel';
import { getIllustrationsContent } from '@/lib/illustrations';
import { useSEO, generateTitle } from '@/hooks/useSEO';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

export function IllustrationsPage() {
  const { meta, illustrations } = getIllustrationsContent();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useSEO({
    title: generateTitle(meta.title),
    description: meta.description,
    keywords: ['Illustrations', 'Digital Art', 'Creative', 'Artwork', 'Drawing'],
  });

  // Lock body scroll when lightbox is open
  useBodyScrollLock(selectedIndex !== null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsZoomed(false);
  };
  const closeLightbox = () => {
    setSelectedIndex(null);
    setIsZoomed(false);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? illustrations.length - 1 : selectedIndex - 1);
      setIsZoomed(false);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === illustrations.length - 1 ? 0 : selectedIndex + 1);
      setIsZoomed(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex(selectedIndex === 0 ? illustrations.length - 1 : selectedIndex - 1);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex(selectedIndex === illustrations.length - 1 ? 0 : selectedIndex + 1);
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, illustrations.length]);

  return (
    <div className="mx-auto w-full max-w-[860px] px-5">
      <section>
        <div className="pt-16 pb-16 md:pt-24 md:pb-20">
          <PageLede title={meta.title + '.'} fade={meta.description} />
        </div>

        <BlockLabel meta={`${illustrations.length} pieces`} className="mb-5">
          {meta.label}
        </BlockLabel>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6">
          {illustrations.map((illustration, index) => (
            <motion.button
              type="button"
              key={illustration.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer text-left"
              onClick={() => openLightbox(index)}
              aria-label={`View ${illustration.title} in full size`}
            >
              <div className="aspect-square overflow-hidden rounded-[3px] bg-surface">
                <img
                  src={illustration.image}
                  alt={illustration.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex flex-col bg-neutral-950/96"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center text-neutral-400 transition-colors hover:text-white"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Image Area */}
            <div
              className={`flex-1 ${isZoomed ? 'overflow-auto scrollbar-hide' : 'flex items-center justify-center overflow-hidden pt-12'}`}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  if (isZoomed) setIsZoomed(false);
                  else closeLightbox();
                }
              }}
            >
              {isZoomed ? (
                <div className="inline-block p-4">
                  <img
                    src={illustrations[selectedIndex].image}
                    alt={illustrations[selectedIndex].title}
                    className="w-[130vw] h-auto cursor-zoom-out"
                    onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                    draggable={false}
                  />
                </div>
              ) : (
                <img
                  src={illustrations[selectedIndex].image}
                  alt={illustrations[selectedIndex].title}
                  className={`max-w-[92vw] max-h-[calc(100vh-8rem)] object-contain ${!isTouchDevice ? 'cursor-zoom-in' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isTouchDevice) setIsZoomed(true);
                  }}
                  draggable={false}
                />
              )}
            </div>

            {/* Bottom Navigation */}
            {illustrations.length > 1 && (
              <div
                className="sticky bottom-0 left-0 right-0 flex items-center justify-center py-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={goToPrevious}
                    className="flex h-10 w-10 items-center justify-center text-neutral-400 transition-colors hover:text-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <span className="min-w-[3rem] text-center text-sm text-neutral-400">
                    {selectedIndex + 1} / {illustrations.length}
                  </span>
                  <button
                    onClick={goToNext}
                    className="flex h-10 w-10 items-center justify-center text-neutral-400 transition-colors hover:text-white"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

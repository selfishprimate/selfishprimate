import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

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
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
      setIsZoomed(false);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
      setIsZoomed(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  if (images.length === 0) return null;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <motion.button
            key={image}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => openLightbox(index)}
            className="relative overflow-hidden bg-border group cursor-zoom-in"
          >
            <img
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-text-primary/0 group-hover:bg-text-primary/10 transition-colors duration-300" />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-surface/95 flex flex-col"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Image Area */}
            <div
              className={`flex-1 ${isZoomed ? 'overflow-auto scrollbar-hide' : 'flex items-center justify-center overflow-hidden'}`}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  isZoomed ? setIsZoomed(false) : closeLightbox();
                }
              }}
            >
              {isZoomed ? (
                <div className="inline-block p-4">
                  <img
                    src={images[selectedIndex]}
                    alt={`${title} - Image ${selectedIndex + 1}`}
                    className="w-[130vw] h-auto cursor-zoom-out"
                    onClick={() => setIsZoomed(false)}
                    draggable={false}
                  />
                </div>
              ) : (
                <img
                  src={images[selectedIndex]}
                  alt={`${title} - Image ${selectedIndex + 1}`}
                  className={`max-w-[92vw] max-h-[calc(100vh-8rem)] object-contain ${!isTouchDevice ? 'cursor-zoom-in' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isTouchDevice) setIsZoomed(true);
                  }}
                  draggable={false}
                />
              )}
            </div>

            {/* Bottom Navigation - Sticky */}
            {images.length > 1 && (
              <div
                className="sticky bottom-0 left-0 right-0 flex items-center justify-center py-4 bg-surface/90 backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={goToPrevious}
                    className="w-10 h-10 flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <span className="text-text-tertiary text-sm font-sans min-w-[3rem] text-center">
                    {selectedIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
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
    </>
  );
}

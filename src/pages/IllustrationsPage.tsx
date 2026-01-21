import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { illustrations } from '@/lib/data';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function IllustrationsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useSEO({
    title: generateTitle('Illustrations'),
    description: 'A collection of digital illustrations and creative artwork exploring various styles and themes.',
    keywords: ['Illustrations', 'Digital Art', 'Creative', 'Artwork', 'Drawing'],
  });

  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <SectionHeading
          label="Creative"
          title="Illustrations"
          description="Personal artwork and creative explorations beyond UI/UX design."
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-16">
          {illustrations.map((illustration, index) => (
            <motion.div
              key={illustration.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(illustration.image)}
            >
              <div className="overflow-hidden bg-border">
                <img
                  src={illustration.image}
                  alt={illustration.title}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-serif font-semibold text-xl text-text-primary">
                {illustration.title}
              </h3>
              <p className="mt-2 text-text-secondary">
                {illustration.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt=""
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function NotFoundPage() {
  useSEO({
    title: generateTitle('404'),
    description: 'Page not found',
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-serif text-8xl md:text-9xl text-text-primary mb-4">
          404
        </h1>
        <p className="text-text-secondary text-lg md:text-xl mb-8 max-w-md mx-auto">
          This page has wandered off into the digital wilderness.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-surface font-sans text-sm rounded-full hover:bg-text-secondary transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

import { useReducedMotion } from 'framer-motion';

interface CoverMediaProps {
  image: string;
  video?: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

/**
 * A project's cover: the still, or, when the project has one, a short silent
 * loop with the still as its poster, so the frame never sits empty while the
 * video loads. Asked for less motion, the loop is not loaded at all and the
 * still is all there is.
 */
export function CoverMedia({ image, video, alt, className, loading = 'lazy' }: CoverMediaProps) {
  const reduceMotion = useReducedMotion();

  if (!video || reduceMotion) {
    return <img src={image} alt={alt} loading={loading} decoding="async" className={className} />;
  }

  return (
    <video
      src={video}
      poster={image}
      autoPlay
      muted
      loop
      playsInline
      preload={loading === 'eager' ? 'auto' : 'metadata'}
      aria-label={alt}
      className={className}
    />
  );
}

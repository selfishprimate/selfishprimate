import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CoverMediaProps {
  image: string;
  video?: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  /**
   * Leave unset and the loop plays on its own. Pass a boolean and the caller
   * decides: the loop runs while it is true, and when it turns false it stops
   * and goes back to its first frame, which is the poster, so the cover
   * settles into the still rather than freezing mid-move.
   */
  playing?: boolean;
}

/**
 * A project's cover: the still, or, when the project has one, a short silent
 * loop with the still as its poster, so the frame never sits empty while the
 * video loads. Asked for less motion, the loop is not loaded at all and the
 * still is all there is.
 */
export function CoverMedia({ image, video, alt, className, loading = 'lazy', playing }: CoverMediaProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const controlled = playing !== undefined;

  useEffect(() => {
    const el = ref.current;
    if (!el || !controlled) return;
    if (playing) {
      // play() rejects when it is interrupted by a pause before it starts,
      // which is just the pointer leaving quickly, not an error.
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [controlled, playing]);

  if (!video || reduceMotion) {
    return <img src={image} alt={alt} loading={loading} decoding="async" className={className} />;
  }

  return (
    <video
      ref={ref}
      src={video}
      poster={image}
      autoPlay={!controlled}
      muted
      loop
      playsInline
      // A loop that only runs on request has no reason to download before it
      // is asked for; the poster covers the frame until then.
      preload={controlled ? 'none' : loading === 'eager' ? 'auto' : 'metadata'}
      aria-label={alt}
      className={className}
    />
  );
}

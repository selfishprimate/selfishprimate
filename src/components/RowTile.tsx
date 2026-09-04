interface RowTileProps {
  src?: string;
  alt: string;
  /**
   * `cover` fills the tile — right for a cover image. `contain` sits the image
   * inside it with padding — right for a logo, which should not be cropped.
   */
  fit?: 'cover' | 'contain';
}

/**
 * The image half of a list row: a 3:2 tile on the card grey, at the card
 * radius. Both list pages use the same tile so their rows share one rhythm
 * even though one carries a screenshot and the other a company mark.
 */
export function RowTile({ src, alt, fit = 'cover' }: RowTileProps) {
  return (
    <span className="block aspect-[3/2] overflow-hidden rounded-xl bg-surface">
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={
            fit === 'cover'
              ? 'h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]'
              : 'h-full w-full object-contain p-12 md:p-20'
          }
        />
      )}
    </span>
  );
}

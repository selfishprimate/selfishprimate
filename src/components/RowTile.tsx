interface RowTileProps {
  src?: string;
  alt: string;
}

/**
 * The image half of a list row: a square thumbnail on the card grey, at the
 * card radius. Square rather than 3:2 so it matches the company marks on the
 * Experience page and the two lists keep one rhythm.
 */
export function RowTile({ src, alt }: RowTileProps) {
  return (
    <span className="block aspect-square overflow-hidden rounded-card bg-surface">
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
      )}
    </span>
  );
}

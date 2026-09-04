interface RowTileProps {
  src?: string;
  alt: string;
}

/**
 * The image half of a list row: a thumbnail on the card grey, at the card
 * radius. Square from `md` up, so it matches the company marks on the
 * Experience page and the two lists keep one rhythm — but on a phone the row
 * stacks and a square cover runs the width of the screen, so it lies down to
 * 16:9 there.
 */
export function RowTile({ src, alt }: RowTileProps) {
  return (
    <span className="block aspect-video overflow-hidden rounded-card bg-surface md:aspect-square">
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

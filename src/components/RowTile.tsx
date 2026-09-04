interface RowTileProps {
  src?: string;
  alt: string;
}

/**
 * The image half of a list row: a 3:2 thumbnail on the card grey, at the card
 * radius.
 */
export function RowTile({ src, alt }: RowTileProps) {
  return (
    <span className="block aspect-[3/2] overflow-hidden rounded-xl bg-surface">
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

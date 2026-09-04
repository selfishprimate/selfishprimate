/**
 * The aspect-ratio cycle the two-column card grids run on.
 *
 * The staggered look does not come from offsetting a column — every card starts
 * at the same top, and the columns fall out of step because the cards are
 * different heights. Five is coprime with the two columns, so the phase keeps
 * shifting down the page instead of repeating every other row.
 */
const CARD_ASPECTS = [
  'aspect-[3/2]',
  'aspect-square',
  'aspect-[3/2]',
  'aspect-[3/2]',
  'aspect-square',
];

export function aspectAt(index: number): string {
  return CARD_ASPECTS[index % CARD_ASPECTS.length];
}

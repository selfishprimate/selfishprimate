import { useEffect, useRef } from 'react';

/**
 * A wave crossing the hero, drawn as contour lines in monospace.
 *
 * Three travelling sine components are summed at different wavelengths, speeds
 * and angles. One sine looks like a machine; three that never quite line up
 * again read as water.
 *
 * The surface is drawn as iso-lines rather than shading, and the distance to
 * each line is divided by the local gradient before it is thresholded. Without
 * that division the lines swell into wide ribbons wherever the surface is flat
 * and thin to nothing where it is steep; with it they hold an even weight
 * across the whole field, which is the difference between a texture and a
 * drawing.
 *
 * Each character is chosen to follow the direction its contour runs, so the
 * linework flows instead of dithering.
 */

/** Glyphs by tangent direction, from horizontal round to horizontal again. */
const STROKES = ['─', '╲', '│', '╱'];

/** Contour levels per unit of surface height. Lower is sparser. */
const FREQUENCY = 0.85;
/** Half-width of a drawn line, in character cells. */
const LINE_HALF_WIDTH = 0.75;

interface HeroWaveProps {
  className?: string;
}

export function HeroWave({ className = '' }: HeroWaveProps) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cols = 0;
    let rows = 0;
    let aspect = 2;
    let field = new Float32Array(0);
    let frameId = 0;
    let resizeTimer = 0;
    let lastPaint = 0;
    const startedAt = performance.now();
    const row: string[] = [];

    const measure = () => {
      const style = getComputedStyle(el);
      const probe = document.createElement('canvas').getContext('2d');
      if (!probe) return;
      probe.font = `${style.fontSize} ${style.fontFamily}`;
      const cellW = probe.measureText('M').width;
      const cellH = parseFloat(style.lineHeight) || parseFloat(style.fontSize);
      if (!cellW || !cellH) return;
      // A character cell is about twice as tall as it is wide; without this the
      // wave would be stretched flat.
      aspect = cellH / cellW;
      cols = Math.max(20, Math.floor(el.clientWidth / cellW));
      rows = Math.max(8, Math.floor(el.clientHeight / cellH));
      // One row of overscan so the gradient has a neighbour to read at the
      // bottom edge.
      field = new Float32Array(cols * (rows + 1));
    };

    const paint = (now: number) => {
      frameId = requestAnimationFrame(paint);
      if (now - lastPaint < 55) return;
      lastPaint = now;
      if (!cols || !rows) return;

      const t = reduced ? 0 : (now - startedAt) / 1000;

      // The surface, once per cell. Everything after this reads the buffer, so
      // the sines are never evaluated more than once for the same point.
      for (let y = 0; y <= rows; y += 1) {
        const yy = y * aspect;
        const base = y * cols;
        for (let x = 0; x < cols; x += 1) {
          field[base + x] =
            Math.sin(x * 0.026 + yy * 0.01 - t * 0.42) +
            0.62 * Math.sin(x * 0.014 - yy * 0.021 + t * 0.29) +
            0.38 * Math.sin(x * 0.047 + yy * 0.032 - t * 0.63);
        }
      }

      const out: string[] = [];
      for (let y = 0; y < rows; y += 1) {
        row.length = 0;
        const base = y * cols;
        for (let x = 0; x < cols; x += 1) {
          const h = field[base + x];
          const level = h * FREQUENCY;
          const fraction = level - Math.floor(level);
          const toLine = Math.min(fraction, 1 - fraction);

          // Change in level per cell, in each direction.
          const dx = (field[base + Math.min(x + 1, cols - 1)] - h) * FREQUENCY;
          const dy = (field[base + cols + x] - h) * FREQUENCY;
          const slope = Math.hypot(dx, dy);
          if (slope < 1e-5) {
            row.push(' ');
            continue;
          }

          // Distance to the contour in cells, rather than in level units.
          const cellsAway = toLine / slope;
          if (cellsAway > LINE_HALF_WIDTH) {
            row.push(' ');
            continue;
          }

          // The contour runs perpendicular to the gradient.
          let angle = Math.atan2(-dx, dy);
          if (angle < 0) angle += Math.PI;
          const stroke = STROKES[Math.round((angle / Math.PI) * 4) % 4];

          // Soften the outer third of the line so it has no hard edge.
          row.push(cellsAway > LINE_HALF_WIDTH * 0.66 ? '·' : stroke);
        }
        out.push(row.join(''));
      }

      el.textContent = out.join('\n');
      if (reduced) cancelAnimationFrame(frameId);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 200);
    };

    measure();
    frameId = requestAnimationFrame(paint);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden whitespace-pre font-mono text-[10px] leading-none text-text-tertiary/35 ${className}`}
      style={{
        // Soft on every edge, so the field has no boundary of its own.
        maskImage:
          'linear-gradient(to bottom, transparent, black 22%, black 74%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 22%, black 74%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    />
  );
}

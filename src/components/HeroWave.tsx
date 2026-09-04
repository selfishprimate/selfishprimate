import { useEffect, useRef } from 'react';

/**
 * A lit water surface behind the hero, rendered in monospace.
 *
 * Three things make it read as water rather than as a pattern:
 *
 * 1. The waves are sharpened. Real swell has narrow crests and broad troughs,
 *    so each component is a sine raised to a power rather than a plain sine.
 * 2. The surface is lit, not shaded by height. A normal is taken from the
 *    height field and run through a diffuse term plus a soft specular, so
 *    crests catch a highlight and the far side of each one falls away. Height
 *    alone gives you stripes; a normal gives you a surface.
 * 3. It recedes, gently. Coordinates are divided by a depth that grows toward
 *    the top of the field. Push this too far and the whole thing collapses into
 *    radial streaks, so the range is deliberately shallow.
 *
 * Because the page is white, luminance is inverted on the way out: lit crests
 * leave the paper bare and the shadowed side fills with characters. The ramp
 * stops well short of solid and the whole layer sits at low opacity — this is
 * meant to be noticed on the second look, not the first.
 */

/** Deliberately short of a solid character: the darkest mark here is a plus. */
const RAMP = ' ·:-=+';

/** Direction the light comes from, normalised. */
const LIGHT_X = 0.38;
const LIGHT_Y = -0.5;
const LIGHT_Z = 0.78;

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
    let frameId = 0;
    let resizeTimer = 0;
    let lastPaint = 0;
    let field = new Float32Array(0);
    let stride = 0;
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
      cols = Math.max(20, Math.floor(el.clientWidth / cellW));
      rows = Math.max(8, Math.floor(el.clientHeight / cellH));
      // One extra column and row of overscan, so every cell has a neighbour to
      // difference against when the normal is taken.
      stride = cols + 1;
      field = new Float32Array(stride * (rows + 1));
    };

    /** A sine with narrow crests and broad troughs, as swell actually is. */
    const swell = (phase: number, sharpness: number) =>
      Math.pow((Math.sin(phase) + 1) * 0.5, sharpness) * 2 - 1;

    const paint = (now: number) => {
      frameId = requestAnimationFrame(paint);
      if (now - lastPaint < 55) return;
      lastPaint = now;
      if (!cols || !rows) return;

      const t = reduced ? 4 : (now - startedAt) / 1000;
      const centreX = (cols - 1) / 2;

      for (let y = 0; y <= rows; y += 1) {
        // Shallow perspective. A wider range here turns the field into radial
        // streaks converging on the top edge.
        const depth = 1 / (0.62 + 0.38 * ((y + 0.5) / rows));
        const base = y * stride;
        for (let x = 0; x <= cols; x += 1) {
          const wx = (x - centreX) * 0.05 * depth;
          const wz = depth * 2.4;
          field[base + x] =
            0.55 * swell(wx * 1.0 + wz * 0.55 - t * 0.75, 1.8) +
            0.3 * swell(wx * 1.9 - wz * 0.42 + t * 0.52, 2.4) +
            0.16 * swell(wx * 4.1 + wz * 1.2 - t * 1.35, 3.2);
        }
      }

      const out: string[] = [];
      for (let y = 0; y < rows; y += 1) {
        row.length = 0;
        for (let x = 0; x < cols; x += 1) {
          const h = field[base(y) + x];
          // Slopes. The vertical one is scaled up because a character cell is
          // about twice as tall as it is wide, so a step down the page covers
          // more ground than a step across it.
          const dhx = (field[base(y) + x + 1] - h) * 9;
          const dhy = (field[base(y + 1) + x] - h) * 4.5;

          const nx = -dhx;
          const ny = -dhy;
          const length = Math.hypot(nx, ny, 1);
          const ix = nx / length;
          const iy = ny / length;
          const iz = 1 / length;

          const diffuse = Math.max(0, ix * LIGHT_X + iy * LIGHT_Y + iz * LIGHT_Z);
          const hx = LIGHT_X;
          const hy = LIGHT_Y;
          const hz = LIGHT_Z + 1;
          const hLen = Math.hypot(hx, hy, hz);
          const spec = Math.pow(Math.max(0, (ix * hx + iy * hy + iz * hz) / hLen), 26);

          // A narrow band of light, so most of the field stays empty and only
          // the shadowed side of a crest picks up a mark.
          const light = 0.46 + 0.5 * diffuse + 0.45 * spec;
          const density = Math.min(1, Math.max(0, 1 - light));
          row.push(RAMP[Math.round(density * (RAMP.length - 1))]);
        }
        out.push(row.join(''));
      }

      el.textContent = out.join('\n');
      if (reduced) cancelAnimationFrame(frameId);
    };

    const base = (y: number) => y * stride;

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
      className={`pointer-events-none select-none overflow-hidden whitespace-pre font-mono text-[10px] leading-none text-text-tertiary/[0.28] ${className}`}
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent, black 12%, black 72%, transparent), linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 12%, black 72%, transparent), linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    />
  );
}

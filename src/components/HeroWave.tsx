import { useEffect, useRef } from 'react';

/**
 * Waves running up a beach and draining back, top to bottom.
 *
 * The sea is off the top of the field and the dry sand is at the bottom. What
 * is actually simulated is the waterline: for every column, the row the water
 * currently reaches.
 *
 * Three things make it read as a shore rather than as a bar moving up and down:
 *
 * 1. **The swash is asymmetric.** Water rushes up the sand in about a fifth of
 *    the time it takes to drain back. A symmetric oscillation reads as a
 *    machine immediately.
 * 2. **Two cycles at once, on periods that never divide.** Most waves are
 *    small; now and then two peaks coincide and one runs much further up the
 *    beach. That irregularity is most of the realism.
 * 3. **The sand stays wet.** Each column remembers the furthest the water
 *    reached and dries out slowly behind it, so the retreating edge leaves a
 *    darker band that fades rather than vanishing.
 *
 * On top of that the leading edge carries foam — speckle, not a solid line —
 * and the open water behind it is textured by swell travelling down the page.
 */

const RAMP = ' ·:-=+*';

/** Seconds for the two swash cycles. Deliberately not multiples. */
const CYCLE_A = 7.4;
const CYCLE_B = 11.3;

/**
 * One swash cycle, 0 at the lowest reach and 1 at the furthest. Rushes up in
 * the first fifth, drains back over the rest.
 */
function swash(cycles: number) {
  const f = cycles - Math.floor(cycles);
  if (f < 0.2) return Math.pow(f / 0.2, 0.55);
  return Math.pow(1 - (f - 0.2) / 0.8, 1.7);
}

/** Cheap deterministic speckle, for foam and for grains of wet sand. */
function grain(x: number, y: number) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

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
    let wet = new Float32Array(0);
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
      rows = Math.max(10, Math.floor(el.clientHeight / cellH));
      wet = new Float32Array(cols);
    };

    const paint = (now: number) => {
      frameId = requestAnimationFrame(paint);
      const elapsed = now - lastPaint;
      if (elapsed < 55) return;
      const dt = Math.min(0.25, elapsed / 1000);
      lastPaint = now;
      if (!cols || !rows) return;

      const t = reduced ? 2.2 : (now - startedAt) / 1000;

      const lowest = rows * 0.3;
      const reach = rows * 0.62;
      // How fast the sand gives up its water, in rows per second.
      const drying = rows * 0.16;

      const out: string[] = [];
      const edges = new Float32Array(cols);

      for (let x = 0; x < cols; x += 1) {
        // The beach is not level, and the two cycles arrive slightly out of
        // step along it, so the edge is a curve rather than a straight line.
        const lie = 0.5 + 0.3 * Math.sin(x * 0.021 + t * 0.11) + 0.2 * Math.sin(x * 0.049 - t * 0.07);
        const a = swash(t / CYCLE_A + lie * 0.1);
        const b = swash(t / CYCLE_B + lie * 0.17) * 0.7;
        const edge = lowest + Math.max(a, b) * reach;
        edges[x] = edge;
        // The sand remembers the furthest the water came, then dries.
        wet[x] = Math.max(edge, wet[x] - drying * dt);
      }

      for (let y = 0; y < rows; y += 1) {
        row.length = 0;
        for (let x = 0; x < cols; x += 1) {
          const edge = edges[x];
          const g = grain(x, y);
          let value = 0;

          if (y < edge) {
            // Seaward of the line. Swell travelling down the page, and more
            // turbulence the closer to the breaking edge.
            const depth = edge - y;
            const swell = 0.5 + 0.5 * Math.sin(y * 0.42 - t * 3.1 + x * 0.035);
            const body = 0.2 + 0.28 * swell;
            const foam = depth < 3.2 ? (1 - depth / 3.2) * 0.85 * (0.45 + g) : 0;
            value = Math.max(body, foam);
          } else if (y < wet[x]) {
            // Sand the water has covered and not yet given up. Fades both with
            // distance behind the edge and as the whole band dries.
            const behind = (y - edge) / Math.max(1, wet[x] - edge);
            value = (1 - behind) * 0.34 * (0.55 + g * 0.8);
          }

          row.push(RAMP[Math.round(Math.min(1, Math.max(0, value)) * (RAMP.length - 1))]);
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
      className={`pointer-events-none select-none overflow-hidden whitespace-pre font-mono text-[10px] leading-none text-text-tertiary/30 ${className}`}
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent, black 16%, black 78%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 16%, black 78%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    />
  );
}

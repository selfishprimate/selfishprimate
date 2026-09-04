import { useEffect, useRef } from 'react';

/**
 * A lit water surface behind a page header, rendered in monospace.
 *
 * Three things make it read as water rather than as a pattern:
 *
 * 1. **The waves are sharpened.** Real swell has narrow crests and broad
 *    troughs, so most components are a sine raised to a power.
 * 2. **The surface is lit, not shaded by height.** A normal is taken off the
 *    height field and run through diffuse plus a soft specular. Height alone
 *    gives you stripes; a normal gives you a surface.
 * 3. **It recedes.** Coordinates divide by a depth that grows toward the top of
 *    the field. Each model sets how much; push it far and the field collapses
 *    into radial streaks converging on the top edge.
 *
 * The page is white, so luminance is inverted on the way out: lit crests leave
 * the paper bare and the shadowed side of a crest fills with characters. The
 * ramp stops short of a solid glyph, which is what keeps it from becoming a
 * block of texture however the light is tuned.
 *
 * Which model appears is chosen at random on mount, never repeating the one
 * before it — so a refresh changes the water, and moving between pages does
 * too.
 */

/** Deliberately short of a solid character: the darkest mark here is a plus. */
const RAMP = ' ·:-=+';

/** Direction the light comes from. */
const LIGHT_X = 0.38;
const LIGHT_Y = -0.5;
const LIGHT_Z = 0.78;

/** A sine with narrow crests and broad troughs, as swell actually is. */
const sharpen = (phase: number, sharpness: number) =>
  Math.pow((Math.sin(phase) + 1) * 0.5, sharpness) * 2 - 1;

interface WaveModel {
  id: string;
  /** 0 is a flat plane seen head on; higher values recede harder. */
  perspective: number;
  /** Height at a point on the water, in world coordinates. */
  surface: (x: number, z: number, t: number) => number;
}

const MODELS: WaveModel[] = [
  {
    // Open ocean swell running at an angle across the field.
    id: 'swell',
    perspective: 0.38,
    surface: (x, z, t) =>
      0.55 * sharpen(x * 1.0 + z * 0.55 - t * 0.75, 1.8) +
      0.3 * sharpen(x * 1.9 - z * 0.42 + t * 0.52, 2.4) +
      0.16 * sharpen(x * 4.1 + z * 1.2 - t * 1.35, 3.2),
  },
  {
    // Short, crossed wave trains: wind chop on a shallow bay.
    id: 'chop',
    perspective: 0.22,
    surface: (x, z, t) =>
      0.34 * sharpen(x * 3.1 + z * 2.2 - t * 1.15, 1.3) +
      0.3 * sharpen(x * 2.6 - z * 3.4 + t * 0.95, 1.5) +
      0.22 * sharpen(x * 5.7 + z * 1.1 - t * 1.8, 1.8) +
      0.14 * sharpen(x * 1.3 - z * 6.2 + t * 0.7, 2.0),
  },
  {
    // One disturbance off to the side, spreading and losing height as it goes.
    id: 'ripples',
    perspective: 0.3,
    surface: (x, z, t) => {
      const r = Math.hypot(x - 1.4, z - 1.1);
      return Math.sin(r * 4.2 - t * 1.6) / (1 + r * 0.8);
    },
  },
  {
    // Two sources, and the pattern where their rings meet.
    id: 'interference',
    perspective: 0.28,
    surface: (x, z, t) => {
      const r1 = Math.hypot(x + 1.6, z - 0.6);
      const r2 = Math.hypot(x - 1.7, z - 1.4);
      return (
        (0.62 * Math.sin(r1 * 3.6 - t * 1.35)) / (1 + r1 * 0.55) +
        (0.62 * Math.sin(r2 * 3.9 - t * 1.15)) / (1 + r2 * 0.55)
      );
    },
  },
  {
    // A long, slow groundswell almost square to the viewer.
    id: 'roll',
    perspective: 0.52,
    surface: (x, z, t) =>
      0.82 * sharpen(z * 0.9 + x * 0.12 - t * 0.42, 2.6) +
      0.14 * sharpen(x * 3.4 + z * 0.8 - t * 0.9, 1.6),
  },
  {
    // Folded sines, the way light bands on the floor of a shallow pool.
    id: 'caustics',
    perspective: 0.24,
    surface: (x, z, t) => {
      const a = Math.sin(x * 2.4 + t * 0.6) + Math.sin(z * 2.1 - t * 0.45);
      const b = Math.sin((x + z) * 1.7 - t * 0.8);
      return 1 - Math.abs(a * 0.45 + b * 0.4) * 0.9;
    },
  },
];

/** Remembered across mounts so the same water never comes up twice running. */
let lastModelId: string | null = null;

function pickModel(): WaveModel {
  const options = MODELS.filter((model) => model.id !== lastModelId);
  const chosen = options[Math.floor(Math.random() * options.length)] ?? MODELS[0];
  lastModelId = chosen.id;
  return chosen;
}

interface HeroWaveProps {
  /** Force a model instead of picking one. Handy when comparing them. */
  model?: string;
  /**
   * `band` is a fixed depth from the top of the page — the right choice
   * anywhere the opening section runs long, since there is no reason for the
   * water to follow a page header all the way down. `section` fills whatever
   * section it is placed in, which only the home hero wants.
   */
  extent?: 'band' | 'section';
  className?: string;
}

export function HeroWave({ model, extent = 'band', className = '' }: HeroWaveProps) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const wave = model ? MODELS.find((m) => m.id === model) ?? pickModel() : pickModel();
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

    const paint = (now: number) => {
      frameId = requestAnimationFrame(paint);
      if (now - lastPaint < 55) return;
      lastPaint = now;
      if (!cols || !rows) return;

      const t = reduced ? 4 : (now - startedAt) / 1000;
      const centreX = (cols - 1) / 2;
      const flat = 1 - wave.perspective;

      for (let y = 0; y <= rows; y += 1) {
        const depth = 1 / (flat + wave.perspective * ((y + 0.5) / rows));
        const base = y * stride;
        for (let x = 0; x <= cols; x += 1) {
          field[base + x] = wave.surface((x - centreX) * 0.05 * depth, depth * 2.4, t);
        }
      }

      const out: string[] = [];
      for (let y = 0; y < rows; y += 1) {
        row.length = 0;
        const base = y * stride;
        const below = base + stride;
        for (let x = 0; x < cols; x += 1) {
          const h = field[base + x];
          // Slopes. The vertical one is scaled differently because a character
          // cell is about twice as tall as it is wide.
          const dhx = (field[base + x + 1] - h) * 9;
          const dhy = (field[below + x] - h) * 4.5;

          const length = Math.hypot(-dhx, -dhy, 1);
          const ix = -dhx / length;
          const iy = -dhy / length;
          const iz = 1 / length;

          const diffuse = Math.max(0, ix * LIGHT_X + iy * LIGHT_Y + iz * LIGHT_Z);
          const hz = LIGHT_Z + 1;
          const hLen = Math.hypot(LIGHT_X, LIGHT_Y, hz);
          const spec = Math.pow(
            Math.max(0, (ix * LIGHT_X + iy * LIGHT_Y + iz * hz) / hLen),
            26
          );

          const light = 0.46 + 0.5 * diffuse + 0.45 * spec;
          const density = Math.min(1, Math.max(0, 1 - light));
          row.push(RAMP[Math.round(density * (RAMP.length - 1))]);
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
  }, [model]);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      // Full-bleed, and pulled up past the top of its section so the surface
      // continues behind the header rather than starting under it. Negative z
      // keeps it under the section's own content without escaping the section,
      // which is why the section carries `isolate`.
      className={`pointer-events-none absolute -top-36 left-1/2 -z-10 hidden w-screen -translate-x-1/2 select-none overflow-hidden whitespace-pre font-mono text-[10px] leading-none text-text-tertiary/[0.28] md:block ${
        extent === 'section' ? 'bottom-0' : 'h-[560px]'
      } ${className}`}
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

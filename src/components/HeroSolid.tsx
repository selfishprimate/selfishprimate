import { useEffect, useRef } from 'react';

/**
 * A slowly turning solid behind a page header, rendered in monospace.
 *
 * This is the oldest trick in graphics and still the most convincing one in
 * text: sample points on a surface, rotate them, project them, keep the nearest
 * at each character cell with a z-buffer, and pick the character from how much
 * light that point's normal catches. Because it has a silhouette it reads as an
 * object rather than as a texture, which is the whole reason it is here.
 *
 * The page is white, so the shading is inverted: a lit face leaves the paper
 * nearly bare and a face turned away from the light fills with characters. Every
 * covered cell keeps at least a faint mark so the form never breaks apart.
 *
 * Sines and cosines for the surface parameters are tabulated once, so a frame
 * is arithmetic and nothing else.
 */

/** Deliberately short of a solid character: the darkest mark here is a plus. */
const RAMP = ' ·:-=+';

/** Light direction, normalised. */
const LIGHT_X = -0.42;
const LIGHT_Y = 0.62;
const LIGHT_Z = -0.66;

interface Sample {
  /** Point in object space. */
  x: number;
  y: number;
  z: number;
  /** Unit normal at that point. */
  nx: number;
  ny: number;
  nz: number;
}

/** A torus: the form everyone has seen rendered this way, and still the best. */
function torus(): Sample[] {
  const out: Sample[] = [];
  const tube = 0.62;
  const ring = 1.55;
  for (let i = 0; i < 110; i += 1) {
    const theta = (i / 110) * Math.PI * 2;
    const ct = Math.cos(theta);
    const st = Math.sin(theta);
    for (let j = 0; j < 300; j += 1) {
      const phi = (j / 300) * Math.PI * 2;
      const cp = Math.cos(phi);
      const sp = Math.sin(phi);
      const r = ring + tube * ct;
      out.push({
        x: r * cp,
        y: tube * st,
        z: r * sp,
        nx: ct * cp,
        ny: st,
        nz: ct * sp,
      });
    }
  }
  return out;
}

/** A sphere, for when the page wants something quieter. */
function sphere(): Sample[] {
  const out: Sample[] = [];
  const radius = 1.75;
  for (let i = 1; i < 120; i += 1) {
    const v = (i / 120) * Math.PI - Math.PI / 2;
    const cv = Math.cos(v);
    const sv = Math.sin(v);
    for (let j = 0; j < 260; j += 1) {
      const u = (j / 260) * Math.PI * 2;
      const nx = cv * Math.cos(u);
      const ny = sv;
      const nz = cv * Math.sin(u);
      out.push({ x: nx * radius, y: ny * radius, z: nz * radius, nx, ny, nz });
    }
  }
  return out;
}

/** A cube: flat faces, so the light reads as six distinct planes. */
function cube(): Sample[] {
  const out: Sample[] = [];
  const half = 1.35;
  const steps = 74;
  const faces: [number, number, number][] = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  for (const [nx, ny, nz] of faces) {
    for (let a = 0; a <= steps; a += 1) {
      for (let b = 0; b <= steps; b += 1) {
        const u = (a / steps) * 2 * half - half;
        const v = (b / steps) * 2 * half - half;
        // Lay the two in-plane axes down against whichever axis the face faces.
        const x = nx !== 0 ? nx * half : u;
        const y = ny !== 0 ? ny * half : nx !== 0 ? u : v;
        const z = nz !== 0 ? nz * half : v;
        out.push({ x, y, z, nx, ny, nz });
      }
    }
  }
  return out;
}

type Curve = (u: number) => [number, number, number];

/**
 * Sweep a round tube along a closed curve. The frame at each step comes from
 * the curve's own tangent, so the tube stays round however the path twists.
 */
function sweep(curve: Curve, tube: number, steps: number, around: number): Sample[] {
  const out: Sample[] = [];

  for (let i = 0; i < steps; i += 1) {
    const u = (i / steps) * Math.PI * 2;
    const [px, py, pz] = curve(u);
    const [qx, qy, qz] = curve(u + 0.01);

    let tx = qx - px;
    let ty = qy - py;
    let tz = qz - pz;
    const tl = Math.hypot(tx, ty, tz) || 1;
    tx /= tl;
    ty /= tl;
    tz /= tl;

    // Cross the tangent with a fixed axis to get the first ring direction. Any
    // axis will do as long as the curve never runs parallel to it.
    let ax = -tz;
    let ay = 0;
    let az = tx;
    const al = Math.hypot(ax, ay, az) || 1;
    ax /= al;
    ay /= al;
    az /= al;

    const bx = ty * az - tz * ay;
    const by = tz * ax - tx * az;
    const bz = tx * ay - ty * ax;

    for (let j = 0; j < around; j += 1) {
      const phi = (j / around) * Math.PI * 2;
      const cp = Math.cos(phi);
      const sp = Math.sin(phi);
      const nx = ax * cp + bx * sp;
      const ny = ay * cp + by * sp;
      const nz = az * cp + bz * sp;
      out.push({ x: px + nx * tube, y: py + ny * tube, z: pz + nz * tube, nx, ny, nz });
    }
  }
  return out;
}

/**
 * Sample a parametric surface, taking normals from the cross product of two
 * finite-difference tangents. Slower to build than an analytic normal and
 * exact enough at this size, which is what lets a form be written as its
 * position function alone.
 */
function parametric(
  point: (u: number, v: number) => [number, number, number],
  uSteps: number,
  vSteps: number,
  uMax: number,
  vMin: number,
  vMax: number,
): Sample[] {
  const out: Sample[] = [];
  const h = 0.002;

  for (let i = 0; i < uSteps; i += 1) {
    const u = (i / uSteps) * uMax;
    for (let j = 0; j <= vSteps; j += 1) {
      const v = vMin + (j / vSteps) * (vMax - vMin);
      const [x, y, z] = point(u, v);
      const [ux, uy, uz] = point(u + h, v);
      const [vx, vy, vz] = point(u, v + h);

      const au = [ux - x, uy - y, uz - z];
      const av = [vx - x, vy - y, vz - z];
      let nx = au[1] * av[2] - au[2] * av[1];
      let ny = au[2] * av[0] - au[0] * av[2];
      let nz = au[0] * av[1] - au[1] * av[0];
      const nl = Math.hypot(nx, ny, nz) || 1;
      nx /= nl;
      ny /= nl;
      nz /= nl;

      out.push({ x, y, z, nx, ny, nz });
    }
  }
  return out;
}

/** A (2,3) torus knot: one closed path that passes through itself twice. */
function knot(): Sample[] {
  return sweep(
    (u) => {
      const r = Math.cos(3 * u) * 0.55 + 1.5;
      return [r * Math.cos(2 * u), r * Math.sin(2 * u), -Math.sin(3 * u) * 0.62];
    },
    0.36,
    320,
    30,
  );
}

/** A coil: the same sweep run along a helix instead of a closed loop. */
function coil(): Sample[] {
  const turns = 2.2;
  return sweep(
    (u) => {
      const f = u / (Math.PI * 2);
      const t = f * turns * Math.PI * 2;
      return [Math.cos(t) * 1.5, f * 2.7 - 1.35, Math.sin(t) * 1.5];
    },
    0.26,
    460,
    26,
  );
}

/**
 * A Möbius band. It has one side, so its normal flips as the band turns back
 * on itself — which is exactly what makes the twist legible: the light leaves
 * the surface as it passes through the half turn.
 */
function mobius(): Sample[] {
  return parametric(
    (u, w) => [
      (1.45 + w * Math.cos(u / 2)) * Math.cos(u),
      w * Math.sin(u / 2),
      (1.45 + w * Math.cos(u / 2)) * Math.sin(u),
    ],
    420,
    48,
    Math.PI * 2,
    -0.9,
    0.9,
  );
}

/**
 * A superellipsoid at an exponent that lands between a sphere and a cube — the
 * same rounded-square corner the rest of the site is built on, as a solid.
 */
function squircle(): Sample[] {
  const e = 0.42;
  const p = (a: number, k: number) => Math.sign(Math.sin(a)) * Math.abs(Math.sin(a)) ** k;
  const q = (a: number, k: number) => Math.sign(Math.cos(a)) * Math.abs(Math.cos(a)) ** k;
  return parametric(
    (u, v) => [1.7 * q(v, e) * q(u, e), 1.7 * p(v, e), 1.7 * q(v, e) * p(u, e)],
    260,
    130,
    Math.PI * 2,
    -Math.PI / 2,
    Math.PI / 2,
  );
}

/**
 * An icosahedron. Twenty flat triangles, so unlike every other form here the
 * shading steps rather than sweeps — the one that reads as faceted.
 */
function icosahedron(): Sample[] {
  const g = 1.618033988749895;
  const scale = 1.95 / Math.hypot(1, g);
  const v: [number, number, number][] = [
    [-1, g, 0], [1, g, 0], [-1, -g, 0], [1, -g, 0],
    [0, -1, g], [0, 1, g], [0, -1, -g], [0, 1, -g],
    [g, 0, -1], [g, 0, 1], [-g, 0, -1], [-g, 0, 1],
  ].map(([x, y, z]) => [x * scale, y * scale, z * scale]);

  const faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  const out: Sample[] = [];
  const steps = 44;

  for (const [ia, ib, ic] of faces) {
    const a = v[ia];
    const b = v[ib];
    const c = v[ic];
    const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];

    let nx = e1[1] * e2[2] - e1[2] * e2[1];
    let ny = e1[2] * e2[0] - e1[0] * e2[2];
    let nz = e1[0] * e2[1] - e1[1] * e2[0];
    const nl = Math.hypot(nx, ny, nz) || 1;
    nx /= nl;
    ny /= nl;
    nz /= nl;
    // The solid is centred on the origin, so any vertex points outward.
    if (nx * a[0] + ny * a[1] + nz * a[2] < 0) {
      nx = -nx;
      ny = -ny;
      nz = -nz;
    }

    // Walk the triangle in barycentric steps rather than sampling a square and
    // discarding most of it.
    for (let i = 0; i <= steps; i += 1) {
      for (let j = 0; j <= steps - i; j += 1) {
        const s = i / steps;
        const t = j / steps;
        out.push({
          x: a[0] + e1[0] * s + e2[0] * t,
          y: a[1] + e1[1] * s + e2[1] * t,
          z: a[2] + e1[2] * s + e2[2] * t,
          nx,
          ny,
          nz,
        });
      }
    }
  }
  return out;
}

const SOLIDS: Record<string, () => Sample[]> = {
  torus,
  sphere,
  cube,
  knot,
  coil,
  mobius,
  squircle,
  icosahedron,
};
const SOLID_IDS = Object.keys(SOLIDS);

const LAST_SOLID_KEY = 'heroSolid';

/**
 * The last form shown, kept in sessionStorage rather than a module variable so
 * a refresh never repeats it either — module state resets on reload, and with
 * only a handful of forms a plain random pick repeats often enough to look
 * broken.
 */
function readLastSolid(): string | null {
  try {
    return sessionStorage.getItem(LAST_SOLID_KEY);
  } catch {
    return null;
  }
}

function pickSolid(): string {
  const last = readLastSolid();
  const options = SOLID_IDS.filter((id) => id !== last);
  const chosen = options[Math.floor(Math.random() * options.length)] ?? SOLID_IDS[0];
  try {
    sessionStorage.setItem(LAST_SOLID_KEY, chosen);
  } catch {
    // Private mode or blocked storage: the pick is still random, just not
    // guaranteed to differ from the last one.
  }
  return chosen;
}

interface HeroSolidProps {
  /** Force a form instead of picking one. Handy when comparing them. */
  solid?: string;
  className?: string;
}

export function HeroSolid({ solid, className = '' }: HeroSolidProps) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const id = solid && SOLIDS[solid] ? solid : pickSolid();
    const samples = SOLIDS[id]();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cols = 0;
    let rows = 0;
    let cellAspect = 2;
    let depthBuffer = new Float32Array(0);
    let charBuffer: Uint8Array = new Uint8Array(0);
    let frameId = 0;
    let resizeTimer = 0;
    let lastPaint = 0;
    const startedAt = performance.now();

    const measure = () => {
      const style = getComputedStyle(el);
      const probe = document.createElement('canvas').getContext('2d');
      if (!probe) return;
      probe.font = `${style.fontSize} ${style.fontFamily}`;
      const cellW = probe.measureText('M').width;
      const cellH = parseFloat(style.lineHeight) || parseFloat(style.fontSize);
      if (!cellW || !cellH) return;
      cellAspect = cellH / cellW;
      cols = Math.max(20, Math.floor(el.clientWidth / cellW));
      rows = Math.max(8, Math.floor(el.clientHeight / cellH));
      depthBuffer = new Float32Array(cols * rows);
      charBuffer = new Uint8Array(cols * rows);
    };

    const paint = (now: number) => {
      frameId = requestAnimationFrame(paint);
      if (now - lastPaint < 55) return;
      lastPaint = now;
      if (!cols || !rows) return;

      const t = reduced ? 3 : (now - startedAt) / 1000;
      // Two axes at speeds that do not divide, so it never repeats a pose.
      const a = t * 0.11;
      const b = t * 0.071;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const cb = Math.cos(b);
      const sb = Math.sin(b);

      depthBuffer.fill(0);
      charBuffer.fill(0);

      // Sit the form to the right of centre, clear of the text.
      const centreX = cols * 0.63;
      const centreY = rows * 0.50;
      // Scale to the field's short side so it never outgrows the band.
      const scale = Math.min(cols / cellAspect, rows) * 0.78;
      const distance = 5.4;

      for (let i = 0; i < samples.length; i += 1) {
        const s = samples[i];

        // Rotate about X, then about Y.
        const y1 = s.y * ca - s.z * sa;
        const z1 = s.y * sa + s.z * ca;
        const x2 = s.x * cb + z1 * sb;
        const z2 = -s.x * sb + z1 * cb;

        const ny1 = s.ny * ca - s.nz * sa;
        const nz1 = s.ny * sa + s.nz * ca;
        const nx2 = s.nx * cb + nz1 * sb;
        const nz2 = -s.nx * sb + nz1 * cb;

        const ooz = 1 / (distance + z2);
        const sx = Math.round(centreX + scale * cellAspect * ooz * x2);
        const sy = Math.round(centreY - scale * ooz * y1);
        if (sx < 0 || sx >= cols || sy < 0 || sy >= rows) continue;

        const index = sy * cols + sx;
        if (ooz <= depthBuffer[index]) continue;

        const lit = nx2 * LIGHT_X + ny1 * LIGHT_Y + nz2 * LIGHT_Z;
        // Ambient floor keeps the unlit side from going solid, and the minimum
        // of 1 keeps every covered cell marked so the silhouette holds.
        const density = Math.min(1, Math.max(0, 0.62 - lit * 0.52));
        depthBuffer[index] = ooz;
        charBuffer[index] = Math.max(1, Math.round(density * (RAMP.length - 1)));
      }

      const out: string[] = [];
      for (let y = 0; y < rows; y += 1) {
        let line = '';
        const base = y * cols;
        for (let x = 0; x < cols; x += 1) line += RAMP[charBuffer[base + x]];
        out.push(line);
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
  }, [solid]);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute -top-20 bottom-0 left-1/2 -z-10 hidden w-screen -translate-x-1/2 select-none overflow-hidden whitespace-pre font-mono text-[10px] leading-none text-text-tertiary/[0.34] md:block ${className}`}
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent, black 14%, black 74%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 14%, black 74%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    />
  );
}

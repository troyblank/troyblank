import { type FieldContext, fieldScale, pickHue, wrapPosition } from './utils';

type MembranePoint = {
  angle: number;
  phase: number;
  wobble: number;
  speed: number;
  // A fixed, per-point radius multiplier built from a few low-frequency
  // harmonics — gives the resting body a permanent, irregular, sprawling
  // silhouette instead of a plain circle, the way a real amoeba's body
  // never truly relaxes into a ball between pseudopod extensions.
  baseScale: number;
};

type LobeState = 'idle' | 'growing' | 'anchored' | 'retracting';

// A lobe is a pseudopod modeled purely as a local bulge of the membrane
// outline (see traceBody) — there is no separate limb shape drawn. It grows
// out from the body toward an anchor point, holds there while the body's
// cytoplasm flows toward it, then eases back into the silhouette.
type Lobe = {
  angle: number;
  anchorX: number;
  anchorY: number;
  restLen: number;
  reachLen: number;
  protrusionLen: number;
  growth: number;
  state: LobeState;
  timer: number;
  growDuration: number;
  plantDuration: number;
  retractDuration: number;
  retractFrom: number;
  cooldown: number;
};

type Vacuole = {
  ox: number;
  oy: number;
  r: number;
};

export type Amoeba = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  membrane: MembranePoint[];
  lobes: Lobe[];
  hue: number;
  sat: number;
  light: number;
  nucleus: { ox: number; oy: number; r: number };
  vacuoles: Vacuole[];
  speckle: { ox: number; oy: number; r: number }[];
};

export const AMOEBA_COUNT = 18;

export function createAmoeba(): Amoeba {
  const pointCount = 16 + Math.floor(Math.random() * 6);

  const harmonics = Array.from({ length: 2 + Math.floor(Math.random() * 2) }, () => ({
    freq: 1 + Math.floor(Math.random() * 3),
    amp: 0.07 + Math.random() * 0.16,
    phase: Math.random() * Math.PI * 2,
  }));
  const baseScaleAt = (angle: number) =>
    1 + harmonics.reduce((sum, h) => sum + h.amp * Math.sin(h.freq * angle + h.phase), 0);

  const membrane: MembranePoint[] = Array.from({ length: pointCount }, (_, j) => {
    const angle = (j / pointCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
    return {
      angle,
      phase: Math.random() * Math.PI * 2,
      wobble: 0.03 + Math.random() * 0.04,
      speed: 0.6 + Math.random() * 1.1,
      baseScale: baseScaleAt(angle),
    };
  });

  const scale = fieldScale();
  const radius = (9 + Math.random() * 8) * scale;
  const lobeCount = 5 + Math.floor(Math.random() * 3);
  const lobes: Lobe[] = Array.from({ length: lobeCount }, () => ({
    angle: Math.random() * Math.PI * 2,
    anchorX: 0,
    anchorY: 0,
    restLen: radius * 0.15,
    reachLen: radius * (2.3 + Math.random() * 2.1),
    protrusionLen: 0,
    growth: 0,
    state: 'idle',
    timer: 0,
    growDuration: 1.0 + Math.random() * 0.8,
    plantDuration: 1.1 + Math.random() * 1.3,
    retractDuration: 0.55 + Math.random() * 0.4,
    retractFrom: 0,
    cooldown: Math.random() * 1.1,
  }));

  const vacuoleCount = 1 + Math.floor(Math.random() * 3);

  return {
    x: Math.random() * Math.max(window.innerWidth, 400),
    y: Math.random() * Math.max(window.innerHeight, 400),
    vx: 0,
    vy: 0,
    radius,
    membrane,
    lobes,
    hue: pickHue(),
    sat: 36 + Math.random() * 24,
    light: 26 + Math.random() * 12,
    nucleus: {
      ox: (Math.random() - 0.5) * radius * 0.3,
      oy: (Math.random() - 0.5) * radius * 0.3,
      r: radius * (0.26 + Math.random() * 0.1),
    },
    vacuoles: Array.from({ length: vacuoleCount }, () => ({
      ox: (Math.random() - 0.5) * radius * 0.85,
      oy: (Math.random() - 0.5) * radius * 0.85,
      r: (0.7 + Math.random() * 1.2) * scale,
    })),
    speckle: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => ({
      ox: (Math.random() - 0.5) * radius * 0.7,
      oy: (Math.random() - 0.5) * radius * 0.7,
      r: (0.35 + Math.random() * 0.6) * scale,
    })),
  };
}

export function scaleAmoeba(amoeba: Amoeba, factor: number) {
  if (factor === 1) return;

  amoeba.radius *= factor;
  amoeba.nucleus.ox *= factor;
  amoeba.nucleus.oy *= factor;
  amoeba.nucleus.r *= factor;

  for (const v of amoeba.vacuoles) {
    v.ox *= factor;
    v.oy *= factor;
    v.r *= factor;
  }
  for (const s of amoeba.speckle) {
    s.ox *= factor;
    s.oy *= factor;
    s.r *= factor;
  }
  for (const lobe of amoeba.lobes) {
    lobe.restLen *= factor;
    lobe.reachLen *= factor;
    lobe.protrusionLen *= factor;
    lobe.retractFrom *= factor;
  }
}

// Drives one pseudopod lobe through grow -> hold -> retract. Nothing here
// draws anything; it only produces protrusionLen/angle, which traceBody
// reads to bulge the membrane outline in that direction.
function updateLobe(
  amoeba: Amoeba,
  lobe: Lobe,
  dt: number,
  mx: number,
  my: number,
  mouseNear: boolean,
) {
  lobe.timer += dt;

  switch (lobe.state) {
    case 'idle': {
      lobe.protrusionLen += (0 - lobe.protrusionLen) * Math.min(1, dt * 8);
      lobe.growth = 0;

      if (lobe.cooldown > 0) {
        lobe.cooldown -= dt;
        break;
      }

      let angle = Math.random() * Math.PI * 2;
      if (mouseNear) {
        const toMouse = Math.atan2(my - amoeba.y, mx - amoeba.x);
        angle = angle * 0.5 + toMouse * 0.5;
      }

      lobe.anchorX = amoeba.x + Math.cos(angle) * lobe.reachLen;
      lobe.anchorY = amoeba.y + Math.sin(angle) * lobe.reachLen;
      lobe.angle = angle;
      lobe.state = 'growing';
      lobe.timer = 0;
      break;
    }
    case 'growing': {
      const dx = lobe.anchorX - amoeba.x;
      const dy = lobe.anchorY - amoeba.y;
      lobe.angle = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy);
      const progress = Math.min(1, lobe.timer / lobe.growDuration);
      const eased = 1 - (1 - progress) ** 3;
      lobe.growth = eased;
      lobe.protrusionLen = lobe.restLen + eased * (dist - lobe.restLen);
      if (progress >= 1) {
        lobe.state = 'anchored';
        lobe.timer = 0;
      }
      break;
    }
    case 'anchored': {
      const dx = lobe.anchorX - amoeba.x;
      const dy = lobe.anchorY - amoeba.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.01) lobe.angle = Math.atan2(dy, dx);
      lobe.protrusionLen = dist;
      lobe.growth = Math.min(1, dist / lobe.reachLen);
      if (lobe.timer > lobe.plantDuration || dist < amoeba.radius * 0.5) {
        lobe.state = 'retracting';
        lobe.timer = 0;
        lobe.retractFrom = lobe.protrusionLen;
      }
      break;
    }
    case 'retracting': {
      const progress = Math.min(1, lobe.timer / lobe.retractDuration);
      lobe.protrusionLen = lobe.retractFrom * (1 - progress);
      lobe.growth = Math.max(0, lobe.growth * (1 - progress));
      if (progress >= 1) {
        lobe.state = 'idle';
        lobe.protrusionLen = 0;
        lobe.cooldown = 0.15 + Math.random() * 0.9;
        lobe.timer = 0;
      }
      break;
    }
  }
}

function traceBody(amoeba: Amoeba, time: number): { x: number; y: number }[] {
  const t = time * 0.001;
  const verts: { x: number; y: number }[] = [];

  for (const pt of amoeba.membrane) {
    const pulse =
      1 +
      Math.sin(t * pt.speed + pt.phase) * pt.wobble +
      Math.sin(t * pt.speed * 0.5 + pt.phase * 2.1) * pt.wobble * 0.35;

    const base = amoeba.radius * pulse * pt.baseScale;
    let r = base;

    // Each active lobe proposes a radius for this membrane point (full
    // extension at its own angle, fading off to either side); take the
    // largest proposal so several broad, overlapping lobes still read as
    // distinct sprawling lumps instead of averaging into mush.
    for (const lobe of amoeba.lobes) {
      if (lobe.protrusionLen <= 0.5) continue;
      let d = pt.angle - lobe.angle;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      const sigma = 0.58 - 0.18 * lobe.growth;
      const falloff = Math.exp(-(d * d) / (2 * sigma * sigma));
      const candidate = base + falloff * (Math.max(base, lobe.protrusionLen) - base);
      if (candidate > r) r = candidate;
    }

    verts.push({
      x: amoeba.x + Math.cos(pt.angle) * r,
      y: amoeba.y + Math.sin(pt.angle) * r,
    });
  }

  return verts;
}

function tracePath(ctx: CanvasRenderingContext2D, verts: { x: number; y: number }[]) {
  const first = verts[0];
  const last = verts[verts.length - 1];
  if (!first || !last) return;

  ctx.beginPath();
  ctx.moveTo((first.x + last.x) / 2, (first.y + last.y) / 2);

  for (let i = 0; i < verts.length; i++) {
    const curr = verts[i];
    const next = verts[(i + 1) % verts.length];
    if (!curr || !next) continue;
    ctx.quadraticCurveTo(curr.x, curr.y, (curr.x + next.x) / 2, (curr.y + next.y) / 2);
  }

  ctx.closePath();
}

export function updateAmoeba(amoeba: Amoeba, dt: number, field: FieldContext) {
  const mx = field.mouseX * field.width;
  const my = field.mouseY * field.height;
  const mouseNear = Math.hypot(amoeba.x - mx, amoeba.y - my) < amoeba.radius * 9;

  const activeCount = amoeba.lobes.filter((l) => l.state === 'growing' || l.state === 'anchored').length;
  if (activeCount === 0) {
    let candidate: Lobe | null = null;
    for (const lobe of amoeba.lobes) {
      if (lobe.state !== 'idle') continue;
      if (!candidate || lobe.cooldown < candidate.cooldown) candidate = lobe;
    }
    if (candidate) candidate.cooldown = 0;
  }

  for (const lobe of amoeba.lobes) {
    updateLobe(amoeba, lobe, dt, mx, my, mouseNear);
  }

  // The only force on the body: cytoplasm is pulled toward whichever
  // lobes are currently anchored, proportional to how stretched they are,
  // with linear drag so it settles instead of sliding past. This is what
  // reads as crawling on a surface rather than drifting in a current.
  let fx = 0;
  let fy = 0;
  for (const lobe of amoeba.lobes) {
    if (lobe.state !== 'anchored') continue;
    const dx = lobe.anchorX - amoeba.x;
    const dy = lobe.anchorY - amoeba.y;
    const dist = Math.hypot(dx, dy) || 1;
    const stretch = Math.max(0, dist - amoeba.radius * 0.4);
    const pull = stretch * 2.6;
    fx += (dx / dist) * pull;
    fy += (dy / dist) * pull;
  }

  const dragCoeff = 8;
  amoeba.vx += (fx - dragCoeff * amoeba.vx) * dt;
  amoeba.vy += (fy - dragCoeff * amoeba.vy) * dt;

  amoeba.x += amoeba.vx * dt;
  amoeba.y += amoeba.vy * dt;

  const { dx: wrapDx, dy: wrapDy } = wrapPosition(field, amoeba, amoeba.radius * 3);
  if (wrapDx !== 0 || wrapDy !== 0) {
    // A lobe's anchor is a fixed world-space point; without this, a lobe
    // that's mid-reach when the body wraps would suddenly find its
    // anchor a full screen away, and stretch the membrane out to match.
    for (const lobe of amoeba.lobes) {
      lobe.anchorX += wrapDx;
      lobe.anchorY += wrapDy;
    }
  }
}

export function drawAmoeba(field: FieldContext, amoeba: Amoeba, time: number) {
  const { ctx } = field;
  const verts = traceBody(amoeba, time);
  if (verts.length < 3) return;

  tracePath(ctx, verts);

  const { hue, sat, light } = amoeba;

  ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, 0.68)`;
  ctx.fill();

  ctx.strokeStyle = `hsla(${hue + 14}, ${Math.min(100, sat + 18)}%, ${Math.max(10, light - 26)}%, 0.72)`;
  ctx.lineWidth = 1.75;
  ctx.lineJoin = 'round';
  ctx.stroke();

  const nx = amoeba.x + amoeba.nucleus.ox;
  const ny = amoeba.y + amoeba.nucleus.oy;
  const nr = amoeba.nucleus.r;

  ctx.beginPath();
  ctx.arc(nx, ny, nr, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${hue - 18}, 35%, 22%, 0.55)`;
  ctx.fill();
  ctx.strokeStyle = `hsla(${hue - 10}, 30%, 14%, 0.65)`;
  ctx.lineWidth = 0.75;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(nx - nr * 0.2, ny - nr * 0.2, nr * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${hue - 8}, 28%, 30%, 0.3)`;
  ctx.fill();

  for (const v of amoeba.vacuoles) {
    ctx.beginPath();
    ctx.arc(amoeba.x + v.ox, amoeba.y + v.oy, v.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fill();
    ctx.strokeStyle = `hsla(${hue + 30}, 40%, 55%, 0.22)`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  for (const s of amoeba.speckle) {
    ctx.beginPath();
    ctx.arc(amoeba.x + s.ox, amoeba.y + s.oy, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue + 15}, ${sat}%, 55%, 0.18)`;
    ctx.fill();
  }
}

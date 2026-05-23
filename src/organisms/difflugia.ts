import { type FieldContext, pickShellHue, wrapPosition } from './utils';

type PodState = 'idle' | 'growing' | 'anchored' | 'retracting';

// A shell pseudopod, extended only from the aperture (see drawDifflugia) —
// unlike the naked amoeba's lobes, which can bulge from anywhere on the
// membrane, these only ever reach out within a narrow cone facing whichever
// way the shell's opening currently points.
type ShellPod = {
  angle: number;
  anchorX: number;
  anchorY: number;
  restLen: number;
  reachLen: number;
  protrusionLen: number;
  state: PodState;
  timer: number;
  growDuration: number;
  plantDuration: number;
  retractDuration: number;
  retractFrom: number;
  cooldown: number;
};

export type Difflugia = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: number;
  length: number;
  width: number;
  hue: number;
  sat: number;
  light: number;
  pods: ShellPod[];
  grains: { t: number; s: number; r: number; shade: number }[];
};

export const DIFFLUGIA_COUNT = 7;

export function createDifflugia(): Difflugia {
  const length = 34 + Math.random() * 20;
  const podCount = 2 + Math.floor(Math.random() * 2);
  const pods: ShellPod[] = Array.from({ length: podCount }, () => ({
    angle: 0,
    anchorX: 0,
    anchorY: 0,
    restLen: length * 0.1,
    reachLen: length * (1.5 + Math.random() * 1.1),
    protrusionLen: 0,
    state: 'idle',
    timer: 0,
    growDuration: 0.9 + Math.random() * 0.7,
    plantDuration: 1.0 + Math.random() * 1.1,
    retractDuration: 0.5 + Math.random() * 0.35,
    retractFrom: 0,
    cooldown: Math.random() * 1.2,
  }));

  const grainCount = 22 + Math.floor(Math.random() * 14);

  return {
    x: Math.random() * Math.max(window.innerWidth, 400),
    y: Math.random() * Math.max(window.innerHeight, 400),
    vx: 0,
    vy: 0,
    facing: Math.random() * Math.PI * 2,
    length,
    width: length * (0.6 + Math.random() * 0.14),
    hue: pickShellHue(),
    sat: 22 + Math.random() * 18,
    light: 38 + Math.random() * 14,
    pods,
    grains: Array.from({ length: grainCount }, () => ({
      t: (Math.random() - 0.5) * 1.7,
      s: (Math.random() - 0.5) * 0.85,
      r: 0.8 + Math.random() * 1.3,
      shade: Math.random(),
    })),
  };
}

// A shell pseudopod only ever reaches out within a narrow cone around the
// shell's current facing (its aperture), unlike the naked amoeba's lobes
// which can bulge from any angle.
function updateShellPod(d: Difflugia, pod: ShellPod, dt: number) {
  pod.timer += dt;

  switch (pod.state) {
    case 'idle': {
      pod.protrusionLen += (0 - pod.protrusionLen) * Math.min(1, dt * 8);

      if (pod.cooldown > 0) {
        pod.cooldown -= dt;
        break;
      }

      const angle = d.facing + (Math.random() - 0.5) * 1.3;
      pod.anchorX = d.x + Math.cos(angle) * pod.reachLen;
      pod.anchorY = d.y + Math.sin(angle) * pod.reachLen;
      pod.angle = angle;
      pod.state = 'growing';
      pod.timer = 0;
      break;
    }
    case 'growing': {
      const dx = pod.anchorX - d.x;
      const dy = pod.anchorY - d.y;
      pod.angle = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy);
      const progress = Math.min(1, pod.timer / pod.growDuration);
      const eased = 1 - (1 - progress) ** 3;
      pod.protrusionLen = pod.restLen + eased * (dist - pod.restLen);
      if (progress >= 1) {
        pod.state = 'anchored';
        pod.timer = 0;
      }
      break;
    }
    case 'anchored': {
      const dx = pod.anchorX - d.x;
      const dy = pod.anchorY - d.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.01) pod.angle = Math.atan2(dy, dx);
      pod.protrusionLen = dist;
      if (pod.timer > pod.plantDuration || dist < d.length * 0.3) {
        pod.state = 'retracting';
        pod.timer = 0;
        pod.retractFrom = pod.protrusionLen;
      }
      break;
    }
    case 'retracting': {
      const progress = Math.min(1, pod.timer / pod.retractDuration);
      pod.protrusionLen = pod.retractFrom * (1 - progress);
      if (progress >= 1) {
        pod.state = 'idle';
        pod.protrusionLen = 0;
        pod.cooldown = 0.2 + Math.random() * 1.1;
        pod.timer = 0;
      }
      break;
    }
  }
}

export function updateDifflugia(d: Difflugia, dt: number, field: FieldContext) {
  const activeCount = d.pods.filter((p) => p.state === 'growing' || p.state === 'anchored').length;
  if (activeCount === 0) {
    let candidate: ShellPod | null = null;
    for (const pod of d.pods) {
      if (pod.state !== 'idle') continue;
      if (!candidate || pod.cooldown < candidate.cooldown) candidate = pod;
    }
    if (candidate) candidate.cooldown = 0;
  }

  for (const pod of d.pods) {
    updateShellPod(d, pod, dt);
  }

  let fx = 0;
  let fy = 0;
  for (const pod of d.pods) {
    if (pod.state !== 'anchored') continue;
    const dx = pod.anchorX - d.x;
    const dy = pod.anchorY - d.y;
    const dist = Math.hypot(dx, dy) || 1;
    const stretch = Math.max(0, dist - d.length * 0.3);
    const pull = stretch * 2.2;
    fx += (dx / dist) * pull;
    fy += (dy / dist) * pull;
  }

  const dragCoeff = 8;
  d.vx += (fx - dragCoeff * d.vx) * dt;
  d.vy += (fy - dragCoeff * d.vy) * dt;
  d.x += d.vx * dt;
  d.y += d.vy * dt;

  // The shell can't reshape itself, so instead it slowly rotates to keep
  // its aperture facing the direction it's being dragged.
  const speed = Math.hypot(d.vx, d.vy);
  if (speed > 0.5) {
    const target = Math.atan2(d.vy, d.vx);
    let diff = target - d.facing;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    d.facing += diff * Math.min(1, dt * 1.2);
  }

  const { dx: wrapDx, dy: wrapDy } = wrapPosition(field, d, d.length * 2.5);
  if (wrapDx !== 0 || wrapDy !== 0) {
    for (const pod of d.pods) {
      pod.anchorX += wrapDx;
      pod.anchorY += wrapDy;
    }
  }
}

export function drawDifflugia(field: FieldContext, d: Difflugia, _time: number) {
  const { ctx } = field;
  const dirX = Math.cos(d.facing);
  const dirY = Math.sin(d.facing);
  const sideX = -Math.sin(d.facing);
  const sideY = Math.cos(d.facing);

  // Pseudopods first, so the shell's own outline covers their base at the
  // aperture and they read as emerging from that one opening.
  for (const pod of d.pods) {
    if (pod.protrusionLen <= 0.5) continue;
    const baseX = d.x + dirX * d.length * 0.42;
    const baseY = d.y + dirY * d.length * 0.42;
    const tipX = d.x + Math.cos(pod.angle) * pod.protrusionLen;
    const tipY = d.y + Math.sin(pod.angle) * pod.protrusionLen;
    const perp = pod.angle + Math.PI / 2;
    const baseW = d.width * 0.08;
    const tipW = d.width * 0.02;
    const midX = (baseX + tipX) / 2;
    const midY = (baseY + tipY) / 2;
    const midW = (baseW + tipW) / 2;

    ctx.beginPath();
    ctx.moveTo(baseX + Math.cos(perp) * baseW, baseY + Math.sin(perp) * baseW);
    ctx.quadraticCurveTo(
      midX + Math.cos(perp) * midW,
      midY + Math.sin(perp) * midW,
      tipX + Math.cos(perp) * tipW,
      tipY + Math.sin(perp) * tipW,
    );
    ctx.lineTo(tipX - Math.cos(perp) * tipW, tipY - Math.sin(perp) * tipW);
    ctx.quadraticCurveTo(
      midX - Math.cos(perp) * midW,
      midY - Math.sin(perp) * midW,
      baseX - Math.cos(perp) * baseW,
      baseY - Math.sin(perp) * baseW,
    );
    ctx.closePath();
    ctx.fillStyle = `hsla(${d.hue + 30}, ${Math.min(70, d.sat + 20)}%, ${Math.min(62, d.light + 20)}%, 0.88)`;
    ctx.fill();
  }

  // The shell itself: a rigid flask shape, wide and rounded at the rear,
  // tapering to a narrower aperture at the front — it never deforms.
  const tailX = d.x - dirX * d.length * 0.5;
  const tailY = d.y - dirY * d.length * 0.5;
  const headX = d.x + dirX * d.length * 0.46;
  const headY = d.y + dirY * d.length * 0.46;
  const shoulderX = d.x - dirX * d.length * 0.08;
  const shoulderY = d.y - dirY * d.length * 0.08;
  const halfW = d.width / 2;

  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.quadraticCurveTo(shoulderX + sideX * halfW, shoulderY + sideY * halfW, headX, headY);
  ctx.quadraticCurveTo(shoulderX - sideX * halfW, shoulderY - sideY * halfW, tailX, tailY);
  ctx.closePath();

  ctx.fillStyle = `hsla(${d.hue}, ${d.sat}%, ${d.light}%, 0.94)`;
  ctx.fill();
  ctx.strokeStyle = `hsla(${d.hue + 8}, ${Math.min(100, d.sat + 15)}%, ${Math.max(10, d.light - 24)}%, 0.95)`;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Stippled agglutinated-grain texture over the whole shell.
  for (const g of d.grains) {
    const gx = d.x + dirX * g.t * d.length * 0.42 + sideX * g.s * d.width;
    const gy = d.y + dirY * g.t * d.length * 0.42 + sideY * g.s * d.width;
    ctx.beginPath();
    ctx.arc(gx, gy, g.r, 0, Math.PI * 2);
    ctx.fillStyle =
      g.shade > 0.5
        ? `hsla(${d.hue + 6}, ${Math.max(0, d.sat - 8)}%, ${Math.min(78, d.light + 20)}%, 0.4)`
        : `hsla(${d.hue - 6}, ${d.sat}%, ${Math.max(8, d.light - 18)}%, 0.4)`;
    ctx.fill();
  }

  // The aperture opening.
  ctx.beginPath();
  ctx.ellipse(headX, headY, d.width * 0.13, d.width * 0.09, d.facing, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${d.hue - 10}, 30%, ${Math.max(8, d.light - 32)}%, 0.85)`;
  ctx.fill();
}

import { type FieldContext, pickHue, wrapPosition } from './utils';

export type Euglena = {
  x: number;
  y: number;
  angle: number;
  turnBias: number;
  wobblePhase: number;
  speed: number;
  length: number;
  width: number;
  hue: number;
  sat: number;
  light: number;
  flagellumPhase: number;
  flagellumFreq: number;
  flagellumLen: number;
  eyespotSide: number;
  chloroplasts: { t: number; s: number; r: number }[];
};

export const EUGLENA_COUNT = 8;

export function createEuglena(): Euglena {
  const length = 22 + Math.random() * 14;
  const chloroplastCount = 5 + Math.floor(Math.random() * 5);

  return {
    x: Math.random() * Math.max(window.innerWidth, 400),
    y: Math.random() * Math.max(window.innerHeight, 400),
    angle: Math.random() * Math.PI * 2,
    turnBias: (Math.random() - 0.5) * 0.3,
    wobblePhase: Math.random() * Math.PI * 2,
    speed: 26 + Math.random() * 18,
    length,
    width: length * (0.34 + Math.random() * 0.08),
    hue: pickHue(),
    sat: 44 + Math.random() * 26,
    light: 34 + Math.random() * 14,
    flagellumPhase: Math.random() * Math.PI * 2,
    flagellumFreq: 1.5 + Math.random() * 0.9,
    flagellumLen: length * (1.3 + Math.random() * 0.7),
    eyespotSide: Math.random() < 0.5 ? -1 : 1,
    chloroplasts: Array.from({ length: chloroplastCount }, () => ({
      t: (Math.random() - 0.5) * 1.6,
      s: (Math.random() - 0.5) * 0.7,
      r: 1 + Math.random() * 1.4,
    })),
  };
}

// Euglenids swim rather than crawl: they hold a fairly fixed spindle
// shape and glide forward along a heading, steered by a slowly drifting
// turn bias plus a gentle spiral wobble, with a whipping flagellum
// providing a subtle thrust pulse — a completely different locomotion
// feel from the amoebas' anchor-and-pull crawling.
export function updateEuglena(e: Euglena, dt: number, field: FieldContext) {
  e.wobblePhase += dt * 0.8;
  e.turnBias += (Math.random() - 0.5) * dt * 0.5;
  e.turnBias = Math.max(-0.7, Math.min(0.7, e.turnBias));

  const turn = e.turnBias + Math.sin(e.wobblePhase) * 0.2;
  e.angle += turn * dt;

  e.flagellumPhase += dt * e.flagellumFreq * Math.PI * 2;
  const thrust = e.speed * (0.88 + 0.12 * Math.sin(e.flagellumPhase));

  e.x += Math.cos(e.angle) * thrust * dt;
  e.y += Math.sin(e.angle) * thrust * dt;

  wrapPosition(field, e, e.length * 2.2);
}

export function drawEuglena(field: FieldContext, e: Euglena, time: number) {
  const { ctx } = field;
  const t = time * 0.001;

  const dirX = Math.cos(e.angle);
  const dirY = Math.sin(e.angle);
  const sideX = -Math.sin(e.angle);
  const sideY = Math.cos(e.angle);

  const flex = 1 + Math.sin(t * 1.4 + e.wobblePhase) * 0.05;
  const length = e.length * flex;
  const halfW = (e.width / 2) * (1 - Math.sin(t * 1.4 + e.wobblePhase) * 0.06);

  const tailX = e.x - dirX * length * 0.56;
  const tailY = e.y - dirY * length * 0.56;
  const headX = e.x + dirX * length * 0.44;
  const headY = e.y + dirY * length * 0.44;
  const shoulderX = e.x - dirX * length * 0.06;
  const shoulderY = e.y - dirY * length * 0.06;

  // Flagellum first, so the body covers its base and it reads as growing
  // out from the front of the cell.
  const segments = 10;
  const flagBaseX = e.x + dirX * length * 0.46;
  const flagBaseY = e.y + dirY * length * 0.46;
  ctx.beginPath();
  ctx.moveTo(flagBaseX, flagBaseY);
  for (let s = 1; s <= segments; s++) {
    const f = s / segments;
    const along = f * e.flagellumLen;
    const amp = e.flagellumLen * 0.16 * f;
    const offset = Math.sin(f * Math.PI * 2.4 - e.flagellumPhase) * amp;
    ctx.lineTo(flagBaseX + dirX * along + sideX * offset, flagBaseY + dirY * along + sideY * offset);
  }
  ctx.strokeStyle = `hsla(${e.hue + 8}, ${e.sat}%, ${Math.min(72, e.light + 24)}%, 0.65)`;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.quadraticCurveTo(shoulderX + sideX * halfW, shoulderY + sideY * halfW, headX, headY);
  ctx.quadraticCurveTo(shoulderX - sideX * halfW, shoulderY - sideY * halfW, tailX, tailY);
  ctx.closePath();

  ctx.fillStyle = `hsla(${e.hue}, ${e.sat}%, ${e.light}%, 0.92)`;
  ctx.fill();
  ctx.strokeStyle = `hsla(${e.hue + 14}, ${Math.min(100, e.sat + 18)}%, ${Math.max(12, e.light - 26)}%, 0.95)`;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  for (const c of e.chloroplasts) {
    const cx = e.x + dirX * c.t * length * 0.42 + sideX * c.s * e.width;
    const cy = e.y + dirY * c.t * length * 0.42 + sideY * c.s * e.width;
    ctx.beginPath();
    ctx.arc(cx, cy, c.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${e.hue - 12}, ${e.sat}%, ${Math.max(14, e.light - 16)}%, 0.5)`;
    ctx.fill();
  }

  const eyeAlong = length * 0.3;
  const eyeSide = e.eyespotSide * e.width * 0.16;
  const ex = e.x + dirX * eyeAlong + sideX * eyeSide;
  const ey = e.y + dirY * eyeAlong + sideY * eyeSide;
  ctx.beginPath();
  ctx.arc(ex, ey, Math.max(1.3, e.width * 0.1), 0, Math.PI * 2);
  ctx.fillStyle = 'hsla(8, 65%, 45%, 0.9)';
  ctx.fill();
}

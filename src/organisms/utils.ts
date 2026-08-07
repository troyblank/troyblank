export type FieldContext = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  mouseX: number;
  mouseY: number;
};

const FIELD_REFERENCE_DIM = 1100;

/** 1 at desktop widths; scales down smoothly on smaller viewports. */
export function fieldScale(
  width: number = window.innerWidth,
  height: number = window.innerHeight,
): number {
  const dim = Math.min(width, height);
  return Math.max(0.45, Math.min(1, dim / FIELD_REFERENCE_DIM));
}

// All greens, from mossy yellow-green through to deep teal-green, so the
// population stays cohesive rather than pulling in unrelated hues.
export function pickHue(): number {
  return 95 + Math.random() * 75;
}

// A muted, sandy olive-khaki band — reads as an agglutinated mineral shell
// rather than living cytoplasm, while still sitting in the same green family
// as everything else in the scene.
export function pickShellHue(): number {
  return 68 + Math.random() * 28;
}

// Organisms are free to drift off the visible edges — once they've gone
// far enough past one side, they reappear at the opposite edge, like a
// continuous pond rather than a bounded terrarium. Returns how far the
// position was shifted so callers can carry any dependent world-space
// coordinates (like a pseudopod's anchor point) along with the jump.
export function wrapPosition(
  field: FieldContext,
  o: { x: number; y: number },
  margin: number,
): { dx: number; dy: number } {
  let dx = 0;
  let dy = 0;
  if (o.x < -margin) {
    const next = field.width + margin;
    dx = next - o.x;
    o.x = next;
  } else if (o.x > field.width + margin) {
    const next = -margin;
    dx = next - o.x;
    o.x = next;
  }
  if (o.y < -margin) {
    const next = field.height + margin;
    dy = next - o.y;
    o.y = next;
  } else if (o.y > field.height + margin) {
    const next = -margin;
    dy = next - o.y;
    o.y = next;
  }
  return { dx, dy };
}
